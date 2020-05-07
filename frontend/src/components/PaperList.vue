<template>
  <div>
    <el-table :data="paperTable" tooltip-effect="dark" :laoding="paperListLoading" @row-click="openPaperDetails">
      <el-table-column label="Title" prop="title"> </el-table-column>

      <el-table-column label="Athors" prop="authors" v-if="Identity === 'Author'">
        <el-tag :key="index" v-for="(author, index) in paperTable.authors" style="margin-right: 10px">
          {{ author }}
        </el-tag>
      </el-table-column>

      <el-table-column label="Topics" prop="topics">
        <el-tag :key="index" v-for="(topic, index) in paperTable.topics" effect="dark" style="margin-right: 10px">
          {{ topic }}
        </el-tag>
      </el-table-column>
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
          if (resp.state === 200) {
            this.paperTable = resp.data;
            this.paperListLoading = false;
          } else {
            this.$message({ type: 'error', message: 'get paper information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    openPaperDetails(row) {
      this.$emit('choosedPaper', row.id);
    },
  },
};
</script>
