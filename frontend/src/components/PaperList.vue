<template>
  <div>
    <el-table :data="paperTable" tooltip-effect="dark" :laoding="paperListLoading">
      <el-table-column label="Title" prop="title"> </el-table-column>

      <el-table-column label="Athors" prop="authors" v-if="Identity === 'Author'">
        <el-tag :key="index" v-for="(author, index) in paperTable.authors" style="margin-right: 10px">
          {{ author }}
        </el-tag>
      </el-table-column>

      <el-table-column label="Topics" prop="topics">
        <el-tag :key="index" v-for="(topic, index) in paperTable.topics" effect="dark" style="margin-right: 10px">
          {{ topic }}
        </el-tag>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PaperList',
  props: { Identity: String },
  data() {
    return { paperListLoading: true, paperTable: [] };
  },
};
</script>

<style></style>
