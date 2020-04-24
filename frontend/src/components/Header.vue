<template>
  <el-menu mode="horizontal" :router="true" background-color="#8669ed" text-color="#ffffff" active-text-color="#8669ed">
    <el-menu-item>
      Uni Conference
    </el-menu-item>

    <el-button @click="loginFormVisible = true" plain style="float: right;margin: 10px;">Login</el-button>
    <el-dialog title="" :visible.sync="loginFormVisible" width="360px">
      <LoginForm />
    </el-dialog>
  </el-menu>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'Header',
  components: {
    LoginForm,
  },
  data() {
    return { loginFormVisible: false, activeIndex: ' 1' };
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
