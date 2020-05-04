<template>
  <el-form :model="contributeForm" :rules="rules" :ref="contributeForm" label-width="80px" enctype="multipart/form-data" label-position="top" style="width:600px;margin:auto">
    <h2>{{ conferenceFullName }}</h2>
    <el-divider></el-divider>

    <el-form-item label="Title" prop="title">
      <el-input v-model="contributeForm.title" maxlength="50" show-word-limit></el-input>
    </el-form-item>

    <el-form-item label="Abstract" prop="summary">
      <el-input v-model="contributeForm.summary" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
    </el-form-item>

    <el-form-item label="pdf File" prop="file">
      <input type="file" required @change="getContributeFile($event)" accept=".pdf" style="display:none" id="uploadInput" />
      <el-button type="primary" size="small" @click="upload">choose file</el-button> <span>{{ fileName }}</span>
      <el-button type="primary" v-on:click="pdfVisible = true" size="small" v-show="previewVisible" style="float: right;">Preview</el-button>
    </el-form-item>

    <el-button type="primary" v-on:click="submitContributeForm(contributeForm)">Send</el-button>

    <el-dialog :visible.sync="pdfVisible" :fullscreen="true" append-to-body>
      <iframe :src="src" style="width: 100%;height: 80vh;"></iframe>
    </el-dialog>
  </el-form>
</template>

<script>
export default {
  name: 'ContributeForm',
  props: { conferenceId: Number, conferenceFullName: String },
  data() {
    return {
      contributeForm: { title: '', summary: '', file: null },
      rules: {
        title: [
          { required: true, message: '', trigger: 'blur' },
          { max: 50, message: 'max length is 50 character', trigger: 'blur' },
        ],
        summary: [
          { required: true, message: '', trigger: 'blur' },
          { max: 800, message: 'max length is 800 character', trigger: 'blur' },
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
    getContributeFile(event) {
      this.contributeForm.file = event.currentTarget.files[0];
      this.fileName = this.contributeForm.file.name;
      this.previewVisible = true;
    },
    getContributeData: function() {
      let formData = new FormData();
      formData.append('file', this.contributeForm.file);
      formData.append('conferenceId', this.conferenceId);
      formData.append('title', this.contributeForm.title);
      formData.append('token', this.$store.state.token);
      formData.append('summary', this.contributeForm.summary);
      return formData;
    },
    submitContributeForm(formName) {
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
