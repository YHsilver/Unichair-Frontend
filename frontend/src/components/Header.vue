<template>
  <el-header>
    <el-row :span="24">
      <el-col :xs="24" :md="6">
        <span id="logo">Uni C</span>
      </el-col>

      <el-col :xs="24" :md="14"> </el-col>

      <el-col :xs="24" :md="4">
        <span v-if="loginSwitch" class="tip">
          <a @click="logout"><i class="el-icon-remove-outline"></i> log out</a>
        </span>
        <span v-if="!loginSwitch" class="tip">
          <a href="https://cn.vuejs.org/v2/guide/"><i class="el-icon-info"></i> Help</a>
        </span>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    loginSwitch: Boolean,
  },
  methods: {
    logout: function() {
      this.$confirm('Are you sure you wanna log out?', 'tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      })
        .then(() => {
          this.$store.commit('logout');
          this.$message({
            type: 'success',
            message: 'log out successfully!',
            duration: '1000',
            showClose: 'true',
            center: 'true',
          });
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'canceled',
            duration: '1000',
            showClose: 'true',
            center: 'true',
          });
        });
    },
  },
};
</script>

<style>
#logo {
  line-height: 100px;
  height: 100px;
  font-size: 4.8em;
  color: white;
}

.el-header {
  width: 100%;
  padding: 0;
  height: auto !important;
  background-color: #4e5bf2;
  padding: 0 !important;
}

.el-row {
  height: 100%;
}

.words {
  padding-top: 20px;
  margin: 0;
  font-family: Nunito, sans-serif;
  font-size: 1.7em;
  color: white;
}

.tip {
  font-size: 1.4em;
  color: white;
  line-height: 100px;
}

.tip a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.aLine {
  background-color: rgb(255, 250, 244);
  height: 2px;
}
</style>
