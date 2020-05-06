<template>
  <div>
    <el-row :gutter="200">
      <el-col :span="10">
        <!-- TODO: add paper lists -->
      </el-col>
      <el-col :span="14">
        <PaperInfo v-show="toggle === 'PaperInfo'" :address="'/system/reviewerGetPapers'" :Identity="'Author'" />
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

export default {
  name: 'MyPaper',
  components: { ModifyForm, PaperInfo },
  props: { conferenceId: Number },
  data() {
    return { toggle: 'PaperInfo', paperInfo: {} };
  },
  methods: {
    finish() {
      this.toggle = 'PaperInfo';
      this.$emit('modifyFinished');
    },
  },
};
</script>
