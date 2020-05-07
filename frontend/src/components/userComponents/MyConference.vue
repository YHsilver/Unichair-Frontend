<template>
  <div style="width:90%">
    <h5 style="margin:0"><i class="el-icon-pie-chart" /> 我参与的会议</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(table, name, index) in tables" :label="name" :name="name" :key="index">
        <ConferenceTable :showList="showList" :data="table" :loading="loading" :Identity="name" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'MyConference',
  components: { ConferenceTable },
  data() {
    return {
      loading: true,
      activeTab: 'Chair',
      tables: { Chair: [], Reviewer: [], Author: [] },
      showList: ['Abbr', 'Name', 'Stage'],
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
