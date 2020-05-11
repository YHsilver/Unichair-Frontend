<template>
  <div>
    <el-form :model="meetingForm" :rules="rules" class="meeting_container" v-loading="loading" :ref="meetingForm" label-position="left" label-width="200px">
      <h3 class="meeting_title">
        New Conference
        <el-switch v-model="elSwitch" active-color="#8669ed" inactive-color="#a7adba" style="float: right;margin: 5px 0;" @change.once="experimental"></el-switch>
      </h3>

      <el-form-item prop="conferenceAbbreviation" label="Conference Abbreviation">
        <el-input type="text" v-model="meetingForm.conferenceAbbreviation" clearable></el-input>
      </el-form-item>

      <el-form-item prop="conferenceFullName" label="Conference FullName">
        <el-input v-model="meetingForm.conferenceFullName" type="text" clearable> </el-input>
      </el-form-item>

      <el-form-item prop="conferenceLocation" label="Conference Location">
        <el-input v-model="meetingForm.conferenceLocation" clearable></el-input>
      </el-form-item>

      <div v-show="!elSwitch">
        <el-form-item prop="contributeStartTime" label="Contribute Start Date">
          <el-date-picker v-model="meetingForm.contributeStartTime" type="date" :picker-options="pickerOptions(Date.now())"> </el-date-picker>
        </el-form-item>

        <el-form-item prop="contributeEndTime" label="Contribute End Date">
          <el-date-picker v-model="meetingForm.contributeEndTime" type="date" :picker-options="pickerOptions(meetingForm.contributeStartTime)"> </el-date-picker>
        </el-form-item>

        <el-form-item prop="resultReleaseTime" label="Result Release Date">
          <el-date-picker v-model="meetingForm.resultReleaseTime" type="date" :picker-options="pickerOptions(meetingForm.contributeEndTime)"> </el-date-picker>
        </el-form-item>

        <el-form-item prop="conferenceTime" label="Conference Date">
          <el-date-picker v-model="meetingForm.conferenceTime" type="date" :picker-options="pickerOptions(meetingForm.resultReleaseTime)"> </el-date-picker>
        </el-form-item>
      </div>

      <el-form-item prop="conferenceDates" v-show="elSwitch" label="Conference Dates">
        <el-date-picker type="dates" v-model="meetingForm.conferenceDates" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions(Date.now())">
        </el-date-picker>
      </el-form-item>

      <el-form-item prop="introduction" label="Brief Introduction">
        <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="meetingForm.introduction" clearable></el-input>
      </el-form-item>

      <el-form-item prop="topics" style="text-align:left;" label="Conference Topics">
        <el-tag :key="index" v-for="(topic, index) in meetingForm.topics" closable :disable-transitions="false" @close="handleClose(topic)">
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

      <el-button type="primary" v-on:click="setUp(meetingForm)">Submit</el-button>
      <el-button @click="resetForm(meetingForm)">Reset</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewApplication',
  created() {
    this.pickerOptions = function(date) {
      return {
        disabledDate(time) {
          return time.getTime() <= new Date(date).getTime();
        },
      };
    };
  },
  data() {
    const contributeStartTimeValid = (rule, value, callback) => {
      let contributeStartTime = this.meetingForm.contributeStartTime;
      if (contributeStartTime === null) return callback();
      if (new Date(contributeStartTime).getTime() <= new Date().getTime()) {
        return callback(new Error('contribute start time must later than today.'));
      }
      return callback();
    };
    const contributeEndTimeValid = (rule, value, callback) => {
      let contributeStartTime = this.meetingForm.contributeStartTime;
      let contributeEndTime = this.meetingForm.contributeEndTime;
      if (contributeStartTime === null || contributeEndTime === null) return callback();
      if (new Date(contributeStartTime).getTime() >= new Date(contributeEndTime).getTime()) {
        return callback(new Error('contribute end time must later than contribute start time.'));
      }
      return callback();
    };
    const resultReleaseTimeValid = (rule, value, callback) => {
      let resultReleaseTime = this.meetingForm.resultReleaseTime;
      let contributeEndTime = this.meetingForm.contributeEndTime;
      if (resultReleaseTime === null || contributeEndTime === null) return callback();
      if (new Date(contributeEndTime).getTime() >= new Date(resultReleaseTime).getTime()) {
        return callback(new Error('result release time must later than contribute end time.'));
      }
      return callback();
    };
    const conferenceTimeValid = (rule, value, callback) => {
      let resultReleaseTime = this.meetingForm.resultReleaseTime;
      let conferenceTime = this.meetingForm.conferenceTime;
      if (resultReleaseTime === null || conferenceTime === null) return callback();
      if (new Date(resultReleaseTime).getTime() >= new Date(conferenceTime).getTime()) {
        return callback(new Error('conference time must later than result release time.'));
      }
      return callback();
    };
    const topicsValid = (rule, value, callback) => {
      let topics = this.meetingForm.topics;
      const topicsSet = new Set(topics);
      if (topics.length > topicsSet.size) {
        return callback(new Error('conference topic cannot be the same.'));
      }
      return callback();
    };
    const datesValid = (rule, value, callback) => {
      let dates = this.meetingForm.conferenceDates;
      if (dates === null) return callback(new Error('conferenceDates is required'));
      if (dates.length !== 4) {
        return callback(new Error('Conference Dates 444!'));
      }
      return callback();
    };
    return {
      meetingForm: {
        conferenceAbbreviation: '',
        conferenceFullName: '',
        conferenceLocation: '',
        contributeStartTime: null,
        contributeEndTime: null,
        resultReleaseTime: null,
        conferenceTime: null,
        introduction: '',
        topics: [],
        conferenceDates: [],
      },
      elSwitch: false,
      pickerOptions: {},
      inputVisible: false,
      inputValue: '',
      rules: {
        conferenceAbbreviation: [{ required: true, message: '', trigger: 'blur' }],
        conferenceFullName: [{ required: true, message: '', trigger: 'blur' }],
        conferenceLocation: [{ required: true, message: '', trigger: 'blur' }],
        contributeStartTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: contributeStartTimeValid, message: 'contribute start date must later than today.', trigger: '[blur,change]' },
        ],
        contributeEndTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: contributeEndTimeValid, message: 'contribute end date must later than contribute start date.', trigger: '[blur,change]' },
        ],
        resultReleaseTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: resultReleaseTimeValid, message: 'result release date must later than contribute end date.', trigger: '[blur,change]' },
        ],
        conferenceTime: [
          { required: true, message: '', trigger: 'blur' },
          { validator: conferenceTimeValid, message: 'conference date must later than result release date.', trigger: '[blur,change]' },
        ],
        introduction: [{ required: true, message: '', trigger: 'blur' }],
        topics: [
          { required: true, message: '', trigger: 'blur' },
          { validator: topicsValid, message: 'conference topic cannot be the same.', trigger: 'blur' },
        ],
        conferenceDates: [
          { required: true, message: '', trigger: 'blur' },
          { validator: datesValid, message: 'Conference Dates 444!', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  watch: {
    'meetingForm.contributeStartTime': function(newVal, oldVal) {
      if (!this.elSwitch) {
        let dateSet = new Set(this.meetingForm.conferenceDates);
        if (oldVal !== null) dateSet.delete(oldVal);
        if (newVal !== null) dateSet.add(newVal);
        this.meetingForm.conferenceDates = Array.from(dateSet);
      }
    },
    'meetingForm.contributeEndTime': function(newVal, oldVal) {
      if (!this.elSwitch) {
        let dateSet = new Set(this.meetingForm.conferenceDates);
        if (oldVal !== null) dateSet.delete(oldVal);
        if (newVal !== null) dateSet.add(newVal);
        this.meetingForm.conferenceDates = Array.from(dateSet);
      }
    },
    'meetingForm.resultReleaseTime': function(newVal, oldVal) {
      if (!this.elSwitch) {
        let dateSet = new Set(this.meetingForm.conferenceDates);
        if (oldVal !== null) dateSet.delete(oldVal);
        if (newVal !== null) dateSet.add(newVal);
        this.meetingForm.conferenceDates = Array.from(dateSet);
      }
    },
    'meetingForm.conferenceTime': function(newVal, oldVal) {
      if (!this.elSwitch) {
        let dateSet = new Set(this.meetingForm.conferenceDates);
        if (oldVal !== null) dateSet.delete(oldVal);
        if (newVal !== null) dateSet.add(newVal);
        this.meetingForm.conferenceDates = Array.from(dateSet);
      }
    },
    'meetingForm.conferenceDates': function() {
      if (this.elSwitch) {
        if (this.meetingForm.conferenceDates === null) {
          this.meetingForm.contributeStartTime = this.meetingForm.contributeEndTime = this.meetingForm.resultReleaseTime = this.meetingForm.conferenceTime = null;
          return;
        }
        let dateSet = new Set(this.meetingForm.conferenceDates);
        if (
          this.meetingForm.conferenceDates.length === 4 &&
          (!dateSet.has(this.meetingForm.contributeStartTime) ||
            !dateSet.has(this.meetingForm.contributeEndTime) ||
            !dateSet.has(this.meetingForm.resultReleaseTime) ||
            !dateSet.has(this.meetingForm.conferenceTime))
        ) {
          this.meetingForm.conferenceDates.sort(function(a, b) {
            return new Date(a) - new Date(b);
          });
          this.meetingForm.contributeStartTime = this.meetingForm.conferenceDates[0];
          this.meetingForm.contributeEndTime = this.meetingForm.conferenceDates[1];
          this.meetingForm.resultReleaseTime = this.meetingForm.conferenceDates[2];
          this.meetingForm.conferenceTime = this.meetingForm.conferenceDates[3];
        }
      }
    },
  },
  // computed: {
  //   'meetingForm.conferenceDates': function() {
  //     let dates = [];
  //     dates.push(this.meetingForm.contributeStartTime);
  //     dates.push(this.meetingForm.contributeEndTime);
  //     dates.push(this.meetingForm.resultReleaseTime);
  //     dates.push(this.meetingForm.conferenceTime);
  //     return dates;
  //   },
  // },
  methods: {
    setUp(formName) {
      this.$refs[formName].validate((valid) => {
        let conferenceForm;
        if (!this.elSwitch) {
          conferenceForm = {
            token: this.$store.state.token,
            conferenceAbbreviation: this.meetingForm.conferenceAbbreviation,
            conferenceFullName: this.meetingForm.conferenceFullName,
            resultReleaseTime: this.meetingForm.resultReleaseTime,
            conferenceLocation: this.meetingForm.conferenceLocation,
            contributeStartTime: this.meetingForm.contributeStartTime,
            contributeEndTime: this.meetingForm.contributeEndTime,
            conferenceTime: this.meetingForm.conferenceTime,
            introduction: this.meetingForm.introduction,
            topics: this.meetingForm.topics,
          };
        } else {
          this.meetingForm.conferenceDates.sort(function(a, b) {
            return new Date(a) - new Date(b);
          });
          conferenceForm = {
            token: this.$store.state.token,
            conferenceAbbreviation: this.meetingForm.conferenceAbbreviation,
            conferenceFullName: this.meetingForm.conferenceFullName,
            conferenceLocation: this.meetingForm.conferenceLocation,
            contributeStartTime: this.meetingForm.conferenceDates[0],
            contributeEndTime: this.meetingForm.conferenceDates[1],
            resultReleaseTime: this.meetingForm.conferenceDates[2],
            conferenceTime: this.meetingForm.conferenceDates[3],
            introduction: this.meetingForm.introduction,
            topics: this.meetingForm.topics,
          };
        }
        if (valid) {
          this.$axios
            .post('/system/addConferenceApplication', conferenceForm)
            .then((resp) => {
              if (resp.status === 200) {
                this.resetForm(this.meetingForm);
                this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
              } else {
                this.$message({ type: 'error', message: 'setting up meeting failed', duration: '2000', showClose: 'true', center: 'true' });
              }
            })
            .catch((err) => {
              this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
            });
        } else {
          this.$message({ type: 'warning', message: 'Please check the contents of the form', duration: '2000', showClose: 'true', center: 'true' });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs[formName].conferenceDates = [];
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
      let inputValue = this.inputValue.trim();
      if (inputValue) {
        this.meetingForm.topics.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    experimental() {
      this.$notify({ title: 'Tip', message: 'Experimental function', type: 'warning', offset: 50 });
    },
  },
};
</script>

<style scoped>
.meeting_container {
  border-radius: 10px;
  width: 660px;
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

.yoyo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
