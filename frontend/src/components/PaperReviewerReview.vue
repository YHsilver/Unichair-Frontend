<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'Reviewer'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>
      <el-col :xl="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperInfo :conferenceId="conferenceId" :Identity="'Reviewer'" :paperId="chosePaperId" />

        <!-- discuss paper -->
        <div style="width:720px;margin:auto">
          <el-button plain @click="discussPaperVisible = true" id="discussPaperButton"> <i class="el-icon-chat-dot-square"></i> Discuss paper</el-button>
          <el-dialog :visible.sync="discussPaperVisible" v-if="discussPaperVisible" append-to-body id="discussDialog" top="10vh" width="600px">
            <DiscussingPaper :Identity="'Reviewer'" :paperId="chosePaperId" />
          </el-dialog>
        </div>

        <!-- rating -->
        <RatingForm :paperId="chosePaperId" @finishRatingAPaper="finishARating" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RatingForm from '@/components/PaperRatingForm.vue';
import PaperInfo from '@/components/PaperDetail.vue';
import PaperList from '@/components/PaperTable.vue';
import DiscussingPaper from '@/components/PaperReviewerDiscuss.vue';

export default {
  name: 'ReviewingPaper',
  components: { RatingForm, PaperInfo, PaperList, DiscussingPaper },
  props: { conferenceId: Number },
  data() {
    return { chosePaper: false, chosePaperId: undefined, discussPaperVisible: false };
  },
  methods: {
    passPaperId(paperId) {
      this.chosePaperId = paperId;
      this.chosePaper = true;
    },
    finishARating() {
      this.chosePaperId = undefined;
    },
  },
};
</script>

<style scoped>
#discussPaperButton {
  float: right;
}

#discussDialog /deep/ .el-dialog {
  height: 80vh !important;
  overflow: auto !important;
}
</style>
