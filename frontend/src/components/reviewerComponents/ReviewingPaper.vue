<template>
  <div>
    <el-row :gutter="200">
      <el-col :span="16">
        <!-- TODO: add paper lists -->
      </el-col>
      <el-col :span="8">
        <PaperInfo :conferenceId="conferenceId" :address="'/system/reviewerGetPapers'" :Identity="'Reviewer'" /> <el-divider></el-divider>
        <RatingForm />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RatingForm from '@/components/reviewerComponents/RatingForm.vue';
import PaperInfo from '@/components/PaperInfo.vue';

export default { name: 'ReviewingPaper', components: { RatingForm, PaperInfo }, props: { conferenceId: Number } };
</script>
