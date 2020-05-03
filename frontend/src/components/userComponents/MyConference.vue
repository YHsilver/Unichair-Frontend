<template>
  <el-main>
    <h5 style="margin:0"><i class="el-icon-pie-chart" /> 我参与的会议</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(table, name, index) in tables" v-bind:label="name" v-bind:name="name" v-bind:key="index">
        <ConferenceTable v-bind:showList="showList" v-bind:data="table" v-bind:loading="loading" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
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
      showList: ['Id', 'Abbr', 'Name', 'Stage'],
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
