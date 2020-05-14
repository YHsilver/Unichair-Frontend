<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'Author'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>
      <el-col :xl="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperDetail v-show="toggle === 'PaperDetail'" :Identity="'Author'" :paperId="chosePaperId" />

        <!-- modify paper -->
        <PaperSubmitForm @submitPaperFinished="finish()" v-show="toggle === 'ModifyForm'" :conferenceId="conferenceId" :conferenceTopics="conferenceTopics" :Identity="'Author'" />

        <div style="width:720px;margin:auto">
          <el-button
            v-show="toggle === 'PaperDetail'"
            type="primary"
            @click="toggle === 'PaperDetail' ? (toggle = 'ModifyForm') : (toggle = 'PaperDetail')"
            :disabled="status !== 'CONTRIBUTION'"
            >Modify</el-button
          >
          <el-button v-show="toggle === 'PaperDetail'" @click="cancel()" type="text" style="float:right">Cancel</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaperSubmitForm from '@/components/PaperSubmitForm.vue';
import PaperDetail from '@/components/PaperDetail.vue';
import PaperList from '@/components/PaperTable.vue';

export default {
  name: 'MyPaper',
  components: { PaperSubmitForm, PaperDetail, PaperList },
  props: { conferenceId: Number, conferenceTopics: Array },
  data() {
    return { toggle: 'PaperDetail', chosePaper: false, chosePaperId: undefined, status: undefined };
  },
  methods: {
    cancel() {
      this.chosePaper = false;
    },
    finish() {
      this.toggle = 'PaperDetail';
    },
    passPaperId(paperId, status) {
      this.toggle = 'PaperDetail';
      this.chosePaperId = paperId;
      this.status = status;
      this.chosePaper = true;
    },
  },
};
</script>
