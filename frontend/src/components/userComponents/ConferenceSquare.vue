<template>
  <div class="tableFrame">
    <el-table v-loading="loading" class="tableContent">
      <el-table-column>
        <template slot-scope="props">
          <el-form label-position="left">
            <el-form-item v-bind:label="name" v-for="(value, name) in props.row" v-bind:key="name">
              <span>{{ value }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"> </el-table-column>

      <el-table-column label="Abbr" prop="abbr"> </el-table-column>

      <el-table-column label="Name" prop="name"> </el-table-column>

      <el-table-column label="ChairMan" prop="chairMan"> </el-table-column>

      <el-table-column label="Status" prop="status"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ConferenceSquare',
  data() {
    return {
      tables: { passed: [] },
      loading: true,
    };
  },
  created() {
    // this.getAllConference();
  },
  methods: {
    getAllConference() {
      this.$axios
        .post('/system/getPassedConference', { token: this.$store.state.token, identity: '*', startIndex: 0, listLength: 10 })
        .then((resp) => {
          if (resp.status === 200) {
            this.tableData_all = resp.data;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'get all conference error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style>
label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
}

.tableFrame {
  width: 100%;
  height: calc(100vh - 120px);
}

.tableContent {
  width: 90%;
  margin-left: 5%;
}
</style>
