<template>
  <div style="width:520px;margin:auto">
    <el-form :model="paperInfo" :rules="paperInfoRules" :ref="paperInfo" label-width="200px" enctype="multipart/form-data" label-position="top">
      <el-form-item label="Title" prop="title">
        <el-input v-model="paperInfo.title" maxlength="50" show-word-limit></el-input>
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

      <el-form-item label="Topics" style="width: 60%;display:inline-block;">
        <el-tag
          :key="topic"
          v-for="topic in paperInfo"
          effect="dark"
          style="margin-right: 10px;cursor: pointer;"
          @click="addTopic(topic)"
          closable
          @close="handleTopicClose(topic)"
        >
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="My Topics" prop="topics" style="width: 38%;display: inline-block;margin-left: 2%;">
        <el-button :key="topic" v-for="topic in paperInfo.topics" type="text" style="height:40px">{{ topic }}</el-button>
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <el-input v-model="paperInfo.summary" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
      </el-form-item>

      <el-form-item label="PDF File" prop="file">
        <input type="file" required @change="getContributeFile($event)" accept=".pdf" style="display:none" id="uploadInput" />
        <el-button type="primary" size="small" @click="upload">choose file</el-button> <span>{{ fileName }}</span>
        <el-button type="primary" @click="pdfVisible = true" size="small" v-show="previewVisible" style="float: right;">Preview</el-button>
        <el-drawer :visible.sync="pdfVisible" :size="'60%'" :title="fileName" append-to-body>
          <iframe :src="src" style="width: 90%;height: 90vh;margin-left: 5%;"></iframe>
        </el-drawer>
      </el-form-item>
      <!-- Identity -->
      <el-form-item>
        <!-- Passerby -->
        <el-popover placement="top" width="160" v-model="visible">
          <p>确定提交吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="submitpaperInfo(paperInfo)">确定</el-button>
          </div>
          <!-- Passerby -->
          <el-button slot="reference" type="primary">Send</el-button>
        </el-popover>
        <el-button @click="resetForm(paperInfo)" style="margin-left:10px">Reset</el-button>
        <el-button @click="cancel()" type="text" style="float:right">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'paperInfo',
  props: { paperInfo: Object },
  data() {
    const topicsValid = (rule, value, callback) => {
      let topics = this.paperInfo.topics;
      if (topics.length < 1) {
        return callback(new Error('至少选择一个主题!'));
      }
      return callback();
    };
    const authorsValid = (rule, value, callback) => {
      let authors = this.paperInfo.authors;
      const authorsSet = new Set(authors);
      if (authors.length > authorsSet.size) {
        return callback(new Error("Authors' name cannot be the same!"));
      }
      return callback();
    };
    return {
      visible: false,
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
      previewVisible: false,
      src: '',
      pdfVisible: false,
    };
  },
  methods: {
    upload() {
      document.getElementById('uploadInput').click();
    },
    addTopic(topic) {
      let topicSet = new Set(this.paperInfo.topics);
      topicSet.add(topic);
      this.paperInfo.topics = [...topicSet];
    },
    handleTopicClose(topic) {
      let topicSet = new Set(this.paperInfo.topics);
      topicSet.delete(topic);
      this.paperInfo.topics = [...topicSet];
    },
    handleAuthorClose(tag) {
      this.paperInfo.authors.splice(this.paperInfo.authors.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.paperInfo.authors.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getContributeFile(event) {
      const file = event.currentTarget.files[0]; // 上传的文件
      this.paperInfo.file = file;
      this.fileName = file.name; // 文件名
      this.src = this.getObjectURL(file); // 文件地址
      this.previewVisible = true; // 预览的按钮
      let index = this.fileName.lastIndexOf('.'); //获取最后一个.的位置
      let type = this.fileName.substr(index + 1); //获取后缀
      if (type !== 'PDF' && type !== 'pdf') {
        this.$message({ type: 'error', message: 'only PDF file allowed!', duration: '2000', showClose: 'true', center: 'true' });
      }
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file); // basic
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file); // webkit or chrome
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file); // mozilla(firefox)
      }
      return url;
    },
    getContributeData: function() {
      // 去除占位符
      let topicSet = new Set(this.paperInfo.topics);
      topicSet.delete('');
      this.paperInfo.topics = [...topicSet];
      // formData
      let formData = new FormData();
      formData.append('file', this.paperInfo.file);
      formData.append('authors', this.paperInfo.authors);
      formData.append('topics', this.paperInfo.topics);
      formData.append('conferenceId', this.conferenceId);
      formData.append('title', this.paperInfo.title);
      formData.append('token', this.$store.state.token);
      formData.append('summary', this.paperInfo.summary);
      return formData;
    },
    submitpaperInfo(formName) {
      this.visible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/system/userSubmitPaper', this.getContributeData())
            .then((resp) => {
              if (resp.status === 200) {
                this.resetForm(this.paperInfo);
                this.$message({ type: 'success', message: 'contribute successfully', duration: '2000', showClose: 'true', center: 'true' });
                this.$emit('contributeFinished');
              } else {
                this.$message({ type: 'error', message: 'contribute failed', duration: '2000', showClose: 'true', center: 'true' });
              }
            })
            .catch(() => {
              this.$message({ type: 'error', message: 'contribute failed', duration: '2000', showClose: 'true', center: 'true' });
            });
        } else {
          this.$message({ type: 'warning', message: 'Please fill in the information', duration: '2000', showClose: 'true', center: 'true' });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.$emit('modifyCancel');
    },
  },
};
</script>
<style>
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
