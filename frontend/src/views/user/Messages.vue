<template>
  <div class="tableFrame">
    <h5 style="margin:0 0 20px"><i class="el-icon-message" /> Messages</h5>

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

      <el-table-column label="Topics" prop="topics" :min-width="'200%'">
        <template slot-scope="scope">
          <el-tag :key="index" v-for="(topic, index) in scope.row.topics" effect="light" @click="add($event, scope.row)" closable @close="handleClose($event, scope.row)">
            {{ topic }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-popover placement="top" width="160" v-model="passVisible" trigger="manual">
            <p>
              Are sure that you wanna be responsible for <strong v-for="(topic, index) in scope.row.chosedTopics" :key="index">{{ topic }} </strong> ?
            </p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="passVisible = false">Cancel</el-button>
              <el-button type="primary" size="mini" @click="handleInvitation(scope.row, 'PASS')">Yes</el-button>
            </div>
            <el-button slot="reference" type="success" plain size="small" @click="checkChosedTopics(scope.row)">PASS</el-button>
          </el-popover>
          <el-button @click="handleInvitation(scope.row, 'REJECT')" style="margin-left:10px" type="info" plain size="small">REJECT</el-button>
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
import ConferenceDetail from '@/components/conference/ConferenceDetail.vue';

export default {
  name: 'Messages',
  components: { ConferenceDetail },
  data() {
    return {
      messageTable: [],
      loading: true,
      ConferenceDetailVisible: false,
      conferenceId: -1,
      passVisible: false,
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
            // 获取 topics
            if (resp.data.length === 0) {
              this.loading = false;
            } else {
              let p = new Promise((resolve, reject) => {
                for (const message of resp.data) {
                  this.$axios.post('/system/getConferenceTopics', { conferenceId: Number(message.conferenceId) }).then((resp) => {
                    if (resp.status === 200) {
                      message.topics = resp.data;
                      message.chosedTopics = [];
                      resolve();
                    } else reject();
                  });
                }
              });
              p.then(() => {
                this.messageTable = resp.data;
                this.loading = false;
              }).catch(() => {
                this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
              });
            }
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    checkChosedTopics(row) {
      if (row.chosedTopics.length === 0) this.$message({ type: 'warning', message: 'You must choose at least one topic', duration: '2000', showClose: 'true', center: 'true' });
      else this.passVisible = true;
    },
    handleInvitation(row, Status) {
      this.passVisible = false;
      this.$axios
        .post('/system/userDecideMyInvitations', { token: this.$store.state.token, invitationId: row.invitationId, topics: row.chosedTopics, status: Status })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({ type: 'success', message: resp.data, duration: '2000', showClose: 'true', center: 'true' });
            this.getInvitation();
          } else {
            this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
          }
        })
        .catch((err) => {
          this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    // 打开会议详细界面
    openDetails(row, column) {
      if (column.label === 'Conference') {
        this.ConferenceDetailVisible = true;
        this.conferenceId = Number(row.conferenceId);
      }
    },
    add(tag, row) {
      let topicSet = new Set(row.chosedTopics);
      topicSet.add(tag.target.innerText.trim());
      row.chosedTopics = [...topicSet];
      tag.target.classList = 'el-tag el-tag--dark';
    },
    handleClose(tag, row) {
      let topicSet = new Set(row.chosedTopics);
      topicSet.delete(tag.target.parentNode.innerText.trim());
      row.chosedTopics = [...topicSet];
      tag.target.parentNode.classList = 'el-tag el-tag--light';
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

.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>
