<template>
  <div>
    <el-table :data="data" height="calc(100vh - 200px)" :row-style="{ cursor: 'pointer' }" @row-dblclick="openConferenceDetails">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="Abbreviation">
              <span>{{ props.row.abbr }}</span>
            </el-form-item>
            <el-form-item label="Full Name">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="Chairman">
              <el-tag type="warning" effect="plain">{{ props.row.chairman }}</el-tag>
            </el-form-item>
            <el-form-item label="Conference Location">
              <span>{{ props.row.place }}</span>
            </el-form-item>
            <el-form-item label="Contribute Start Time">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="Contribute End Time">
              <span>{{ props.row.contributeEndTime }}</span>
            </el-form-item>
            <el-form-item label="Result Release Time">
              <span>{{ props.row.resultReleaseTime }}</span>
            </el-form-item>
            <el-form-item label="Conference Time">
              <span>{{ props.row.time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column v-for="(show, index) in showList" :key="index" :label="show" :prop="show.toLowerCase()"> </el-table-column>

      <!-- admin pending -->
      <el-table-column label="Operation" v-if="AdminOperation === 'pending'">
        <template slot-scope="scope">
          <el-button @click="handleConference(scope.row, 'PASS')" type="success" size="small"> PASS </el-button>
          <el-button @click="handleConference(scope.row, 'REJECT')" type="danger" size="small">REJECT</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Conference Detail -->
    <el-dialog title="Conference Detail" v-if="ConferenceDetailVisible" :visible.sync="ConferenceDetailVisible" top="5vh" width="min(80%,600px)">
      <ConferenceDetail :conferenceId="conferenceId" :Identity="Identity" />
    </el-dialog>
  </div>
</template>

<script>
import ConferenceDetail from '@/components/ConferenceDetail.vue';

export default {
  name: 'ConferenceTable',
  components: { ConferenceDetail },
  props: { data: Array, showList: Array, AdminOperation: String, Identity: String },
  data() {
    return {
      ConferenceDetailVisible: false,
      conferenceId: -1,
    };
  },
  methods: {
    // 管理员管理会议
    handleConference(row, Status) {
      this.$emit('handleConferenceFinished', row.id, Status);
    },
    // 打开会议详细界面
    openConferenceDetails(row) {
      this.ConferenceDetailVisible = true;
      this.conferenceId = Number(row.id);
    },
  },
};
</script>

<style>
label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
  word-wrap: break-word;
  word-break: normal;
}

.el-form--inline .el-form-item {
  display: inline-block;
  width: 45%;
}
</style>
