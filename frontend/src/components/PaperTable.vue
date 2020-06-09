<template>
  <div style="width:720px;margin:auto">
    <el-alert title="Click to view Paper details" type="info" :closable="false"> </el-alert>
    <el-table :data="paperTable" tooltip-effect="dark" v-loading="paperListLoading" @row-click="choosePaper" :row-style="{ cursor: 'pointer' }">
      <el-table-column label="Title" prop="title"> </el-table-column>

      <el-table-column label="Athor" prop="authorFullName" v-if="Identity === 'Author'"> </el-table-column>

      <el-table-column label="Topics" prop="topics">
        <template slot-scope="scope">
          <el-tag :key="index" v-for="(topic, index) in scope.row.topics" effect="light">
            {{ topic }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Status" prop="status"> </el-table-column>

      <el-table-column label="Reviewed" prop="isCurrPCMemberReviewed" v-if="Identity === 'Reviewer'"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PaperList',
  props: { Identity: String, conferenceId: Number },
  data() {
    return { paperListLoading: true, paperTable: [], address: '' };
  },
  created() {
    this.getPaper();
  },
  methods: {
    getPaper() {
      this.Identity === 'Author' ? (this.address = '/system/authorGetMyPapers') : (this.address = '/system/reviewerGetPapers');
      this.$axios
        .post(this.address, { token: this.$store.state.token, conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.paperTable = resp.data;
            for (let i = 0; i < this.paperTable.length; i++) {
              if (this.paperTable[i].isCurrPCMemberReviewed) {
                this.paperTable[i].isCurrPCMemberReviewed = '√';
              } else {
                this.paperTable[i].isCurrPCMemberReviewed = '×';
              }
            }
            this.paperListLoading = false;
          } else {
            this.$message({ type: 'error', message: 'get paper information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    choosePaper(row) {
      this.$emit('chosePaper', Number(row.paperId), row.status);
    },
  },
};
</script>

<style>
.el-tag {
  margin-right: 10px;
}
</style>
