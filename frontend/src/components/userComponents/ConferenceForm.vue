<template>
  <div>
    <el-form :model="meetingForm" :rules="rules" class="meeting_container" v-loading="loading" :ref="meetingForm">
      <h3 class="meeting_title">New Conference</h3>

      <el-form-item prop="conferenceAbbreviation">
        <el-input type="text" v-model="meetingForm.conferenceAbbreviation" auto-complete="off" placeholder="Conference Abbreviation" clearable></el-input>
      </el-form-item>

      <el-form-item prop="conferenceFullName">
        <el-input v-model="meetingForm.conferenceFullName" type="textarea" v-bind:row="2" placeholder="Conference FullName"> </el-input>
      </el-form-item>

      <el-form-item prop="conferenceLocation">
        <el-input v-model="meetingForm.conferenceLocation" placeholder="Conference Location" clearable></el-input>
      </el-form-item>

      <el-form-item prop="conferenceTime">
        <el-date-picker v-model="meetingForm.conferenceTime" type="date" placeholder="Conference Time" :picker-options="pickerOptions1"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="contributeStartTime">
        <el-date-picker v-model="meetingForm.contributeStartTime" type="date" placeholder="Contribute Start Time" :picker-options="pickerOptions2"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="contributeEndTime">
        <el-date-picker v-model="meetingForm.contributeEndTime" type="date" placeholder="Contribute End Time" :picker-options="pickerOptions3"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="resultReleaseTime">
        <el-date-picker v-model="meetingForm.resultReleaseTime" type="date" placeholder="Result Release Time" :picker-options="pickerOptions4"> </el-date-picker>
      </el-form-item>

      <el-form-item prop="introduction">
        <el-input type="textarea" v-model="meetingForm.introduction" auto-complete="off" placeholder="Introduction" clearable></el-input>
      </el-form-item>

      <el-form-item prop="topics" style="text-align:left;">
        <el-tag :key="topic" v-for="topic in meetingForm.topics" closable :disable-transitions="false" @close="handleClose(topic)">
          {{ topic }}
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
    const conferenceTimeValid = (rule, value, callback) => {
      let conferenceTime = this.meetingForm.conferenceTime;
      if (new Date().getTime() > conferenceTime.getTime()) {
        return callback(new Error('Held Date must later than today.'));
      }
      return callback();
    };
    const contributeStartTimeValid = (rule, value, callback) => {
      let contributeStartTime = this.meetingForm.contributeStartTime;
      let conferenceTime = this.meetingForm.conferenceTime;
      if (conferenceTime.getTime() > contributeStartTime.getTime()) {
        return callback(new Error('Deadline date must later than held Date.'));
      }
      return callback();
    };
    const contributeEndTimeValid = (rule, value, callback) => {
      let contributeStartTime = this.meetingForm.contributeStartTime;
      let contributeEndTime = this.meetingForm.contributeEndTime;
      if (contributeStartTime.getTime() > contributeEndTime.getTime()) {
        return callback(new Error('Deadline date must later than held Date.'));
      }
      return callback();
    };
    const resultReleaseTimeValid = (rule, value, callback) => {
      let contributeEndTime = this.meetingForm.contributeEndTime;
      let resultReleaseTime = this.meetingForm.resultReleaseTime;
      if (contributeEndTime.getTime() > resultReleaseTime.getTime()) {
        return callback(new Error('release date must later than deadline Date.'));
      }
      return callback();
    };
    return {
      meetingForm: {
        conferenceAbbreviation: '',
        conferenceFullName: '',
        conferenceTime: '',
        conferenceLocation: '',
        contributeEndTime: '',
        contributeStartTime: '',
        submissionDeadline: '',
        resultReleaseTime: '',
        introduction: '',
        topics: [],
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
        conferenceAbbreviation: [{ required: true, message: '', trigger: 'blur' }],
        full: [{ required: true, message: '', trigger: 'blur' }],
        conferenceLocation: [{ required: true, message: '', trigger: 'blur' }],
        conferenceTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: conferenceTimeValid, message: 'Held Date must later than today.', trigger: 'blur' },
        ],
        contributeStartTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: contributeStartTimeValid, message: 'submission date must later than held Date.', trigger: 'blur' },
        ],
        contributeEndTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: contributeEndTimeValid, message: 'Deadline date must later than submission Date.', trigger: 'blur' },
        ],
        resultReleaseTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: resultReleaseTimeValid, message: 'release date must later than deadline Date.', trigger: 'blur' },
        ],
        introduction: [{ required: true, message: '', trigger: 'blur' }],
        topics: [{ required: true, message: '', trigger: 'blur' }],
      },
      loading: false,
    };
  },
  methods: {
    setUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/system/addConferenceApplication', {
              token: this.$store.state.token,
              conferenceAbbreviation: this.meetingForm.conferenceAbbreviation,
              conferenceFullName: this.meetingForm.conferenceFullName,
              conferenceTime: this.meetingForm.conferenceTime,
              conferenceLocation: this.meetingForm.conferenceLocation,
              contributeStartTime: this.meetingForm.contributeStartTime,
              contributeEndTime: this.meetingForm.contributeEndTime,
              resultReleaseTime: this.meetingForm.resultReleaseTime,
              introduction: this.meetingForm.introduction,
              topics: this.meetingForm.topics,
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
    // 处理 tag 所需方法
    handleClose(tag) {
      this.meetingForm.topics.splice(this.meetingForm.topics.indexOf(tag), 1);
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
        this.meetingForm.topics.push(inputValue);
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
  padding: 40px;
  background-color: white;
  text-align: center;
  margin: 20px;
}

.el-date-editor {
  width: 100%;
}

/* element UI tag 所需的 CSS */
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
