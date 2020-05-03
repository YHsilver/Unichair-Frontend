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
      <input type="file" ref="inputFile" required @change="getContributeFile($event)" accept=".pdf" id="inputFile" />
    </el-form-item>

    <el-button type="primary" v-on:click="submitContributeForm(contributeForm)">Send </el-button>
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
    };
  },
  computed: {
    ContributeData: function() {
      return this.contributeForm;
    },
  },
  methods: {
    getContributeFile(event) {
      this.contributeForm.file = event.currentTarget.files[0];
    },
    submitContributeForm() {
      let formData = new FormData();
      formData.append('file', this.contributeForm.file);
      formData.append('conferenceId', this.conferenceId);
      formData.append('title', this.contributeForm.title);
      formData.append('token', this.$store.state.token);
      formData.append('summary', this.contributeForm.summary);
      this.$axios
        .post('/system/userSubmitPaper', formData)
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
    },
  },
};
</script>
