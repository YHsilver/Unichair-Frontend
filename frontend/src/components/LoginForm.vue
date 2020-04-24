<template>
  <div>
    <el-form id="loginContent" :model="loginForm" :rules="rules" class="login_container">
      <h4 class="login_title">Login</h4>

      <!-- user -->
      <el-form-item prop="username" class="inputBox">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password" class="inputBox">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password" show-password v-on:keyup.enter.native="login" clearable>
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>

      <!-- submit -->
      <el-form-item>
        <el-button type="primary" class="uni-button" v-on:click="login">login</el-button>
      </el-form-item>

      <!-- register tip -->
      <el-form-item>
        <span>No account yet? 👉 </span>
        <el-link type="primary" :underline="false" @click="registerFormVisible = true">register now </el-link>
        <el-dialog :visible.sync="registerFormVisible" width="fit-content" append-to-body>
          <RegisterForm />
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RegisterForm from './RegisterForm.vue';

export default {
  name: 'LoginForm',
  components: {
    RegisterForm,
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '', trigger: 'blur' }],
        password: [{ required: true, message: '', trigger: 'blur' }],
      },
      registerFormVisible: false,
    };
  },
  methods: {
    login() {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200 && Object.prototype.hasOwnProperty.call(resp.data, 'token')) {
            this.$store.commit('login', resp.data);
            this.$store.state.token = resp.data.token;
            // if (this.$store.state.userDetails.username === 'admin') {
            //   this.$router.replace({ path: '/admin' });
            // } else {
            //   this.$router.replace({ path: '/system' });
            // }
            this.$message({
              type: 'success',
              message: 'welcome aboard ' + this.loginForm.username + ' !',
              duration: '2000',
              showClose: 'true',
              center: 'true',
            });
          } else {
            //alert("else in");
            //console.log(error);
            this.$message({
              type: 'error',
              message: resp.data.message,
              duration: '2000',
              showClose: 'true',
              center: 'true',
            });
          }
        })
        .catch((error) => {
          //alert("catched");
          console.log(error);
          this.$message({
            type: 'error',
            message: 'login error',
            duration: '2000',
            showClose: 'true',
            center: 'true',
          });
        });
    },
  },
};
</script>

<style>
#loginContent {
  background-color: white;
  padding: 20px 20px 0;
  border-radius: 10px;
  width: 320px;
  text-align: center;
}

.inputBox {
  width: 80%;
  margin: 30px auto;
}

a {
  text-decoration: none;
}
</style>
