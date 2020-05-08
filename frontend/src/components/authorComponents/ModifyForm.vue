<template>
  <div style="width:520px;margin:auto">
    <el-form :model="paperInfo" :rules="paperInfoRules" :ref="paperInfo" label-width="200px" enctype="multipart/form-data" label-position="top">
      <el-form-item label="Title" prop="title">
        <el-input v-model="paperInfo.title" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="Authors" prop="authors">
        <el-form :model="author" v-for="(author, index) in paperInfo.authors" :key="index" :rules="authorRules" :inline="true" style="padding: 10px;">
          <!-- name -->
          <el-form-item prop="name" label="name">
            <el-input v-model="author.name"></el-input>
          </el-form-item>
          <!-- unit -->
          <el-form-item prop="unit" label="unit">
            <el-input v-model="author.unit"></el-input>
          </el-form-item>
          <!-- area -->
          <el-form-item prop="area" label="area">
            <el-input v-model="author.area"></el-input>
          </el-form-item>
          <!-- email -->
          <el-form-item prop="email" label="email">
            <el-input v-model="author.email"></el-input>
          </el-form-item>
          <el-button icon="el-icon-close" @click.prevent="removeAuthor(author)" circle size="mini"></el-button>
        </el-form>
        <el-button @click="addAuthor" style="margin:20px 0;" plain>+ Author</el-button>
      </el-form-item>

      <el-form-item label="Topics" style="width: 60%;display:inline-block;">
        <el-tag
          :key="index"
          v-for="(topic, index) in conferenceTopics"
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
        <el-button :key="index" v-for="(topic, index) in paperInfo.topics" type="text">{{ topic }}</el-button>
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
            <el-button type="primary" size="mini" @click="modifyPaper(paperInfo)">确定</el-button>
          </div>
          <!-- Passerby -->
          <el-button slot="reference" type="primary">Send</el-button>
        </el-popover>
        <el-button @click="paperInfo = { title: '', authors: [], summary: '', topics: [' '], file: null }" style="margin-left:10px">Reset</el-button>
        <el-button @click="cancel()" type="text" style="float:right">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'paperInfo',
  props: { paperInfo: Object, conferenceTopics: Array },
  data() {
    const topicsValid = (rule, value, callback) => {
      let topics = this.paperInfo.topics;
      if (topics.length < 2) {
        return callback(new Error('至少选择一个主题!'));
      }
      return callback();
    };
    const authorsValid = (rule, value, callback) => {
      const authorsLen = this.paperInfo.authors.length;
      let authorsSet = new Set();
      for (let i = 0; i < authorsLen; i++) {
        authorsSet.add(this.paperInfo.authors[i].name);
      }
      if (authorsLen > authorsSet.size) {
        return callback(new Error('Name repeated!'));
      }
      return callback();
    };
    return {
      visible: false,
      authorRules: {
        name: [
          { required: true, message: '', trigger: 'blur' },
          { validator: authorsValid, message: 'Name repeated!', trigger: 'blur' },
        ],
        unit: [{ required: true, message: '', trigger: 'blur' }],
        area: [{ required: true, message: '', trigger: 'blur' }],
        email: [{ required: true, message: '', trigger: 'blur' }],
      },
      paperInfoRules: {
        title: [
          { required: true, message: '', trigger: 'blur' },
          { max: 50, message: 'max length is 50 character', trigger: 'blur' },
        ],
        authors: [{ required: true, message: '', trigger: 'blur' }],
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
    // topics
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
    // authors
    removeAuthor(author) {
      var index = this.paperInfo.authors.indexOf(author);
      if (index !== -1) {
        this.paperInfo.authors.splice(index, 1);
      }
    },
    addAuthor() {
      this.paperInfo.authors.push({});
    },
    // file
    upload() {
      document.getElementById('uploadInput').click();
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
    getModifiedData: function() {
      // 去除占位符
      let topicSet = new Set(this.paperInfo.topics);
      topicSet.delete('');
      this.paperInfo.topics = [...topicSet];
      // authors 转为 String 数组
      let authorString = JSON.stringify(this.paperInfo.authors);
      authorString = authorString.replace(/{/g, '[');
      authorString = authorString.replace(/"\w+?":/g, '');
      authorString = authorString.replace(/}/g, ']');
      // formData
      let formData = new FormData();
      formData.append('file', this.paperInfo.file);
      formData.append('paperId', this.paperInfo.paperId);
      formData.append('authors', authorString);
      formData.append('topics', this.paperInfo.topics);
      formData.append('conferenceId', this.conferenceId);
      formData.append('title', this.paperInfo.title);
      formData.append('token', this.$store.state.token);
      formData.append('summary', this.paperInfo.summary);
      return formData;
    },
    modifyPaper(formName) {
      this.visible = false;
      // authors infomation all filled
      for (let i = 0; i < this.paperInfo.authors.length; i++) {
        let author = this.paperInfo.authors[i];
        if (!author.name || !author.email || !author.unit || !author.area) {
          this.$message({ type: 'warning', message: 'Please fill in the information', duration: '2000', showClose: 'true', center: 'true' });
          return;
        }
      }
      // no reapeted name
      const authorsLen = this.paperInfo.authors.length;
      let authorsSet = new Set();
      for (let i = 0; i < authorsLen; i++) {
        authorsSet.add(this.paperInfo.authors[i].name);
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/system/authorModifyPaper', this.getModifiedData())
            .then((resp) => {
              if (resp.status === 200) {
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
