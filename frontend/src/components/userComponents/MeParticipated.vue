<template>
  <div style="width:90%">
    <h5 style="margin:0"><i class="el-icon-pie-chart" /> Me Participated</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(table, name, index) in tables" :label="name" :name="name" :key="index">
        <ConferenceTable :showList="showList" :data="table" :Identity="name" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'MeParticipated',
  components: { ConferenceTable },
  data() {
    return {
      activeTab: 'Chair',
      tables: { Chair: [], Reviewer: [], Author: [] },
      showList: ['Abbr', 'Name', 'Stage'],
    };
  },
  created() {
    this.getConferenceAs('Chair');
  },
  mounted() {
    //挂载时通过this.$route.query.type拿到url后的参数
    this.activeTab = this.$route.query.type || 'Chair';
    this.getConferenceAs(this.activeTab);
  },
  methods: {
    handleTabClick(tab) {
      this.getConferenceAs(tab.name);
      if (tab.name !== this.$route.query.type) this.$router.push({ query: { type: tab.name || 'Chair' } });
    },
    getConferenceAs(Identity) {
      this.$axios
        .post('/system/getPassedConference', { token: this.$store.state.token, identity: Identity, startIndex: 0, listLength: 10 })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Identity] = resp.data;
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
