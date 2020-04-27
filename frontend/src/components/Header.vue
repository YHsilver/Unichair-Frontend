<template>
  <el-menu mode="horizontal" :router="true" background-color="#8669ed" text-color="#ffffff" active-text-color="#8669ed">
    <el-menu-item><img src="/uni.svg" height="40px" /> <strong>Uni Conference</strong> </el-menu-item>

    <el-button v-if="loginSwitch" @click="logout" plain style="float:right;margin: 10px;">Log out</el-button>

    <el-button v-if="!loginSwitch" @click="loginFormVisible = true" plain style="float:right;margin: 10px;">Login</el-button>
    <el-dialog :visible.sync="loginFormVisible" width="360px">
      <LoginForm :v-bind="loginFormVisible" />
    </el-dialog>
  </el-menu>
</template>

<script>
import LoginForm from '@/components/headerComponents/LoginForm.vue';

export default {
  name: 'Header',
  components: { LoginForm },
  props: { loginSwitch: Boolean },
  data() {
    return { loginFormVisible: false };
  },
  methods: {
    logout: function() {
      this.$confirm('Are you sure you wanna log out?', 'tips', { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' })
        .then(() => {
          this.$store.commit('logout');
          this.$message({ type: 'success', message: 'log out successfully!', duration: '1000', showClose: 'true', center: 'true' });
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.$message({ type: 'info', message: 'canceled', duration: '1000', showClose: 'true', center: 'true' });
        });
    },
  },
};
</script>

<style>
.el-menu {
  border: none !important;
}
</style>
