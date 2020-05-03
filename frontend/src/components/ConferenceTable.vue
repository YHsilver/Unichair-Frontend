<template>
  <el-table :data="data" v-loading="loading" height="calc(100vh - 200px)" label-position="left" label-width="200px">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
          <el-form-item label="ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="Abbreviation">
            <span>{{ props.row.abbr }}</span>
          </el-form-item>
          <el-form-item label="Full Name">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="ChairMan">
            <span>{{ props.row.chairMan }}</span>
          </el-form-item>
          <el-form-item label="conference Location">
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
  </el-table>
</template>

<script>
export default {
  name: 'ConferenceTable',
  props: {
    data: Array,
    loading: Boolean,
    showList: Array,
  },
};
</script>

<style>
label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
}

.el-form--inline .el-form-item {
  display: block;
}
</style>
