<template>
  <div style="width:720px;margin:auto">
    <el-form :model="paperInfo" label-width="200px" label-position="left">
      <el-form-item label="Title" prop="title">
        <span>{{ paperInfo.title }}</span>
      </el-form-item>

      <div v-if="Identity === 'Author'">
        <el-form-item :key="index" v-for="(author, index) in paperInfo.authors" :label="'Authors' + index + 1">
          <strong> name: </strong><span> {{ author.name }} </span> <strong> area: </strong> <span> {{ author.area }} </span> <strong> unit: </strong>
          <span> {{ author.unit }} </span> <strong> email: </strong><span> {{ author.email }} </span>
        </el-form-item>
      </div>

      <el-form-item label="Topics" prop="topic">
        <el-tag :key="index" v-for="(topic, index) in paperInfo.topics" effect="dark" style="margin-right: 10px;cursor: pointer;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <span>{{ paperInfo.summary }}</span>
      </el-form-item>

      <el-form-item label="Finish Reviewed" prop="isAllReviewed">
        <span>{{ paperInfo.isAllReviewed }}</span>
      </el-form-item>

      <span>{{ paperInfo.fileName }}</span>
      <el-button-group style="float: right">
        <el-button type="plain" size="small" @click="downloadFile">Download</el-button>
        <el-button type="primary" size="small" @click="previewFile">Preview</el-button>
        <el-drawer :visible.sync="pdfVisible" :size="'720px'" :title="paperInfo.fileName" append-to-body>
          <iframe :src="pdfSrc" style="width: 90%;height: 90vh;margin-left: 5%;"></iframe>
        </el-drawer>
      </el-button-group>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>

<script>
import Bus from '@/api/Bus';

export default {
  name: 'PaperInfo',
  props: { paperId: Number, Identity: String },
  data() {
    return { paperInfo: {}, address: '', file: undefined, pdfSrc: undefined, pdfVisible: false };
  },
  created() {
    this.getpaperInfo();
  },
  methods: {
    getpaperInfo() {
      this.Identity === 'Author' ? (this.address = '/system/authorGetMyPaperDetails') : (this.address = '/system/reviewerGetPaperDetails');
      this.$axios
        .post(this.address, { token: this.$store.state.token, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this.paperInfo = resp.data;
            Bus.$emit('getPaperInfo', this.paperInfo);
            if (this.paperInfo.isCurrPCMemberReviewed) {
              let Result = {};
              this.paperInfo.myGrade > 0 ? (Result.grade = this.paperInfo.myGrade + 2) : (Result.grade = this.paperInfo.myGrade + 3);
              switch (this.paperInfo.myConfidence) {
                case 'VERY_LOW':
                  Result.confidenceVal = 1;
                  break;
                case 'LOW':
                  Result.confidenceVal = 2;
                  break;
                case 'HIGH':
                  Result.confidenceVal = 3;
                  break;
                case 'VERY_HIGH':
                  Result.confidenceVal = 4;
                  break;
              }
              Result.comment = this.paperInfo.myComment;
              Bus.$emit('isPaperRated', this.paperInfo.isCurrPCMemberReviewed, Result);
            }
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    getFileURL() {
      this.$axios
        .post('/system/userGetPaperPdfFile', { paperId: this.paperId }, { responseType: 'blob' })
        .then((resp) => {
          if (resp.status === 200) {
            const blob = resp.data;
            if (window.createObjectURL != undefined) {
              this.pdfSrc = window.createObjectURL(blob); // basic
            } else if (window.webkitURL != undefined) {
              this.pdfSrc = window.webkitURL.createObjectURL(blob); // webkit or chrome
            } else if (window.URL != undefined) {
              this.pdfSrc = window.URL.createObjectURL(blob); // mozilla(firefox)
            }
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    downloadFile() {
      if (this.pdfSrc === undefined) this.getFileURL();
      var a = document.createElement('a');
      a.download = this.paperInfo.fileName;
      a.href = this.pdfSrc;
      document.body.append(a); // 修复firefox中无法触发click
      a.click();
      a.remove();
    },
    previewFile() {
      if (this.pdfSrc === undefined) this.getFileURL();
      this.pdfVisible = true;
    },
  },
};
</script>

<style scoped>
/* element tag */
.el-tag {
  margin-right: 10px;
}
</style>
