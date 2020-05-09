<template>
  <div>
    <el-row :gutter="100">
      <el-col :lg="10" :sm="24" :xs="24" style="margin:auto">
        <!-- paper list -->
        <PaperList :Identity="'Author'" :conferenceId="conferenceId" @chosePaper="passPaperId" />
      </el-col>
      <el-col :lg="14" :sm="24" :xs="24" v-if="chosePaper">
        <!-- paper details -->
        <PaperInfo v-show="toggle === 'PaperInfo'" :Identity="'Author'" :paperId="chosePaperId" />

        <!-- modify paper -->
        <PaperForm @submitPaperFinished="finish()" v-show="toggle === 'ModifyForm'" :conferenceId="conferenceId" :conferenceTopics="conferenceTopics" :Identity="'Author'" />

        <div style="width:720px;margin:auto">
          <el-button v-show="toggle === 'PaperInfo'" type="primary" @click="toggle === 'PaperInfo' ? (toggle = 'ModifyForm') : (toggle = 'PaperInfo')">Modify</el-button>
          <el-button v-show="toggle === 'PaperInfo'" @click="finish()" type="text" style="float:right">Cancel</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaperForm from '@/components/PaperForm.vue';
import PaperInfo from '@/components/PaperInfo.vue';
import PaperList from '@/components/PaperList.vue';

export default {
  name: 'MyPaper',
  components: { PaperForm, PaperInfo, PaperList },
  props: { conferenceId: Number, conferenceTopics: Array },
  data() {
    return { toggle: 'PaperInfo', chosePaper: false, chosePaperId: undefined };
  },
  methods: {
    finish() {
      this.toggle = 'PaperInfo';
      this.$emit('modifyFinished');
    },
    passPaperId(paperId) {
      this.chosePaperId = paperId;
      this.chosePaper = true;
    },
  },
};
</script>
