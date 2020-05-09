<template>
  <div>
    <el-row :gutter="100">
      <el-col :lg="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'Reviewer'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>
      <el-col :lg="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperInfo :conferenceId="conferenceId" :Identity="'Reviewer'" :paperId="chosePaperId" />

        <!-- rating -->
        <RatingForm :paperId="chosePaperId" @finishRatingAPaper="finishARating" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RatingForm from '@/components/reviewerComponents/RatingForm.vue';
import PaperInfo from '@/components/PaperInfo.vue';
import PaperList from '@/components/PaperList.vue';

export default {
  name: 'ReviewingPaper',
  components: { RatingForm, PaperInfo, PaperList },
  props: { conferenceId: Number },
  data() {
    return { chosePaper: false, chosePaperId: undefined };
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
