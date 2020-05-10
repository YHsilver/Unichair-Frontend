<template>
  <div>
    <el-form id="loginContent" :model="loginForm" :rules="rules" :ref="loginForm">
      <h2>Login</h2>

      <!-- user -->
      <el-form-item prop="username" class="inputBox">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password" class="inputBox">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password" show-password v-on:keyup.enter.native="login(loginForm)" clearable>
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>

      <!-- submit -->
      <el-form-item>
        <el-button type="primary" v-on:click="login(loginForm)">login</el-button>
      </el-form-item>

      <!-- register tip -->
      <el-form-item>
        <span>No account yet? 👉 </span>
        <el-link type="primary" :underline="false" @click="registerFormVisible = true">register now </el-link>
        <el-dialog :visible.sync="registerFormVisible" width="520px" append-to-body>
          <RegisterForm @registerFinished="registerFormVisible = false" />
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RegisterForm from '@/components/authComponents/RegisterForm.vue';

export default {
  name: 'LoginForm',
  components: {
    RegisterForm,
  },
  data() {
    return {
      loginForm: { username: '', password: '' },
      rules: {
        username: [{ required: true, message: '', trigger: 'blur' }],
        password: [{ required: true, message: '', trigger: 'blur' }],
      },
      registerFormVisible: false,
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/login', { username: this.loginForm.username, password: this.loginForm.password })
            .then((resp) => {
              if (resp.status === 200 && Object.prototype.hasOwnProperty.call(resp.data, 'token')) {
                this.$store.commit('login', resp.data);
                this.$store.state.token = resp.data.token;
                if (this.$store.state.userDetails.username === 'admin') {
                  this.$router.push({ path: 'admin' });
                } else {
                  this.$router.push({ path: 'user' });
                }
                this.$message({ type: 'success', message: 'welcome aboard ' + this.loginForm.username + ' !', duration: '2000', showClose: 'true', center: 'true' });
              } else {
                this.$message({ type: 'error', message: resp.data.message, duration: '2000', showClose: 'true', center: 'true' });
              }
            })
            .catch((err) => {
              this.$message({ type: 'error', message: err.data.message, duration: '2000', showClose: 'true', center: 'true' });
            });
        } else {
          this.$message({ type: 'warning', message: 'Please fill in the information', duration: '2000', showClose: 'true', center: 'true' });
        }
      });
    },
  },
};
</script>

<style>
.inputBox {
  width: 80%;
  margin: 30px auto;
}
</style>
