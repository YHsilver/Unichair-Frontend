<template>
  <el-main style="padding-top: 2%">
    <el-row style="font-size: 2em; width: 86%;">
      <el-col :span="18" style="height: 500px;">
        <div>
          <p id="welcome">
            Welcome to Uni Conference
          </p>
          <div>
            <p style="text-align: left; margin-left: 18%;  line-height: 1.4;">
              <strong>Community</strong> of<br />
              World's Greatest Minds<br /><br />
              <strong>Management</strong> of<br />
              Submission and Review<br /><br />
              <strong>Exploration</strong> of<br />
              Mysteries of the Universe<br /><br />
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6" style="height: 500px;">
        <div
          style="background-color: white; padding: 20px; margin-top: 0px; height: 460px; border: blanchedalmond; border-width: medium; border-radius: 8px;width:360px;box-shadow: 0 0 35px 0 rgba(154,161,171,.15);"
        >
          <el-form style="text-align: center;" :model="loginForm" :rules="rules" class="login_container" v-loading="loading">
            <h4 class="login_title">Login</h4>

            <!-- user -->
            <el-form-item prop="username" class="inputBox">
              <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item prop="password" class="inputBox">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password" show-password v-on:keyup.enter.native="login"
                ><i slot="prefix" class="el-input__icon el-icon-key"></i
              ></el-input>
            </el-form-item>
            <br />
            <!-- submit -->
            <el-form-item style="width: 100%">
              <el-button type="primary" class="uni-button" v-on:click="login">login</el-button><br /><br />
              <div style="background: blanchedalmond; margin-left: -20px; margin-right: -20px; margin-bottom: -20px; margin-top: 15px; padding: 10px; border-radius: 5px;">
                <span style="font-size: 1.7em;">No account yet?</span><br />
                <router-link to="register">
                  <a href="Register.vue" style="color:#727cf5; font-size: 1.4em; text-decoration: none;">register now</a>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'Index',
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
      loading: false,
      respon: '',
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

<style scoped>
.uni-button {
  width: 100px;
  height: 36px;
  border-radius: 2px;
  font-size: 1.1em;
  padding: 5px;
}

#welcome {
  font-size: 1.6em;
  text-align: left;
  margin: 6%;
  margin-top: 0px;
}

main {
  overflow-y: hidden;
  /*min-height: 590px;*/
}

.inputBox {
  width: 80%;
  margin: 30px auto;
}

a {
  text-decoration: none;
}
</style>
