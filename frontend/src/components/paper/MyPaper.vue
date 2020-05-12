<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'Author'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>
      <el-col :xl="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperInfo v-show="toggle === 'PaperInfo'" :Identity="'Author'" :paperId="chosePaperId" />

        <!-- modify paper -->
        <PaperForm @submitPaperFinished="finish()" v-show="toggle === 'ModifyForm'" :conferenceId="conferenceId" :conferenceTopics="conferenceTopics" :Identity="'Author'" />

        <div style="width:720px;margin:auto">
          <el-button
            v-show="toggle === 'PaperInfo'"
            type="primary"
            @click="toggle === 'PaperInfo' ? (toggle = 'ModifyForm') : (toggle = 'PaperInfo')"
            :disabled="status !== 'CONTRIBUTION'"
            >Modify</el-button
          >
          <el-button v-show="toggle === 'PaperInfo'" @click="cancel()" type="text" style="float:right">Cancel</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaperForm from '@/components/paper/PaperForm.vue';
import PaperInfo from '@/components/paper/PaperInfo.vue';
import PaperList from '@/components/paper/PaperList.vue';

export default {
  name: 'MyPaper',
  components: { PaperForm, PaperInfo, PaperList },
  props: { conferenceId: Number, conferenceTopics: Array },
  data() {
    return { toggle: 'PaperInfo', chosePaper: false, chosePaperId: undefined, status: undefined };
  },
  methods: {
    cancel() {
      this.chosePaper = false;
    },
    finish() {
      this.toggle = 'PaperInfo';
    },
    passPaperId(paperId, status) {
      this.toggle = 'PaperInfo';
      this.chosePaperId = paperId;
      this.status = status;
      this.chosePaper = true;
    },
  },
};
</script>
