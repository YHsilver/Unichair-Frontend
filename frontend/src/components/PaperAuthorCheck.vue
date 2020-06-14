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

          <el-button v-show="toggle === 'PaperDetail' && status === 'Reviewed'" type="primary" plain @click="rebuttalVisible = true" :disabled="rebuttalDisabled">
            Rebuttal
          </el-button>
          <el-dialog title="Rebuttal" :visible.sync="rebuttalVisible" append-to-body width="600px">
            <el-input type="textarea" rows="24" placeholder="rebuttal" v-model="rebuttalAuthorText" maxlength="800" show-word-limit> </el-input>
          </el-dialog>
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
import Bus from '@/api/Bus.js';

export default {
  name: 'MyPaper',
  components: { PaperSubmitForm, PaperDetail, PaperList },
  props: { conferenceId: Number, conferenceTopics: Array },
  data() {
    return {
      toggle: 'PaperDetail',
      chosePaper: false,
      chosePaperId: undefined,
      status: undefined,
      // rebuttal
      rebuttalVisible: false,
      rebuttalAuthorName: '',
      rebuttalAuthorText: '',
      rebuttalDisabled: false,
    };
  },
  created() {
    Bus.$on('isRebuttaled', (isRebuttal) => {
      this.rebuttalDisabled = isRebuttal;
    });
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
    sendRebuttal() {
      this.$axios
        .post('/system/authorSendRebuttal', {
          token: this.$store.state.token,
          paperId: this.paperId,
          rebuttal: this.rebuttalAuthorText,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
