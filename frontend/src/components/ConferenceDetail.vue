<template>
  <div v-loading="loading">
    <el-form label-position="left" label-width="80px">
      <!-- admin 专属 -->
      <el-form-item label="ID" v-if="Identity === 'Admin'">
        <span>{{ conferenceDetail.id }}</span>
      </el-form-item>
      <!-- 通用 -->
      <el-form-item label="Full Name / Abbreviation">
        <strong>{{ conferenceDetail.fullName }} / {{ conferenceDetail.abbreviation }}</strong>
      </el-form-item>
      <el-form-item label="Conference Location">
        <span>{{ conferenceDetail.heldPlace }}</span>
      </el-form-item>
      <el-form-item label="Contribute Start Time / Contribute End Time">
        <span>{{ conferenceDetail.submissionDate }} / {{ conferenceDetail.submissionDeadline }}</span>
      </el-form-item>
      <el-form-item label="Result Release Time / Conference Time">
        <span>{{ conferenceDetail.releaseDate }} / {{ conferenceDetail.heldDate }}</span>
      </el-form-item>
      <el-form-item label="Conference Stage">
        <el-button type="text">{{ conferenceDetail.stage }}</el-button>
      </el-form-item>
      <el-form-item label="Conference Introduction">
        <span>{{ conferenceDetail.introduction }}</span>
      </el-form-item>
      <el-form-item label="Conference Topics" class="tag-group">
        <el-tag :key="topic" v-for="topic in conferenceDetail.topics" :disable-transitions="false" effect="dark" style="margin-right: 10px;">
          {{ topic }}
        </el-tag>
      </el-form-item>
      <el-form-item label="Chairman">
        <el-tag type="warning" effect="plain">{{ conferenceDetail.chair }}</el-tag>
      </el-form-item>
      <el-form-item label="Reviewers">
        <span>{{ conferenceDetail.PCMember }}</span>
      </el-form-item>
      <el-form-item label="Authors">
        <span>{{ conferenceDetail.Author }}</span>
      </el-form-item>
    </el-form>

    <el-button-group>
      <!-- chair -->
      <el-button type="primary" @click="InviteReviewerVisible = true" v-if="Identity === 'Chair' && conferenceDetail.stage === 'Preparation'"> Invite PC Member </el-button>

      <el-popover placement="top" width="160" v-model="popoverVisible" v-if="Identity === 'Chair'" :disabled="conferenceDetail.stage === 'Ending'">
        <p>Are you sure you wanna move the conference to the next stage?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popoverVisible = false">Cancel</el-button>
          <el-button type="primary" size="mini" @click="moveToNextStage()">Yes</el-button>
        </div>
        <el-button type="primary" slot="reference">Move to next Stage</el-button>
      </el-popover>

      <!-- author -->
      <el-button type="primary" @click="myPaperVisible = true" v-if="Identity === 'Author'">My paper</el-button>

      <!-- reviewer -->
      <el-button type="primary" @click="reviewPaperVisible = true" v-if="Identity === 'Reviewer' && conferenceDetail.stage === 'Reviewing'">Review paper</el-button>

      <!-- Passer -->
      <el-button type="primary" @click="contributeFormVisible = true" v-if="Identity === 'Passerby' && conferenceDetail.stage === 'Contribution'">Submit paper</el-button>
    </el-button-group>

    <!-- contribute -->
    <el-dialog :visible.sync="contributeFormVisible" append-to-body :fullscreen="true">
      <PaperForm
        @contributeFinished="contributeFormVisible = false"
        :conferenceId="Number(conferenceDetail.id)"
        :conferenceFullName="conferenceDetail.fullName"
        :conferenceTopics="conferenceDetail.topics"
        :Identity="Identity"
      />
    </el-dialog>

    <!-- Invite Reviewer -->
    <el-dialog :visible.sync="InviteReviewerVisible" append-to-body :fullscreen="true">
      <InviteReviewer @inviteReviewerFinished="InviteReviewerVisible = false" :conferenceId="Number(conferenceDetail.id)" :conferenceFullName="conferenceDetail.fullName" />
    </el-dialog>

    <!-- reviewPaper -->
    <el-dialog :visible.sync="reviewPaperVisible" append-to-body :fullscreen="true">
      <PaperForm @reviewFinished="reviewPaperVisible = false" :Identity="Identity" :conferenceTopics="conferenceDetail.topics" :conferenceId="Number(conferenceDetail.id)" />
    </el-dialog>
  </div>
</template>

<script>
import PaperForm from '@/components/userComponents/PaperForm.vue';
import InviteReviewer from '@/components/userComponents/InviteReviewer.vue';

export default {
  name: 'ConferenceDetail',
  props: { conferenceId: Number, Identity: String },
  components: { InviteReviewer, PaperForm },
  data() {
    return {
      conferenceDetail: {},
      contributeFormVisible: false,
      InviteReviewerVisible: false,
      reviewPaperVisible: false,
      myPaperVisible: false,
      loading: true,
      popoverVisible: false,
    };
  },
  created() {
    this.getConferenceDetails();
  },
  methods: {
    getConferenceDetails() {
      this.$axios
        .post('/system/userGetConferenceDetails', { conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.conferenceDetail = resp.data;
            for (let key in this.conferenceDetail) {
              if (this.conferenceDetail[key] === '') this.conferenceDetail[key] = '暂无';
            }
            // this.conferenceDetail.topics = ['a', 'b', 'c'];
            // 转化为第一个字母大写
            this.conferenceDetail.stage = this.conferenceDetail.stage.charAt(0) + this.conferenceDetail.stage.substring(1).toLowerCase();
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get conference details error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    getNextStage(currStage) {
      if (currStage === 'Preparation') {
        return 'Contribution'.toUpperCase();
      } else if (currStage === 'Contribution') {
        return 'Reviewing'.toUpperCase();
      } else if (currStage === 'Reviewing') {
        return 'Grading'.toUpperCase();
      } else if (currStage === 'Grading') {
        return 'Ending'.toUpperCase();
      }
      return 'UNDEFINED';
    },
    moveToNextStage() {
      this.popoverVisible = false;
      this.$axios
        .post('/system/chairChangeConferenceStage', {
          conferenceId: this.conferenceDetail.id,
          changedStage: this.getNextStage(this.conferenceDetail.stage),
          token: this.$store.state.token,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'change stage error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
