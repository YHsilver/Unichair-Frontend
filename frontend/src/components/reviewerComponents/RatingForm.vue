<template>
  <div style="width:520px;margin:auto">
    <el-form :model="RatingForm" :rules="RatingFormRules" :ref="RatingForm" label-width="200px" label-position="top">
      <el-form-item label="Rating" prop="grade">
        <el-rate v-model="RatingForm.grade" :show-text="true" :texts="ratingTexts" :colors="colors" :max="4"> </el-rate>
      </el-form-item>
      <el-form-item label="Comment" prop="comment">
        <el-input v-model="RatingForm.comment" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
      </el-form-item>
      <el-form-item label="Confidence" prop="confidenceVal">
        <el-rate v-model="RatingForm.confidenceVal" :show-text="true" :texts="confidenceTexts" :colors="colors" :max="4"> </el-rate>
      </el-form-item>
      <el-form-item>
        <el-popover placement="top" width="160" v-model="visible">
          <p>Are you sure to submit?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">Cancel</el-button>
            <el-button type="primary" size="mini" @click="submitRatingResult()">Yes</el-button>
          </div>
          <el-button type="primary" slot="reference">Rating</el-button>
        </el-popover>
        <el-button @click="resetForm(RatingForm)" style="margin-left:10px">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RatingForm',
  props: { paperId: Number },
  data() {
    return {
      visible: false,
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
    };
  },
  methods: {
    submitRatingResult() {
      this.visible = false;
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
      this.$axios
        .post('/system/submitPaperReviewed', {
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
        .catch(() => {
          this.$message({ type: 'error', message: 'rating paper error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    finishRating() {
      this.$emit('finishRatingAPaper');
    },
  },
};
</script>
