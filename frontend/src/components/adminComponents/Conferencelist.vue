<template>
  <el-main>
    <h5 style="margin:0"><i class="el-icon-s-custom" /> 会议审核</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(table, name, index) in tables" v-bind:label="name" v-bind:name="name" v-bind:key="index">
        <el-table id="name" :data="table" height="calc(100vh - 200px)" v-loading="loading">
          <el-table-column type="expand">
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
          <el-table-column label="Operation" v-if="name === 'pending'">
            <template slot-scope="scope">
              <el-button @click="handleConference(scope.row, 'PASS')" type="success" size="small"> PASS </el-button>
              <el-button @click="handleConference(scope.row, 'REJECT')" type="danger" size="small">REJECT</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
export default {
  name: 'Conferencelist',
  data() {
    return {
      activeTab: 'pending',
      tables: { pending: [], pass: [], reject: [] },
      loading: true,
    };
  },
  created() {
    this.getConference('PENDING');
  },
  methods: {
    handleTabClick(tab) {
      this.getConference(tab.name.toUpperCase());
    },
    getConference(Status) {
      this.$axios
        .post('/admin/getConferenceApplications', { status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Status.toLowerCase()] = resp.data;
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get ' + Status.toLowerCase() + ' table error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    handleConference(arr, Status) {
      this.$axios
        .post('/admin/changeConferenceStatus', { id: arr.id, status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message = resp.data.message;
            this.getConference('PENDING');
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'operation error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style scoped>>
label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
}
</style>
