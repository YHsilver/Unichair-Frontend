<template>
  <div class="tableFrame">
    <h5 style="margin:0 0 20px"><i class="el-icon-message" /> 消息中心</h5>

    <el-table :data="messageTable" class="tableContent" v-loading="loading" @cell-dblclick="openDetails">
      <el-table-column label="Sender" prop="sender"> </el-table-column>

      <el-table-column label="Full Name" prop="fullName">
        <template slot-scope="scope">
          <el-tag type="warning" effect="plain">{{ scope.row.fullName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Conference" prop="conferenceFullName">
        <template slot-scope="scope">
          <el-button type="text">{{ scope.row.conferenceFullName }}</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Status" prop="status"> </el-table-column> -->

      <el-table-column label="Topics" prop="topics">
        <el-tag :key="topic" v-for="topic in topics" effect="dark" style="margin-right: 10px;cursor: pointer;" @click="add(topic)" closable @close="handleClose(topic)">
          {{ topic }}
        </el-tag>
      </el-table-column>

      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button @click="handleInvitation(scope.row, 'PASS')" type="success" plain size="small">PASS</el-button>
          <el-button @click="handleInvitation(scope.row, 'REJECT')" type="info" plain size="small">REJECT</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Conference Detail -->
    <el-dialog title="Conference Detail" v-if="ConferenceDetailVisible" :visible.sync="ConferenceDetailVisible" top="5vh">
      <ConferenceDetail :conferenceId="conferenceId" />
    </el-dialog>
  </div>
</template>

<script>
import ConferenceDetail from '@/components/ConferenceDetail.vue';

export default {
  name: 'Messages',
  components: { ConferenceDetail },
  data() {
    return {
      messageTable: [],
      loading: true,
      ConferenceDetailVisible: false,
      conferenceId: -1,
    };
  },
  created() {
    this.getInvitation();
  },
  methods: {
    getInvitation() {
      this.$axios
        .post('/system/userCheckMyInvitations', { token: this.$store.state.token, status: 'PENDING' })
        .then((resp) => {
          if (resp.status === 200) {
            this.messageTable = resp.data;
            this.loading = false;
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    handleInvitation(row, Status) {
      this.$axios
        .post('/system/userDecideMyInvitations', { token: this.$store.state.token, invitationId: row.invitationId, status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data, duration: '2000', showClose: 'true', center: 'true' });
            this.getInvitation();
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'operation error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    // 打开会议详细界面
    openDetails(row, column) {
      if (column.label === 'Conference') {
        this.ConferenceDetailVisible = true;
        this.conferenceId = Number(row.conferenceId);
      }
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

.tableFrame {
  width: 100%;
  height: calc(100vh - 120px);
}

.tableContent {
  width: 90%;
  margin-left: 5%;
}
</style>
