<template>
  <div style="width:90%">
    <h5 style="margin:0"><i class="el-icon-edit-outline" /> My Application</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-bind:label="name" v-bind:name="name" v-for="(table, name, index) in tables" :key="index">
        <ConferenceTable v-bind:showList="showList" v-bind:data="table" :Identity="name === 'pass' ? 'Chair' : 'Other'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'MyApplication',
  components: { ConferenceTable },
  data() {
    return {
      activeTab: 'pending',
      tables: { pending: [], pass: [], reject: [] },
      showList: ['Abbr', 'Name', 'Status'],
    };
  },
  created() {
    this.getConferenceApplications('pending');
  },
  mounted() {
    this.activeTab = this.$route.query.type || 'pending';
    this.getConferenceApplications(this.activeTab);
  },
  methods: {
    handleTabClick(tab) {
      this.getConferenceApplications(tab.name);
      if (tab.name !== this.$route.query.type) this.$router.push({ query: { type: tab.name || 'pending' } });
    },
    getConferenceApplications(Status) {
      this.$axios
        .post('/system/getConferenceApplications', { token: this.$store.state.token, status: Status.toUpperCase() })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Status] = resp.data;
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
