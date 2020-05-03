<template>
  <el-table :data="data" v-loading="loading" height="calc(100vh - 200px)" label-position="left" label-width="200px">
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
            <span>{{ props.row.chairman }}</span>
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

    <el-table-column v-for="show in showList" :key="show" :label="show" :prop="show.toLowerCase()"> </el-table-column>

    <el-table-column label="Operation" v-if="AdminOperation === 'pending'">
      <template slot-scope="scope">
        <el-button @click="handleConference(scope.row, 'PASS')" type="success" size="small"> PASS </el-button>
        <el-button @click="handleConference(scope.row, 'REJECT')" type="danger" size="small">REJECT</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ConferenceTable',
  props: {
    data: Array,
    loading: Boolean,
    showList: Array,
    AdminOperation: String,
  },
  methods: {
    handleConference(row, Status) {
      this.$emit('handleConferenceFinished', row.id, Status);
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
