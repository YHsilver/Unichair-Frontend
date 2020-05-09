<template>
  <div>
    <h2>{{ conferenceFullName }}</h2>
    <el-divider></el-divider>
    <el-row :gutter="40">
      <!-- 邀请 -->
      <el-col :span="14">
        <h3>Invite Reviewer</h3>
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="searchName" placeholder="Find by real name" style="width: 60%;" v-on:keyup.enter.native="searchUser"> </el-input>
            <el-button icon="el-icon-search" style="margin-left:2%" type="primary" @click="searchUser"></el-button>
          </el-form-item>
        </el-form>

        <el-table ref="multipleTable" :data="userTable" tooltip-effect="dark" @selection-change="handleSelectionChange" height="60vh" :laoding="searchLoading">
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="Username" prop="username"> </el-table-column>
          <el-table-column prop="fullName" label="Real Name">
            <template slot-scope="scope">
              <el-tag type="warning" effect="plain">{{ scope.row.fullName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="unit" label="Unit" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="area" label="Area" show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-button-group style="margin-top:20px">
          <el-button @click="toggleSelection">Cancel Select</el-button>
          <el-button @click="sendInvitation">Invite</el-button>
        </el-button-group>
      </el-col>

      <!-- 邀请函 -->
      <el-col :span="10">
        <h3 style="padding-bottom: 62px;">My Send Invitations</h3>
        <el-table :data="invitationsTable" height="60vh" :loading="sendLoading">
          <el-table-column prop="reviewerUsername" label="Username"> </el-table-column>
          <el-table-column prop="reviewerFullName" label="Real Name">
            <template slot-scope="scope">
              <el-tag type="warning" effect="plain">{{ scope.row.reviewerFullName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'InviteReviewer',
  props: { conferenceFullName: String, conferenceId: Number },
  data() {
    return {
      searchName: '',
      userTable: [],
      multipleSelection: [],
      invitationsTable: [],
      sendLoading: true,
      searchLoading: true,
    };
  },
  methods: {
    loadInvitations() {
      this.$axios
        .post('/system/chairCheckInvitations', { token: this.$store.state.token, status: null, conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.sendLoading = false;
            this.invitationsTable = resp.data;
          } else {
            this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    searchUser() {
      this.$axios
        .post('/system/chairSearchReviews', { token: this.$store.state.token, targetFullName: this.searchName, conferenceId: this.conferenceId })
        .then((resp) => {
          if (resp.status === 200) {
            this.userTable = resp.data;
            this.searchLoading = false;
          } else {
            this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'get information error', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    sendInvitation() {
      this.sendLoading = true;
      this.$axios
        .post('/system/chairSendInvitation', {
          conferenceId: this.conferenceId,
          token: this.$store.state.token,
          reviewerUsername: this.multipleSelection,
          message: 'invite you as a reviewer!',
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.loadInvitations();
            this.$message({ type: 'message', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          } else {
            this.$message({ type: 'error', message: 'failed to send invitation ', duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch(() => {
          this.$message({ type: 'error', message: 'failed to send invitation', duration: '2000', showClose: 'true', center: 'true' });
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
    this.loadInvitations();
  },
};
</script>
