<template>
  <el-main>
    <h5 style="margin:0"><i class="el-icon-pie-chart" /> 我参与的会议</h5>

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
          <el-table-column label="Stage" prop="stage"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
export default {
  name: 'MyConference',
  data() {
    return {
      loading: true,
      // 查看已申请部分
      activeTab: 'Chair',
      tables: { Chair: [], Reviewer: [], Author: [] },
    };
  },
  created() {
    this.getAs('Chair');
  },
  methods: {
    handleTabClick(tab) {
      this.getAs(tab.name);
    },
    getAs(Identity) {
      this.$axios
        .post('/system/getPassedConference', { token: this.$store.state.token, identity: Identity, startIndex: 0, listLength: 10 })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Identity] = resp.data;
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get ' + Identity + ' conference error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style scoped>
label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
}
</style>
