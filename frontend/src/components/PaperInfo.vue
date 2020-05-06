<template>
  <div>
    <el-form :model="paperInfo" :rules="paperInfoRules" :ref="paperInfo" label-width="80px" enctype="multipart/form-data" label-position="top">
      <el-form-item label="Title" prop="title">
        <el-input v-model="paperInfo.title" maxlength="50" show-word-limit disable></el-input>
      </el-form-item>

      <el-form-item label="Authors" prop="authors">
        <el-tag :key="author" v-for="author in paperInfo.authors" closable :disable-transitions="false" @close="handleAuthorClose(author)">
          {{ author }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Author</el-button>
      </el-form-item>

      <el-form-item label="Paper Topics">
        <el-tag :key="topic" v-for="topic in paperInfo.topics" effect="dark" style="margin-right: 10px;cursor: pointer;">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <el-input v-model="paperInfo.summary" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
      </el-form-item>

      <el-form-item label="PDF File" prop="file">
        <input type="file" required @change="getContributeFile($event)" accept=".pdf" style="display:none" id="uploadInput" />
        <el-button type="primary" size="small" @click="upload">choose file</el-button> <span>{{ fileName }}</span>
        <el-button type="primary" @click="pdfVisible = true" size="small" v-show="previewVisible" style="float: right;">Preview</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PaperInfo',
  props: { conferenceId: Number, address: String, conferenceTopics: Array },
  data() {
    const topicsValid = (rule, value, callback) => {
      let topics = this.paperForm.topics;
      if (topics.length < 1) {
        return callback(new Error('至少选择一个主题!'));
      }
      return callback();
    };
    const authorsValid = (rule, value, callback) => {
      let authors = this.paperForm.authors;
      const authorsSet = new Set(authors);
      if (authors.length > authorsSet.size) {
        return callback(new Error("Author's name cannot be the same!"));
      }
      return callback();
    };
    return {
      paperInfo: {},
      paperInfoRules: {
        title: [
          { required: true, message: '', trigger: 'blur' },
          { max: 50, message: 'max length is 50 character', trigger: 'blur' },
        ],
        authors: [
          { required: true, message: '', trigger: 'blur' },
          { validator: authorsValid, message: "Author's name cannot be the same!", trigger: 'blur' },
        ],
        summary: [
          { required: true, message: '', trigger: 'blur' },
          { max: 800, message: 'max length is 800 character', trigger: 'blur' },
        ],
        topics: [
          { required: true, message: '', trigger: 'blur' },
          { validator: topicsValid, message: '至少选择一个主题!', trigger: 'blur' },
        ],
        file: [{ required: true, message: '', trigger: 'blur' }],
      },
      inputVisible: false,
      inputValue: '',
      fileName: '',
    };
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
.el-tag + .el-tag {
  margin-left: 10px;
}

.el-tag + .button-new-tag {
  margin-left: 10px;
}

.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
