<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'PasserBy'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>

      <el-col :xl="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperDetail v-show="toggle === 'PaperDetail'" :Identity="'PasserBy'" :paperId="chosePaperId" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaperDetail from '@/components/PaperDetail.vue';
import PaperList from '@/components/PaperTable.vue';

export default {
  name: 'ConferenceResult',
  components: { PaperDetail, PaperList },
  props: { conferenceId: Number, conferenceTopics: Array },
  data() {
    return {
      toggle: 'PaperDetail',
      chosePaper: false,
      chosePaperId: undefined,
    };
  },
  methods: {
    passPaperId(paperId, status) {
      this.toggle = 'PaperDetail';
      this.chosePaperId = paperId;
      this.status = status;
      this.chosePaper = true;
    },
  },
};
</script>
