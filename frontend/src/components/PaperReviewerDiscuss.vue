<template>
  <div>
    <el-card shadow="hover" v-for="(judge, index) in judges" :key="'judge' + index">
      <el-avatar> {{ judge.name }} </el-avatar>
      <p>{{ judge.comment }}</p>
    </el-card>

    <div style="position:sticky">
      <el-card shadow="always">
        <el-tag type="primary" effect="dark"> Rebuttal </el-tag>
        <p>{{ rebuttal }}</p>
      </el-card>
    </div>

    <el-card shadow="hover" v-for="(comment, index) in comments" :key="'comment' + index">
      <el-avatar> {{ comment.name }} </el-avatar>
      <p>{{ comment.comment }}</p>
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
      comments: [
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
      ],
      judges: [
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
        {
          name: 'david',
          comment:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
        },
      ],
      myComment: '',
      rebuttal:
        'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Et harumd und lookum like Greek to me, dereud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civiuda. Et tam neque pecun modut est neque nonor et imper ned libidig met, consectetur adipiscing elit, sed ut labore et dolore magna aliquam.',
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
      let address;
      if (this.rebuttal.length === 0) address = '/system/reviewerSendComment';
      else address = '/system/reviewerSendJudge';
      this.$axios
        .post(address, { token: this.$store.state.token, message: this.myComment, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          else this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
        })
        .catch((err) => this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' }));
      this.myComment = '';
    },
    getRebuttal() {
      this.$axios
        .post('/system/reviewerGetRebuttal', { paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this.rebuttal = resp.data;
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
</style>
