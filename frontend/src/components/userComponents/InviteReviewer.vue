<template>
  <el-main style="padding: 0">
    <div style="padding: 20px;">
      <span style="font:1.5em bold">Conference: {{ conferenceFullName }}</span>
      <el-divider></el-divider>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="Real Name:">
          <el-input v-model="searchName" placeholder="Find users by real name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">Search</el-button>
        </el-form-item>
      </el-form>
      <el-table border ref="multipleTable" :data="tableData_users" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="Username" prop="username"> </el-table-column>
        <el-table-column prop="fullName" label="Real Name"> </el-table-column>
        <el-table-column prop="email" label="Email" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="unit" label="Unit" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="area" label="Area" show-overflow-tooltip> </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection">Cancel Select</el-button>
        <el-button @click="sendInvitation">Invite</el-button>
      </div>

      <el-divider></el-divider>
      <span>All Invitations: </span>
      <el-divider></el-divider>
      <el-table :data="tableData_invitations" stripe border style="width: 100%">
        <el-table-column prop="reviewerFullName" label="Real Name"> </el-table-column>
        <el-table-column prop="reviewerUsername" label="Username"> </el-table-column>
        <el-table-column prop="reviewerEmail" label="Email"> </el-table-column>
        <el-table-column prop="status" label="Status"> </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'InviteReviewer',
  data() {
    return {
      conferenceFullName: 'default',
      conferenceId: '20200001',
      searchName: '',
      tableData_users: [],
      multipleSelection: [],
      tableData_invitations: [],
    };
  },
  methods: {
    loadInvitations() {
      this.$axios
        .post('/system/chairCheckInvitations', { token: this.$store.state.token, status: null, conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            this.tableData_invitations = resp.data;
          } else {
            this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'get information error', duration: '1000', showClose: 'true', center: 'true' });
        });
    },
    onSearch() {
      this.$axios
        .post('/system/chairSearchReviews', { token: this.$store.state.token, targetFullName: this.searchName, conferenceId: this.conferenceId })
        .then((resp) => {
          //alert("resp get");
          if (resp.status === 200) {
            // console.log(resp.data);
            this.tableData_users = resp.data;
          } else {
            this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'get information error', duration: '1000', showClose: 'true', center: 'true' });
        });
    },
    sendInvitation() {
      console.log('multiple selecttion' + this.multipleSelection);
      this.$axios
        .post('/system/chairSendInvitation', {
          conferenceId: this.conferenceId,
          token: this.$store.state.token,
          reviewerUsername: this.multipleSelection,
          message: 'invite to be reviewer',
        })
        .then((resp) => {
          //alert("resp get");
          if (resp.status === 200) {
            this.$message({ type: 'message', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
            this.$router.go(0);
          } else {
            //console.log(error);
            this.$message({ type: 'error', message: 'failed to send invitation ', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'failed to send invitation', duration: '1000', showClose: 'true', center: 'true' });
        });
    },
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        this.multipleSelection[i] = val[i].username;
      }
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
  },
  created() {
    let path = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
    this.conferenceId = path.substring(0, path.indexOf('&'));
    this.conferenceFullName = path.substring(path.indexOf('&') + 1);
    this.loadInvitations();
  },
};
</script>
