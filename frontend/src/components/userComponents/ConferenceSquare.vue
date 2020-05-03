<template>
  <div style="width: 90%;">
    <h5 style="margin:0 0 20px"><i class="el-icon-wind-power" /> 会议广场</h5>

    <ConferenceTable v-bind:showList="showList" v-bind:data="table" v-bind:loading="loading" />
  </div>
</template>

<script>
import ConferenceTable from '@/components/ConferenceTable.vue';

export default {
  name: 'ConferenceSquare',
  components: { ConferenceTable },
  data() {
    return {
      table: [],
      loading: true,
      dialogVisible: false,
      conferenceId: -1,
      showList: ['ID', 'Abbr', 'Name', 'Chairman', 'Stage'],
    };
  },
  created() {
    this.getAllConference();
  },
  methods: {
    // 获取所有会议
    getAllConference() {
      this.$axios
        .post('/system/getPassedConference', { token: this.$store.state.token, identity: '*', startIndex: 0, listLength: 10 })
        .then((resp) => {
          if (resp.status === 200) {
            this.table = resp.data;
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get all conference error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
