<template>
  <div v-loading="loading" id="ConferenceDetail">
    <el-form label-position="left" label-width="200px">
      <h3 style="text-align:center">
        Conference Detail
      </h3>

      <!-- admin -->
      <el-form-item label="ID" v-if="Identity === 'Admin'">
        <span>{{ conferenceDetail.id }}</span>
      </el-form-item>
      <!-- user -->
      <el-form-item label="Conference Abbreviation">
        <strong>{{ conferenceDetail.abbreviation }}</strong>
      </el-form-item>

      <el-form-item label="Conference Full Name">
        <span>{{ conferenceDetail.fullName }}</span>
      </el-form-item>

      <el-form-item label="Conference Location">
        <span>{{ conferenceDetail.heldPlace }}</span>
      </el-form-item>

      <div style="padding: 10px 0">
        <label style="float: left;text-align: left;">Timeline</label>
        <el-steps id="Timeline" :active="4">
          <el-step title="Contribute Start Date" :description="conferenceDetail.submissionDate"> </el-step>
          <el-step title="Contribute End Date" :description="conferenceDetail.submissionDeadline"></el-step>
          <el-step title="Contribute Release Date" :description="conferenceDetail.releaseDate"></el-step>
          <el-step title="Conference Date" :description="conferenceDetail.heldDate"></el-step>
        </el-steps>
      </div>

      <div style="padding: 20px 0">
        <label style="float: left;text-align: left;">Conference Stage</label>
        <el-steps :active="stepActive" finish-status="success">
          <el-step title="Preparation"></el-step>
          <el-step title="Contribution"></el-step>
          <el-step title="Reviewing"></el-step>
          <el-step title="Reviewed"></el-step>
          <el-step title="Ending"></el-step>
        </el-steps>
      </div>

      <el-form-item label="Conference Topics">
        <el-tag :key="index" v-for="(topic, index) in conferenceDetail.topics" :disable-transitions="false" effect="dark" style="margin-right: 10px;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Conference Introduction">
        <span>{{ conferenceDetail.introduction }}</span>
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item label="Chair">
        <el-tag type="warning" effect="plain">{{ conferenceDetail.chair }}</el-tag>
      </el-form-item>

      <el-form-item label="Reviewers">
        <span v-for="(pc, index) in conferenceDetail.PCMember" :key="index">{{ pc }} </span>
      </el-form-item>

      <el-form-item label="Author">
        <span v-for="(aAuthor, index) in conferenceDetail.Author" :key="index">{{ aAuthor }} </span>
      </el-form-item>
    </el-form>

    <!-- chair -->
    <!-- invite reviewer -->
    <el-button
      type="primary"
      @click="InviteReviewerVisible = true"
      v-if="Identity === 'Chair' && (conferenceDetail.stage === 'Preparation' || conferenceDetail.stage === 'Contribution')"
    >
      Invite PC Member
    </el-button>
    <el-dialog :visible.sync="InviteReviewerVisible" append-to-body :fullscreen="true">
      <InviteReviewer @inviteReviewerFinished="InviteReviewerVisible = false" :conferenceId="Number(conferenceDetail.id)" :conferenceFullName="conferenceDetail.fullName" />
    </el-dialog>
    <!-- move to next stage -->
    <el-popover placement="top" width="160" v-model="popoverVisible" v-if="Identity === 'Chair'">
      <p>Are you sure you wanna move the conference to the next stage?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverVisible = false">Cancel</el-button>
        <el-button type="primary" size="mini" @click="moveToNextStage()">Yes</el-button>
      </div>
      <el-button type="primary" slot="reference" :disabled="conferenceDetail.stage === 'Ending'">Move to next Stage</el-button>
    </el-popover>

    <!-- author -->
    <!-- modify Paper -->
    <el-button type="primary" @click="myPaperVisible = true" v-if="Identity === 'Author'">My papers</el-button>
    <el-dialog :visible.sync="myPaperVisible" v-if="myPaperVisible" append-to-body :fullscreen="true">
      <MyPaper @modifyFinished="myPaperVisible = false" :conferenceId="Number(conferenceDetail.id)" :conferenceTopics="conferenceDetail.topics" />
    </el-dialog>

    <!-- reviewer -->
    <!-- reviewPaper -->
    <el-button type="primary" @click="reviewPaperVisible = true" v-if="Identity === 'Reviewer' && conferenceDetail.stage === 'Reviewing'">Review paper</el-button>
    <el-dialog :visible.sync="reviewPaperVisible" v-if="reviewPaperVisible" append-to-body :fullscreen="true">
      <PaperReviewerReview :Identity="Identity" :conferenceId="Number(conferenceDetail.id)" />
    </el-dialog>

    <!-- submit paper -->
    <el-button
      type="primary"
      @click="contributeFormVisible = true"
      v-if="Identity == 'Passerby' && conferenceDetail.stage === 'Contribution' && $store.state.userDetails.username !== conferenceDetail.chair"
      >Submit paper</el-button
    >
    <el-dialog :visible.sync="contributeFormVisible" append-to-body :fullscreen="true" v-if="contributeFormVisible === true">
      <PaperForm
        @submitPaperFinished="contributeFormVisible = false"
        :conferenceId="Number(conferenceDetail.id)"
        :conferenceFullName="conferenceDetail.fullName"
        :conferenceTopics="conferenceDetail.topics"
        :Identity="Identity"
      />
    </el-dialog>
  </div>
</template>

<script>
import InviteReviewer from '@/components/MessageSend.vue';
import MyPaper from '@/components/PaperAuthorCheck.vue';
import PaperReviewerReview from '@/components/PaperReviewerReview.vue';
import PaperForm from '@/components/PaperSubmitForm.vue';

export default {
  name: 'ConferenceDetail',
  props: { conferenceId: Number, Identity: String },
  components: { InviteReviewer, MyPaper, PaperReviewerReview, PaperForm },
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
  computed: {
    stepActive() {
      const currStage = this.conferenceDetail.stage;
      if (currStage === 'Preparation') {
        return 1;
      } else if (currStage === 'Contribution') {
        return 2;
      } else if (currStage === 'Reviewing') {
        return 3;
      } else if (currStage === 'Reviewed') {
        return 4;
      }
      return 5;
    },
  },
  methods: {
    getConferenceDetails() {
      this.$axios
        .post('/system/userGetConferenceDetails', { conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.conferenceDetail = resp.data;
            if (this.conferenceDetail.PCMember.length === 0) this.conferenceDetail.PCMember = ['No Data'];
            if (this.conferenceDetail.Author.length === 0) this.conferenceDetail.Author = ['No Data'];

            // 转化为第一个字母大写
            this.conferenceDetail.stage = this.conferenceDetail.stage.charAt(0) + this.conferenceDetail.stage.substring(1).toLowerCase();
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    getNextStage(currStage) {
      if (currStage === 'Preparation') {
        return 'Contribution'.toUpperCase();
      } else if (currStage === 'Contribution') {
        return 'Reviewing'.toUpperCase();
      } else if (currStage === 'Reviewing') {
        return 'Reviewed'.toUpperCase();
      } else if (currStage === 'Reviewed') {
        return 'Ending'.toUpperCase();
      }
      return 'UNDEFINED';
    },
    moveToNextStage() {
      // from Contribution to Reviewing
      if (this.conferenceDetail.stage === 'Contribution') {
        this.$confirm('', 'Please choose a paper allocation policy', { confirmButtonText: 'TOPIC_RELATED', cancelButtonText: 'RANDOM' })
          .then(() => {
            this.moveToReviewing('TOPIC_RELATED');
          })
          .catch(() => {
            this.moveToReviewing('RANDOM');
          });
      } else {
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
          .catch((err) => {
            this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
          });
      }
      this.popoverVisible = false;
    },
    moveToReviewing(Strategy) {
      this.$axios
        .post('/system/chairStartReviewing', { conferenceId: this.conferenceDetail.id, strategy: Strategy, token: this.$store.state.token })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style>
#ConferenceDetail .el-form-item__content {
  text-align: left;
}

#ConferenceDetail .el-button ~ .el-button,
#ConferenceDetail .el-button ~ span .el-button {
  margin-left: 10px;
}

#ConferenceDetail .el-step__title.is-process {
  font-weight: 400;
}

#ConferenceDetail .el-step__title {
  font-size: 14px;
}

#ConferenceDetail .el-step__icon {
  border: 1px solid !important;
  width: 18px;
  height: 18px;
  display: flex;
  transform: translateY(5px);
}

#ConferenceDetail .el-step__icon .el-step__icon-inner {
  font-size: 10px;
}

.el-step__main {
  white-space: nowrap;
}

#Timeline .el-step__icon {
  width: 12px;
  height: 12px;
  background-color: #8669ed;
}
</style>
