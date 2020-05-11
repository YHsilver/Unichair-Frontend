<template>
  <div style="width: 90%;">
    <h5 style="margin:0 0 20px"><i class="el-icon-wind-power" /> Conference Square</h5>

    <ConferenceTable v-bind:showList="showList" v-bind:data="table" :Identity="'Passerby'" />
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
      dialogVisible: false,
      conferenceId: -1,
      showList: ['Abbr', 'Name', 'Chairman', 'Stage'],
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
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>
