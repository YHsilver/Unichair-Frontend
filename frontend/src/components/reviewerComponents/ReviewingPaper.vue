<template>
  <div>
    <el-row :gutter="100">
      <el-col :span="10">
       <PaperList :Identity="'Reviewer'" />
      </el-col>
      <el-col :span="14">
        <PaperInfo :conferenceId="conferenceId" :address="'/system/reviewerGetPapers'" :Identity="'Reviewer'" />
        <RatingForm />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RatingForm from '@/components/reviewerComponents/RatingForm.vue';
import PaperInfo from '@/components/PaperInfo.vue';
import PaperList from '@/components/PaperList.vue';

export default { name: 'ReviewingPaper', components: { RatingForm, PaperInfo,PaperList }, props: { conferenceId: Number } };
</script>
