<template>
  <div class="tableFrame">
    <el-table :data="messageTable" class="tableContent" v-loading="loading">
      <el-table-column label="Sender" prop="sender"> </el-table-column>

      <el-table-column label="Full Name" prop="fullName">
        <template slot-scope="scope">
          <el-tag type="warning" effect="plain">{{ scope.row.fullName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Conference" prop="conferenceFullName"> </el-table-column>

      <el-table-column label="Topics" prop="topics"> </el-table-column>

      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button @click="handleInvitation(scope.row, 'PASS')" type="success" plain size="small">PASS</el-button>
          <el-button @click="handleInvitation(scope.row, 'REJECT')" type="info" plain size="small">REJECT</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data() {
    return {
      messageTable: [
        // { sender: 'ha', fullName: 'ha', conferenceFullName: 'haha' },
      ],
      loading: true,
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
      console.log(row.invitationId);
      this.$axios
        .post('/system/userDecideMyInvitations', { token: this.$store.state.token, invitationId: row.invitationId, status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message = resp.data.message;
            this.getInvitation();
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'operation error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style>
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
