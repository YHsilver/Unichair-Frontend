<template>
  <div style="width:520px;margin:auto">
    <el-form :model="paperInfo" label-width="200px" label-position="left">
      <el-form-item label="Title" prop="title">
        <span>{{ paperInfo.title }}</span>
      </el-form-item>

      <el-form-item label="Author" prop="authorFullName" v-if="Identity === 'Author'">
        <span>{{ paperInfo.authorFullName }}</span>
      </el-form-item>

      <el-form-item label="Topics" prop="topic">
        <el-tag :key="index" v-for="(topic, index) in paperInfo.topics" effect="dark" style="margin-right: 10px;cursor: pointer;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <span>{{ paperInfo.summary }}</span>
      </el-form-item>

      <span>{{ paperInfo.fileName }}</span>
      <el-button-group style="float: right">
        <el-button type="plain" size="small" @click="getFile">Download</el-button>
        <el-button type="primary" size="small">Preview</el-button>
      </el-button-group>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'PaperInfo',
  props: { paperId: Number, Identity: String },
  data() {
    return { paperInfo: {}, address: '', file: undefined };
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
            this.$emit('getPaperInfo', this.paperInfo);
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get paper information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    getFile() {
      this.$axios
        .post('/system/userGetPaperPdfFile', { paperId: this.paperId })
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            this.file = resp.data;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get file error', duration: '2000', showClose: 'true', center: 'true' });
        });
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
