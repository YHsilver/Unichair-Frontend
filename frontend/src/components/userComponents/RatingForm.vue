<template>
  <el-form :model="RatingForm" :rules="RatingFormRules" :ref="RatingForm" label-width="80px" label-position="top">
    <el-form-item label="Rating" prop="ratingValue">
      <el-rate v-model="RatingForm.ratingValue" :show-text="true" :texts="ratingTexts" :colors="colors" :max="4"> </el-rate>
    </el-form-item>
    <el-form-item label="Comment" prop="comment">
      <el-input v-model="RatingForm.comment" type="textarea" maxlength="800" show-word-limit rows="5"> </el-input>
    </el-form-item>
    <el-form-item label="Confidence" prop="confidenceValue">
      <el-rate v-model="RatingForm.confidenceValue" :show-text="true" :texts="confidenceTexts" :colors="colors" :max="4"> </el-rate>
    </el-form-item>
    <el-form-item>
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定提交吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
        </div>
        <el-button type="primary" slot="reference">Rating</el-button>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RatingForm',
  data() {
    return {
      visible: false,
      // reviewer
      RatingForm: { ratingValue: undefined, comment: '', confidenceValue: undefined },
      ratingTexts: ['-2 => reject', '-1 => weak reject', '1 => weak accept', '2 => accept'],
      confidenceTexts: ['very low', 'low', 'high', 'very high'],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      RatingFormRules: {
        ratingValue: [{ required: true, message: '', trigger: 'blur' }],
        comment: [{ required: true, message: '', trigger: 'blur' }],
        confidenceValue: [{ required: true, message: '', trigger: 'blur' }],
      },
    };
  },
  methods: {},
};
</script>

<style></style>
