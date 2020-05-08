<template>
  <div>
    <el-table :data="paperTable" tooltip-effect="dark" :laoding="paperListLoading" @row-click="choosePaper">
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
            this.paperListLoading = false;
            this.$notify({ title: '提示', message: '点击查看会议详情', duration: 2000 });
          } else {
            this.$message({ type: 'error', message: 'get paper information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    choosePaper(row) {
      this.$emit('chosePaper', Number(row.paperId));
    },
  },
};
</script>
