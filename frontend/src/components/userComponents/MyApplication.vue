<template>
  <el-main>
    <h5 style="margin:0"><i class="el-icon-edit-outline" /> 我申请的会议</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-bind:label="name" v-bind:name="name" v-for="(table, name, index) in tables" v-bind:key="index">
        <ConferenceTable v-bind:data="table" v-bind:loading="loading" style="height:calc(100vh - 200px)" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'MyApplication',
  components: { ConferenceTable },
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
    handleTabClick(tab) {
      this.getConferenceApplications(tab.name);
    },
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
