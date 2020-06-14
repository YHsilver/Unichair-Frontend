<template>
  <div>
    <el-card shadow="hover" v-for="(judge, index) in judges.reverse()" :key="'judge' + index">
      <el-avatar> {{ judge.name }} </el-avatar>
      <p>{{ judge.message }}</p>
    </el-card>

    <div class="rebuttalText">
      <el-card shadow="always">
        <el-tag type="primary" effect="dark"> Rebuttal </el-tag>
        <p>{{ rebuttal }}</p>
      </el-card>
    </div>

    <el-card shadow="hover" v-for="(comment, index) in comments.reverse()" :key="'comment' + index">
      <el-avatar> {{ comment.name }} </el-avatar>
      <p>{{ comment.message }}</p>
    </el-card>

    <div id="inputComment">
      <el-input type="textarea" rows="4" maxlength="200" show-word-limit v-model="myComment" placeholder="Please input your comment"></el-input>
      <el-button style="float:right;margin-top:5px" type="primary" @click="sendDiscussion">Comment</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperReviewerDiscuss',
  props: { Identity: String, paperId: Number },
  data() {
    return {
      comments: [],
      judges: [],
      myComment: '',
      rebuttal: '',
    };
  },
  created() {
    this.getDiscussion('/system/reviewerGetComment', 'comments');
    this.getDiscussion('/system/reviewerGetJudge', 'judges');
    this.getRebuttal();
  },
  methods: {
    getDiscussion(address, discussion) {
      this.$axios
        .post(address, { token: this.$store.state.token, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this[discussion] = resp.data;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' }));
    },
    sendDiscussion() {
      if (this.myComment === '') {
        this.$message({ type: 'error', message: 'please fill in sth!', duration: '2000', showClose: 'true', center: 'true' });
        return;
      }

      let address;

      if (this.rebuttal.length === 0) address = '/system/reviewerSendComment';
      else address = '/system/reviewerSendJudge';
      this.$axios
        .post(address, { token: this.$store.state.token, message: this.myComment, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
            this.getDiscussion('/system/reviewerGetComment', 'comments');
            this.getDiscussion('/system/reviewerGetJudge', 'judges');
          } else this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
        })
        .catch((err) => this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' }));
      this.myComment = '';
    },
    getRebuttal() {
      this.$axios
        .post('/system/reviewerGetRebuttal', { token: this.$store.state.token, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this.rebuttal = resp.data.rebuttal;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' }));
    },
  },
};
</script>

<style>
.el-card {
  margin: 20px 0;
}

#inputComment {
  position: sticky;
  bottom: 0;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 60px;
  background: #ffffff;
}

.rebuttalText {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 400px;
}
</style>
