<template>
  <div style="width:90%">
    <h5 style="margin:0"><i class="el-icon-chat-square" /> Audit Conference</h5>

    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(table, name, index) in tables" :label="name" :name="name" :key="index">
        <ConferenceTable :showList="showList" :data="table" :AdminOperation="name" @handleConferenceFinished="handleConference" :Identity="'Admin'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'AdminConferenceAudit',
  components: { ConferenceTable },
  data() {
    return {
      activeTab: 'pending',
      tables: { pending: [], pass: [], reject: [] },
      showList: ['Id', 'Abbr', 'Name', 'Chairman'],
    };
  },
  created() {
    this.getConference('PENDING');
  },
  mounted() {
    this.activeTab = (this.$route.query.type || 'pending').toLowerCase();
    this.getConference(this.activeTab.toUpperCase());
  },
  methods: {
    handleTabClick(tab) {
      this.getConference(tab.name.toUpperCase());
      if (tab.name.toUpperCase() !== this.$route.query.type) this.$router.push({ query: { type: tab.name.toUpperCase() || 'PENDING' } });
    },
    getConference(Status) {
      this.$axios
        .post('/admin/getConferenceApplications', { status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.tables[Status.toLowerCase()] = resp.data;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get ' + Status.toLowerCase() + ' table error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    handleConference: function(id, Status) {
      this.$axios
        .post('/admin/changeConferenceStatus', { id: id, status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.getConference('PENDING');
            this.$message({ type: 'success', message: 'operate successfully', duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(function() {
          this.$message({ type: 'error', message: 'operation error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
