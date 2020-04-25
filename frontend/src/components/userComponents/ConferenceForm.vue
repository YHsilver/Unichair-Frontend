<template>
  <div>
    <el-form :model="meetingForm" :rules="rules" class="meeting_container" v-loading="loading" :ref="meetingForm">
      <h3 class="meeting_title">Set Up Meeting</h3>

      <el-form-item prop="abbreviation">
        <el-input type="text" v-model="meetingForm.abbreviation" auto-complete="off" placeholder="Abbreviation Name" clearable></el-input>
      </el-form-item>

      <el-form-item prop="full">
        <el-input v-model="meetingForm.full" type="textarea" v-bind:row="2" placeholder="Full Name"> </el-input>
      </el-form-item>

      <el-form-item prop="heldPlace">
        <el-input v-model="meetingForm.heldPlace" placeholder="Held Place" clearable></el-input>
      </el-form-item>

      <el-form-item prop="heldDate">
        <el-date-picker v-model="meetingForm.heldDate" type="date" placeholder="Held Date" :picker-options="pickerOptions1"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="submissionDate">
        <el-date-picker v-model="meetingForm.submissionDate" type="date" placeholder="Submission Date" :picker-options="pickerOptions2"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="Ddl">
        <el-date-picker v-model="meetingForm.Ddl" type="date" placeholder="Submission Deadline Date" :picker-options="pickerOptions3"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="releaseDate">
        <el-date-picker v-model="meetingForm.releaseDate" type="date" placeholder="Release Date" :picker-options="pickerOptions4"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="introduction">
        <el-input type="textarea" v-model="meetingForm.introduction" auto-complete="off" placeholder="Introduction" clearable></el-input>
      </el-form-item>

      <el-form-item prop="dynamicTags">
        <el-tag :key="tag" v-for="tag in meetingForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag }}
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
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Topic</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-on:click="setUp(meetingForm)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ConferenceForm',
  data() {
    const heldDateValid = (rule, value, callback) => {
      let heldDate = this.meetingForm.heldDate;
      if (new Date().getTime() > heldDate.getTime()) {
        return callback(new Error('Held Date must later than today.'));
      }
      return callback();
    };
    const submissionDateValid = (rule, value, callback) => {
      let submissionDate = this.meetingForm.submissionDate;
      let heldDate = this.meetingForm.heldDate;
      if (heldDate.getTime() > submissionDate.getTime()) {
        return callback(new Error('Deadline date must later than held Date.'));
      }
      return callback();
    };
    const DdlValid = (rule, value, callback) => {
      let submissionDate = this.meetingForm.submissionDate;
      let Ddl = this.meetingForm.Ddl;
      if (submissionDate.getTime() > Ddl.getTime()) {
        return callback(new Error('Deadline date must later than held Date.'));
      }
      return callback();
    };
    const releaseDateValid = (rule, value, callback) => {
      let Ddl = this.meetingForm.Ddl;
      let releaseDate = this.meetingForm.releaseDate;
      if (Ddl.getTime() > releaseDate.getTime()) {
        return callback(new Error('release date must later than deadline Date.'));
      }
      return callback();
    };
    return {
      meetingForm: {
        abbreviation: '',
        fullName: '',
        heldDate: '',
        heldPlace: '',
        Ddl: '',
        submissionDate: '',
        submissionDeadline: '',
        releaseDate: '',
        introduction: '',
        dynamicTags: [],
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() <= new Date().getTime();
        },
      },
      pickerOptions3: {
        disabledDate(time) {
          return time.getTime() <= new Date().getTime();
        },
      },
      pickerOptions4: {
        disabledDate(time) {
          return time.getTime() <= new Date().getTime();
        },
      },
      inputVisible: false,
      inputValue: '',
      rules: {
        abbreviation: [{ required: true, message: '', trigger: 'blur' }],
        full: [{ required: true, message: '', trigger: 'blur' }],
        heldPlace: [{ required: true, message: '', trigger: 'blur' }],
        heldDate: [
          { required: true, message: '', trigger: 'blur' },
          { validator: heldDateValid, message: 'Held Date must later than today.', trigger: 'blur' },
        ],
        submissionDate: [
          { required: true, message: '', trigger: 'blur' },
          { validator: submissionDateValid, message: 'submission date must later than held Date.', trigger: 'blur' },
        ],
        Ddl: [
          { required: true, message: '', trigger: 'blur' },
          { validator: DdlValid, message: 'Deadline date must later than submission Date.', trigger: 'blur' },
        ],
        releaseDate: [
          { required: true, message: '', trigger: 'blur' },
          { validator: releaseDateValid, message: 'release date must later than deadline Date.', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  methods: {
    setUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/setUpConference', {
              token: this.$store.state.token,
              conferenceAbbreviation: this.meetingForm.abbreviation,
              conferenceFullName: this.meetingForm.fullName,
              conferenceTime: this.meetingForm.heldDate,
              conferenceLocation: this.meetingForm.heldPlace,
              contributeStartTime: this.meetingForm.submissionDate,
              contributeEndTime: this.meetingForm.Ddl,
              resultReleaseTime: this.meetingForm.releaseDate,
              introduction: this.meetingForm.introduction,
            })
            .then((resp) => {
              if (resp.status === 200) {
                this.$message({ type: 'success', message: 'You have submitted your application', duration: '1000', showClose: 'true', center: 'true' });
              } else {
                this.$message({ type: 'error', message: 'setting up meeting failed', duration: '1000', showClose: 'true', center: 'true' });
              }
            })
            .catch((error) => {
              this.$message({ type: 'error', message: error, duration: '1000', showClose: 'true', center: 'true' });
            });
        } else {
          this.$message({ type: 'error', message: 'wrong submit', duration: '1000', showClose: 'true', center: 'true' });
        }
      });
    },
    handleClose(tag) {
      this.meetingForm.dynamicTags.splice(this.meetingForm.dynamicTags.indexOf(tag), 1);
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
        this.meetingForm.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
};
</script>

<style scoped>
.meeting_container {
  border-radius: 10px;
  width: 460px;
  padding: 35px 35px 15px 35px;
  background-color: white;
  text-align: center;
}

.el-date-editor {
  width: 100%;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
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
