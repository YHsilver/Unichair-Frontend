<template>
  <div v-loading="loading">
    <el-form label-position="left" label-width="80px">
      <!-- <el-form-item label="ID">
        <span>{{ conferenceDetail.id }}</span>
      </el-form-item> -->
      <el-form-item label="Full Name / Abbreviation">
        <span>{{ conferenceDetail.fullName }} / {{ conferenceDetail.abbreviation }}</span>
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
        <span>{{ conferenceDetail.stage }}</span>
      </el-form-item>
      <el-form-item label="Conference Introduction">
        <span>{{ conferenceDetail.introduction }}</span>
      </el-form-item>
      <el-form-item label="Chairman">
        <span>{{ conferenceDetail.chair }}</span>
      </el-form-item>
      <el-form-item label="Reviewers">
        <span>{{ conferenceDetail.PCMember }}</span>
      </el-form-item>
      <el-form-item label="Authors">
        <span>{{ conferenceDetail.Author }}</span>
      </el-form-item>
    </el-form>

    <el-row class="hint-div" v-if="isChair">
      <el-col>
        <span>{{ ChairHintMessage }}</span>
      </el-col>
      <el-col>
        <el-button type="primary" @click="gotoInvite">
          Invite PC Member
        </el-button>
        <span v-if="this.conferenceDetail.stage === 'Preparation' || this.conferenceDetail.stage === 'Contribution'" style="margin-left: 5px;"> </span>
        <el-button :disabled="!ChairButtonIsAble" style="min-width: 10%" type="primary" @click="moveToNextStage">{{ ChairButtonMessage }}</el-button>
      </el-col>
    </el-row>
    <el-button type="primary" @click="gotoInvite">
      Invite PC Member
    </el-button>
    <el-row class="hint-div" v-if="isPCMember">
      <el-col>
        <span>{{ PCMemberHintMessage }}</span>
      </el-col>
      <el-col>
        <el-button :disabled="!PCMemberButtonIsAble" style="min-width: 10%" type="primary" @click="reviewPaper">{{ PCMemberButtonMessage }}</el-button>
      </el-col>
    </el-row>

    <el-row class="hint-div" v-if="isAuthor">
      <el-col>
        <span>{{ AuthorHintMessage }}</span>
        <a href="#">My paper</a>
      </el-col>
      <el-col>
        <el-button :disabled="!SubmitButtonIsAble" style="min-width: 200px; height: 40px;" type="primary" @click="submitPaper">{{ AuthorSubmitButtonMessage }}</el-button>
      </el-col>
    </el-row>

    <el-row class="hint-div" v-if="!isAuthor && !isChair">
      <el-col>
        <span>{{ NormalHintMessage }}</span>
      </el-col>
      <el-col>
        <el-button :disabled="!SubmitButtonIsAble" style="min-width: 10%" type="primary" @click="submitPaper"> {{ NormalSubmitButtonMessage }}</el-button>
      </el-col>
    </el-row>

    <!-- contribute -->
    <el-dialog :visible.sync="contributeFormVisible" append-to-body :fullscreen="true">
      <ContributeForm @contributeFinished="contributeFormVisible = false" :conferenceId="Number(conferenceDetail.id)" :conferenceFullName="conferenceDetail.fullName" />
    </el-dialog>

    <!-- Invite Reviewer -->
    <el-dialog :visible.sync="InviteReviewerVisible" append-to-body :fullscreen="true">
      <InviteReviewer @inviteReviewerFinished="InviteReviewerVisible = false" :conferenceId="Number(conferenceDetail.id)" :conferenceFullName="conferenceDetail.fullName" />
    </el-dialog>
  </div>
</template>

<script>
import ContributeForm from '@/components/userComponents/ContributeForm.vue';
import InviteReviewer from '@/components/userComponents/InviteReviewer.vue';

export default {
  name: 'ConferenceDetail',
  props: {
    conferenceId: Number,
  },
  components: { ContributeForm, InviteReviewer },
  data() {
    return {
      conferenceDetail: {},
      contributeFormVisible: false,
      InviteReviewerVisible: false,

      isChair: false,
      isPCMember: false,
      isAuthor: false,

      ChairHintMessage: 'You are the chair.',
      PCMemberHintMessage: 'You are the PC member.',
      AuthorHintMessage: 'You have submitted your paper.',
      NormalHintMessage: 'You are not an author of this conference.',
      ChairButtonIsAble: true,
      PCMemberButtonIsAble: true,
      SubmitButtonIsAble: true,
      ChairButtonMessage: 'Move to next Stage',
      PCMemberButtonMessage: 'Review paper',
      AuthorSubmitButtonMessage: 'Submit more',
      NormalSubmitButtonMessage: 'Submit paper now',

      loading: true,
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
            // 转化为第一个字母大写
            this.conferenceDetail.stage = this.conferenceDetail.stage.charAt(0) + this.conferenceDetail.stage.substring(1).toLowerCase();
            this.setButtons();
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'get conference details error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    setButtons() {
      if (this.conferenceDetail.stage === 'Ending') {
        this.ChairButtonIsAble = false;
      }
      if (this.conferenceDetail.stage !== 'Reviewing') {
        this.PCMemberButtonIsAble = false;
      }
      if (this.conferenceDetail.stage !== 'Contribution') {
        this.SubmitButtonIsAble = false;
      }
      if (this.conferenceDetail.stage !== 'Contribution') {
        this.SubmitButtonIsAble = false;
      }
    },
    //跳转到邀请 PC Member界面
    gotoInvite() {
      this.InviteReviewerVisible = true;
    },
    // chair 发起使会议进入下一步的请求
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
      this.$confirm('Are you sure you wanna move the conference to the next stage?', 'tips', { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' })
        .then(() => {
          //发送AJAX请求改变会议状态
          this.$axios
            .post('/system/chairChangeConferenceStage', {
              conferenceId: this.conferenceDetail.id,
              changedStage: this.getNextStage(this.conferenceDetail.stage),
              token: this.$store.state.token,
            })
            .then((resp) => {
              if (resp.status === 200) {
                this.$router.go(0);
              } else {
                this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({ type: 'error', message: 'change stage error', duration: '2000', showClose: 'true', center: 'true' });
            });
          //刷新页面
          this.$router.replace('/conferenceDetail/' + this.conferenceDetail.id);
        })
        .catch(() => {
          this.$message({ type: 'info', message: 'canceled', duration: '1000', showClose: 'true', center: 'true' });
        });
    },
    // pc member 评价论文
    reviewPaper() {},
    // 提交会议
    submitPaper() {
      this.contributeFormVisible = true;
    },
  },
};
</script>
