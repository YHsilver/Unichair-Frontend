<template>
  <div style="width:600px;margin:auto">
    <h2>{{ conferenceFullName }}</h2>
    <el-divider></el-divider>

    <!-- Author -->
    <el-form :model="paperForm" :rules="paperFormRules" :ref="paperForm" label-width="80px" enctype="multipart/form-data" label-position="top">
      <el-form-item label="Title" prop="title" class="leftInput">
        <el-input v-model="paperForm.title" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="Author" prop="author" class="rightInput">
        <el-input v-model="paperForm.author"></el-input>
      </el-form-item>

      <el-form-item label="Topics" class="leftInput">
        <el-tag :key="topic" v-for="topic in conferenceTopics" effect="dark" style="margin-right: 10px;cursor: pointer;" @click="add(topic)" closable @close="handleClose(topic)">
          {{ topic }}
        </el-tag>
      </el-form-item>

      <el-form-item label="My Topics" prop="topics" class="rightInput">
        <el-button :key="topic" v-for="topic in paperForm.topics" type="text" style="height:40px">{{ topic }}</el-button>
      </el-form-item>

      <el-form-item label="Abstract" prop="summary">
        <el-input v-model="paperForm.summary" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
      </el-form-item>

      <el-form-item label="PDF File" prop="file">
        <input type="file" required @change="getContributeFile($event)" accept=".pdf" style="display:none" id="uploadInput" />
        <el-button type="primary" size="small" @click="upload">choose file</el-button> <span>{{ fileName }}</span>
        <el-button type="primary" @click="pdfVisible = true" size="small" v-show="previewVisible" style="float: right;">Preview</el-button>
      </el-form-item>
      <!-- Identity -->
      <el-form-item>
        <!-- Passerby -->
        <el-popover placement="top" width="160" v-model="visible">
          <p>确定提交吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="submitPaperForm(paperForm)">确定</el-button>
          </div>
          <!-- Passerby -->
          <el-button slot="reference" type="primary" v-if="Identity === 'Passerby'">Send</el-button>
          <!-- Author -->
          <el-button slot="reference" type="primary" v-if="Identity === 'Author'">Modify</el-button>
        </el-popover>
      </el-form-item>
    </el-form>

    <!-- Reviewer -->
    <el-divider v-if="Identity === 'Reviewer'"></el-divider>
    <RatingForm v-if="Identity === 'Reviewer'" />

    <el-dialog :visible.sync="pdfVisible" :fullscreen="true" append-to-body>
      <iframe :src="src" style="width: 100%;height: 80vh;"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import RatingForm from '@/components/userComponents/RatingForm.vue';

export default {
  name: 'PaperForm',
  components: { RatingForm },
  props: { conferenceId: Number, conferenceFullName: String, conferenceTopics: Array, Identity: String },
  data() {
    const topicsValid = (rule, value, callback) => {
      let topics = this.paperForm.topics;
      if (topics.length < 2) {
        return callback(new Error('至少选择一个主题!'));
      }
      return callback();
    };
    return {
      visible: false,
      paperForm: { title: '', author: '', summary: '', topics: [''], file: null },
      paperFormRules: {
        title: [
          { required: true, message: '', trigger: 'blur' },
          { max: 50, message: 'max length is 50 character', trigger: 'blur' },
        ],
        author: [{ required: true, message: '', trigger: 'blur' }],
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
    add(topic) {
      let topicSet = new Set(this.paperForm.topics);
      topicSet.add(topic);
      this.paperForm.topics = [...topicSet];
    },
    handleClose(topic) {
      let topicSet = new Set(this.paperForm.topics);
      topicSet.delete(topic);
      this.paperForm.topics = [...topicSet];
    },
    getContributeFile(event) {
      this.paperForm.file = event.currentTarget.files[0];
      this.fileName = this.paperForm.file.name;
      this.previewVisible = true;
    },
    getContributeData: function() {
      let topics = [...new Set(this.paperForm.topics).delete('')];
      let formData = new FormData();
      formData.append('file', this.paperForm.file);
      formData.append('author', this.paperForm.author);
      formData.append('topics', topics);
      formData.append('conferenceId', this.conferenceId);
      formData.append('title', this.paperForm.title);
      formData.append('token', this.$store.state.token);
      formData.append('summary', this.paperForm.summary);
      return formData;
    },
    getPaperForm() {},
    submitPaperForm(formName) {
      this.visible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/system/userSubmitPaper', this.getContributeData())
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
  },
};
</script>
<style>
.leftInput {
  width: 60% !important;
  display: inline-block !important;
}

.rightInput {
  width: 38% !important;
  display: inline-block !important;
  margin-left: 2% !important;
}
</style>
