<template>
  <div style="width:520px;margin:auto">
    <el-form :model="paperInfo" label-width="200px" label-position="left">
      <el-form-item label="Title" prop="title">
        <span>{{ paperInfo.title }}</span>
      </el-form-item>

      <el-form-item label="Authors" prop="authors" v-if="Identity === 'Author'">
        <el-tag :key="author" v-for="author in paperInfo.authors">
          {{ author }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Topics">
        <el-tag :key="topic" v-for="topic in paperInfo.topics" effect="dark" style="margin-right: 10px;cursor: pointer;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <span>{{ paperInfo.summary }}</span>
      </el-form-item>

      <el-form-item label="Paper Name" prop="file">
        <span>{{ paperInfo.fileName }}</span>
        <el-button-group style="float: right">
          <el-button type="plain" size="small">Download</el-button>
          <el-button type="primary" size="small">Preview</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'PaperInfo',
  props: { conferenceId: Number, address: String, Identity: String },
  data() {
    return { paperInfo: {} };
  },
  methods: {
    getpaperInfo() {
      this.$axios
        .post(this.address, { token: this.$store.state.token, conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.paperInfo = resp.data;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get paper information error', duration: '2000', showClose: 'true', center: 'true' });
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
