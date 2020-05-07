<template>
  <div>
    <el-row :gutter="100">
      <el-col :span="10">
        <!-- paper list -->
        <PaperList :Identity="'Author'" :conferenceId="conferenceId" @choosedPaper="passPaperId" />
      </el-col>
      <el-col :span="14">
        <!-- paper details -->
        <PaperInfo v-show="toggle === 'PaperInfo'" :Identity="'Author'" :paperId="choosedPaperId" @getPaperInfo="passPaperInfo" />

        <!-- modify paper -->
        <ModifyForm @modifyCancel="finish()" v-show="toggle === 'ModifyForm'" :paperInfo="paperInfo" />

        <div style="width:520px;margin:auto">
          <el-button v-show="toggle === 'PaperInfo'" type="primary" @click="toggle === 'PaperInfo' ? (toggle = 'ModifyForm') : (toggle = 'PaperInfo')">Modify</el-button>
          <el-button v-show="toggle === 'PaperInfo'" @click="finish()" type="text" style="float:right">Cancel</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModifyForm from '@/components/authorComponents/ModifyForm.vue';
import PaperInfo from '@/components/PaperInfo.vue';
import PaperList from '@/components/PaperList.vue';

export default {
  name: 'MyPaper',
  components: { ModifyForm, PaperInfo, PaperList },
  props: { conferenceId: Number },
  data() {
    return { toggle: 'PaperInfo', paperInfo: {}, choosedPaperId: undefined };
  },
  methods: {
    finish() {
      this.toggle = 'PaperInfo';
      this.$emit('modifyFinished');
    },
    passPaperId(paperId) {
      this.choosedPaperId = paperId;
    },
    passPaperInfo(paperInfo) {
      this.paperInfo = paperInfo;
    },
  },
};
</script>
