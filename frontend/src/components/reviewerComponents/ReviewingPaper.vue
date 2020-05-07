<template>
  <div>
    <el-row :gutter="100">
      <el-col :span="10">
        <!-- paper list -->
        <PaperList :Identity="'Reviewer'" :conferenceId="conferenceId" @choosedPaper="passPaperId" />
      </el-col>
      <el-col :span="14">
        <!-- paper details -->
        <PaperInfo :conferenceId="conferenceId" :Identity="'Reviewer'" :paperId="choosedPaperId" />

        <!-- rating -->
        <RatingForm :paperId="paperId" />
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
    return { choosedPaperId: undefined };
  },
  methods: {
    passPaperId(paperId) {
      this.choosedPaperId = paperId;
    },
  },
};
</script>
