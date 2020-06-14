<template>
  <el-menu mode="horizontal" router background-color="#8669ed">
    <el-menu-item index="/home" style="color:#ffffff"><img src="/uni.svg" style="height:40px;padding-right:10px;" /> <strong>Uni Conference</strong> </el-menu-item>

    <div v-if="loginSwitch">
      <el-button plain icon="el-icon-user" style="float:right;margin: 10px;" circle></el-button>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">Me</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="mySpace">My Space</el-dropdown-item>
          <el-dropdown-item divided command="logout">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div v-if="!loginSwitch">
      <el-button @click="loginFormVisible = true" plain style="float:right;margin: 10px;">Login</el-button>
      <el-dialog :visible.sync="loginFormVisible" width="360px">
        <LoginForm />
      </el-dialog>

      <el-button @click="registerFormVisible = true" type="success" style="float:right;margin: 10px;">Register</el-button>
      <el-dialog :visible.sync="registerFormVisible" width="520px">
        <RegisterForm />
      </el-dialog>
    </div>
  </el-menu>
</template>

<script>
import LoginForm from '@/components/TheLoginForm.vue';
import RegisterForm from '@/components/TheRegisterForm.vue';

import Bus from '@/api/Bus';

export default {
  name: 'Header',
  components: { LoginForm, RegisterForm },
  data() {
    return { loginFormVisible: false, loginSwitch: false, registerFormVisible: false };
  },
  created() {
    Bus.$on('login', () => {
      this.loginSwitch = true;
      this.loginFormVisible = false;
    });
  },
  mounted() {
    if (this.$store.state.token) {
      this.loginSwitch = true;
      this.loginFormVisible = false;
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') this.logout();
      if (command === 'mySpace') this.mySpace();
    },
    logout: function() {
      this.$confirm('Are you sure you wanna log out?', 'tips', { confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning' })
        .then(() => {
          this.$store.commit('logout');
          this.loginSwitch = false;
          this.$message({ type: 'success', message: 'log out successfully!', duration: '2000', showClose: 'true', center: 'true' });
          if (this.$route.path !== '/') this.$router.push({ path: '/home' });
        })
        .catch(() => {
          this.$message({ type: 'info', message: 'canceled', duration: '2000', showClose: 'true', center: 'true' });
        });
    },
    mySpace() {
      if (this.$store.state.userDetails.username === 'admin' && this.$route.path.indexOf('admin/') !== 1) this.$router.push({ path: '/admin' });
      else if (this.$store.state.userDetails.username !== 'admin' && this.$route.path.indexOf('user') !== 1) this.$router.push({ path: '/user' });
    },
  },
};
</script>

<style>
.el-menu {
  border: none !important;
}

.el-dropdown {
  opacity: 0;
  cursor: pointer;
  right: 10px;
  position: fixed !important;
  top: 10px;
  font-size: 30px !important;
}
</style>
