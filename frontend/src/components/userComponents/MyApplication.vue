<template>
  <el-main>
    <el-tabs v-model="activeTab">
      <el-tab-pane v-bind:label="name" v-bind:name="name" v-for="(table, name, index) in tables" v-bind:key="index" @click="getConferenceApplications(Status)">
        <el-table :data="tables.name" v-loading="loading" height="calc(100vh - 160px)">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline>
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="Abbr">
                  <span>{{ props.row.abbr }}</span>
                </el-form-item>
                <el-form-item label="Name">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="ChairMan">
                  <span>{{ props.row.chairMan }}</span>
                </el-form-item>
                <el-form-item label="Time">
                  <span>{{ props.row.time }}</span>
                </el-form-item>
                <el-form-item label="Place">
                  <span>{{ props.row.place }}</span>
                </el-form-item>
                <el-form-item label="ContributeEndTime">
                  <span>{{ props.row.contributeEndTime }}</span>
                </el-form-item>
                <el-form-item label="ResultReleaseTime">
                  <span>{{ props.row.resultReleaseTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="Abbr" prop="abbr"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column label="Status" prop="status"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
export default {
  name: 'MyApplication',
  data() {
    return {
      loading: true,
      // 查看已申请部分
      activeTab: 'pass',
      tables: { pass: [], pending: [], reject: [] },
    };
  },
  created() {
    this.getConferenceApplications('pass');
  },
  methods: {
    getConferenceApplications(Status) {
      this.$axios
        .post('/system/getConferenceApplications', { token: this.$store.state.token, status: Status.toUpperCase() })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Status] = resp.data;
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information ' + Status + ' error', duration: '2000', showClose: 'true', center: 'true' });
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
</style>
