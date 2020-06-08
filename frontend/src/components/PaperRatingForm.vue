<template>
  <div style="width:720px;margin:auto">
    <el-form :model="RatingForm" :rules="RatingFormRules" :ref="RatingForm" label-width="200px" label-position="top" :disabled="disabled">
      <el-form-item label="Rating" prop="grade">
        <el-rate v-model="RatingForm.grade" :show-text="true" :texts="ratingTexts" :colors="colors" :max="4"> </el-rate>
      </el-form-item>
      <el-form-item label="Comment" prop="comment">
        <el-input v-model="RatingForm.comment" type="textarea" :autosize="{ minRows: 4 }" maxlength="800" show-word-limit> </el-input>
      </el-form-item>
      <el-form-item label="Confidence" prop="confidenceVal">
        <el-rate v-model="RatingForm.confidenceVal" :show-text="true" :texts="confidenceTexts" :colors="colors" :max="4"> </el-rate>
      </el-form-item>
      <el-form-item v-show="!disabled">
        <div style="float:right">
          <el-popover placement="top" width="160" v-model="ratingPopoverVisible">
            <p>Are you sure to submit?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="ratingPopoverVisible = false">Cancel</el-button>
              <el-button type="primary" size="mini" @click="submitRatingResult()">Yes</el-button>
            </div>
            <el-button type="primary" slot="reference">{{ rateText }}</el-button>
          </el-popover>
          <el-button @click="resetForm(RatingForm)" style="margin-left:10px">Reset</el-button>
        </div>

        <!-- check -->
        <el-popover placement="top" width="200" v-model="checkPopoverVisible">
          <p>Are you sure that you wanna confirm the review results?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="checkPopoverVisible = false">Cancel</el-button>
            <el-button type="primary" size="mini" @click="CheckRating">Sure</el-button>
          </div>
          <el-button slot="reference" type="primary" round>Check</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Bus from '@/api/Bus';

export default {
  name: 'RatingForm',
  props: { paperId: Number },
  created() {
    Bus.$on('isPaperRated', (disabled, Result) => {
      this.disabled = disabled;
      this.RatingForm = Result;
    });
  },
  data() {
    return {
      ratingPopoverVisible: false,
      disabled: false,
      // reviewer
      RatingForm: { grade: undefined, comment: '', confidenceVal: undefined },
      ratingTexts: ['-2 => reject', '-1 => weak reject', '1 => weak accept', '2 => accept'],
      confidenceTexts: ['very low', 'low', 'high', 'very high'],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      RatingFormRules: {
        grade: [{ required: true, message: '', trigger: 'blur' }],
        comment: [{ required: true, message: '', trigger: 'blur' }],
        confidenceVal: [{ required: true, message: '', trigger: 'blur' }],
      },
      checkPopoverVisible: false,
      ratingBefore: false,
    };
  },
  computed: {
    rateText() {
      if (!this.ratingBefore) return 'Rating';
      else return 'reRating';
    },
  },
  methods: {
    submitRatingResult() {
      this.ratingPopoverVisible = false;
      // grade
      let grade;
      this.RatingForm.grade > 2 ? (grade = this.RatingForm.grade - 2) : (grade = this.RatingForm.grade - 3);
      // confidence
      let confidence;
      switch (this.RatingForm.confidenceVal) {
        case 1:
          confidence = 'VERY_LOW';
          break;
        case 2:
          confidence = 'LOW';
          break;
        case 3:
          confidence = 'HIGH';
          break;
        case 4:
          confidence = 'VERY_HIGH';
          break;
        default:
          break;
      }

      let address;
      if (!this.ratingBefore) address = '/system/submitPaperReviewed';
      else address = '/system/reviewerModifyRate';

      this.$axios
        .post(address, {
          token: this.$store.state.token,
          paperId: this.paperId,
          comment: this.RatingForm.comment,
          grade: grade,
          confidence: confidence,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    finishRating() {
      this.$emit('finishRatingAPaper');
    },
    CheckRating() {
      this.checkPopoverVisible = false;
      this.$axios
        .post('/system/reviewerCheckRate', {
          token: this.$store.state.token,
          paperId: this.paperId,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
