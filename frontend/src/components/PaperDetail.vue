<template>
  <div style="width:720px;margin:auto" v-loading="loading">
    <el-form :model="paperInfo" label-width="200px" label-position="left">
      <el-form-item label="Title" prop="title">
        <span>{{ paperInfo.title }}</span>
      </el-form-item>

      <div v-if="Identity === 'Author' || Identity === 'PasserBy'">
        <el-form :key="index" v-for="(author, index) in paperInfo.authors" inline class="paperInfoAuthor">
          <h3>{{ 'Author ' + (index + 1) }}</h3>
          <el-form-item label="Name" prop="name">
            <span> {{ author.name }} </span>
          </el-form-item>
          <el-form-item label="Area" prop="area">
            <span> {{ author.area }} </span>
          </el-form-item>
          <el-form-item label="Unit" prop="unit">
            <span> {{ author.name }} </span>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <span> {{ author.email }} </span>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
      </div>

      <el-form-item label="Topics" prop="topic">
        <el-tag :key="index" v-for="(topic, index) in paperInfo.topics" effect="dark" style="margin-right: 10px;cursor: pointer;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <span>{{ paperInfo.summary }}</span>
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <span>{{ paperInfo.status }}</span>
      </el-form-item>

      <div v-if="paperInfo.status === 'REVIEWED'">
        <el-form :key="index" v-for="index in 3" label-width="200px" label-position="left">
          <!-- <el-form-item label="Reviewer Name:">
            <span>{{ paperInfo.reviewerFullNames[index - 1] }}</span>
          </el-form-item> -->
          <el-form-item label="Grade:">
            <span>{{ paperInfo.grades[index - 1] }}</span>
          </el-form-item>
          <el-form-item label="Confidences:">
            <span>{{ paperInfo.confidences[index - 1] }}</span>
          </el-form-item>
          <el-form-item label="Comments:">
            <span>{{ paperInfo.comments[index - 1] }}</span>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
      </div>

      <el-form-item label="File Name" prop="fileName">
        <span>{{ paperInfo.fileName }} ( {{ fileSizeString }} )</span>
      </el-form-item>

      <el-form-item>
        <el-button-group style="float: right">
          <el-button type="plain" size="small" @click="downloadFile">Download</el-button>
          <el-button type="primary" size="small" @click="previewFile">Preview</el-button>
          <el-drawer :visible.sync="pdfVisible" :size="'min(720px,100%)'" :title="paperInfo.fileName" append-to-body>
            <div v-loading="pdfLoading">
              <iframe :src="pdfSrc" style="width: 90%;height: 90vh;margin-left: 5%;"></iframe>
            </div>
          </el-drawer>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>

<script>
import Bus from '@/api/Bus';

export default {
  name: 'PaperDetail',
  props: { paperId: Number, Identity: String },
  data() {
    return { loading: true, paperInfo: {}, address: '', file: null, pdfSrc: undefined, pdfVisible: false, pdfLoading: true };
  },
  created() {
    Bus.$on('prereviewPaper', () => {
      this.previewFile();
    });
    Bus.$on('submitPaperFinished', () => {
      this.getPaperInfo();
    });
  },
  mounted() {
    this.getPaperInfo();
  },
  computed: {
    fileSizeString: function() {
      // bigger than 1 MB
      if (this.paperInfo.fileSize >= 1048576) return (this.paperInfo.fileSize / 1048576).toFixed(1) + 'MB';
      // lest than 1 MB
      else return (this.paperInfo.fileSize / 1024).toFixed(1) + 'KB';
    },
  },
  methods: {
    getPaperInfo() {
      this.Identity === 'Author' ? (this.address = '/system/authorGetMyPaperDetails') : (this.address = '/system/reviewerGetPaperDetails');
      this.$axios
        .post(this.address, { token: this.$store.state.token, paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            this.paperInfo = resp.data;
            Bus.$emit('getPaperInfo', this.paperInfo);
            if (this.paperInfo.isCurrPCMemberReviewed === 'true') {
              let Result = {};
              this.paperInfo.myGrade > 0 ? (Result.grade = Number(this.paperInfo.myGrade) + 2) : (Result.grade = Number(this.paperInfo.myGrade) + 3);
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
              Bus.$emit('isPaperRated', this.paperInfo.isCurrPCMemberReviewed === 'true', Result);
              Bus.$emit('isPaperChecked', this.paperInfo.isCurrPCMemberChecked === 'true');
              Bus.$emit('isRebuttalChecked', this.paperInfo.isCurrPCMemberRebuttalChecked === 'true');
              Bus.$emit('isRebuttaled', this.paperInfo.isRebuttal);
              this.loading = false;
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
      return new Promise((resolve, reject) => {
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
              resolve();
            } else {
              this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
              reject();
            }
          })
          .catch((err) => {
            this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
          });
      });
    },
    downloadFile() {
      const loading = this.$loading({ lock: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.6)' });

      async function download(it) {
        await it.getFileURL();
        loading.close();
        var a = document.createElement('a');
        a.download = it.paperInfo.fileName;
        a.href = it.pdfSrc;
        document.body.append(a); // 修复firefox中无法触发click
        a.click();
        a.remove();
      }

      download(this);
    },
    previewFile() {
      this.getFileURL();
      this.pdfVisible = true;
      this.pdfLoading = true;
    },
  },
  watch: {
    pdfSrc: function() {
      this.pdfLoading = false;
    },
    paperInfo: function() {
      this.loading = false;
    },
    paperId: function() {
      this.loading = true;
      this.getPaperInfo();
    },
  },
};
</script>

<style>
/* element tag */
.el-tag {
  margin-right: 10px;
}

.paperInfoAuthor .el-form-item__label {
  width: 60px !important;
}
</style>
