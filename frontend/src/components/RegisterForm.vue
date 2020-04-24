<template>
  <div>
    <el-form :model="registerForm" :rules="rules" class="register_container" :ref="registerForm" style="text-align: center;">
      <h2>Register</h2>

      <!-- user -->
      <el-form-item prop="username" class="inputBox">
        <el-input class="form-input" type="text" v-model="registerForm.username" auto-complete="off" placeholder="username" @blur.native.capture="aAjax" clearable>
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password" class="inputBox">
        <el-input class="form-input" placeholder="password" v-model="registerForm.password" show-password clearable>
          <i slot="prefix" class="el-icon-key"></i>
        </el-input>
      </el-form-item>

      <!-- confirm password -->
      <el-form-item prop="confirmPassword" class="inputBox">
        <el-input class="form-input" placeholder="confirm password" v-model="registerForm.confirmPassword" show-password clearable>
          <i slot="prefix" class="el-icon-key"></i>
        </el-input>
      </el-form-item>

      <!-- full name -->
      <el-form-item prop="fullName" class="inputBox">
        <el-input class="form-input" placeholder="full name" v-model="registerForm.fullName" clearable>
          <i slot="prefix" class="el-icon-postcard"></i>
        </el-input>
      </el-form-item>

      <!-- unit -->
      <el-form-item prop="unit" class="inputBox">
        <el-input class="form-input" v-model="registerForm.unit" placeholder="unit" clearable>
          <i slot="prefix" class="el-icon-office-building"></i>
        </el-input>
      </el-form-item>

      <!-- area -->
      <el-form-item prop="area" class="inputBox">
        <el-input class="form-input" v-model="registerForm.area" placeholder="area" clearable>
          <i slot="prefix" class="el-icon-map-location"></i>
        </el-input>
      </el-form-item>

      <!-- email -->
      <el-form-item prop="email" class="inputBox">
        <el-input type="email" class="form-input" v-model="registerForm.email" placeholder="email" clearable>
          <i slot="prefix" class="el-icon-message"></i>
        </el-input>
      </el-form-item>

      <!-- verification code -->
      <!-- <el-form-item>
          <i slot="prefix" class="el-icon-circle-check"></i>
          <el-input
            class="form-input"
            placeholder="verification code"
            style="width: 48%;"
          ></el-input>
          <el-button
            class="verification-code-get-button"
            style="width: 22%; text-align: center; font-size: 1.2em; font-family: Georgia;"
            >Send</el-button
          >
        </el-form-item> -->

      <el-form-item>
        <el-button class="uni-button" type="primary" v-on:click="register(registerForm)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const dataValid = (rule, value, callback) => {
      let userName = this.registerForm.username;
      let password = this.registerForm.password;
      // 如果userName为''，则indexOf返回0
      if (userName != '' && password.indexOf(userName) != -1) {
        return callback(new Error('不能包含账号'));
      }
      return callback();
    };
    const confirmValid = (rule, value, callback) => {
      let password = this.registerForm.password;
      let confirmPassword = this.registerForm.confirmPassword;
      if (password !== confirmPassword) {
        return callback(new Error('password & confirm password must be the same.'));
      }
      return callback();
    };
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        unit: '',
        area: '',
      },
      rules: {
        // blur 失去鼠标焦点时触发验证
        username: [
          { required: true, message: '', trigger: 'blur' },
          { min: 5, max: 32, message: '长度为5-32个字符', trigger: 'blur' },
          // 开头匹配字母和-使用^[A-Za-z-]+?而不能是^[A-z|-]+?，这样还可以匹配到_
          {
            pattern: /^[A-Za-z-]+?[A-Za-z0-9_-]{4,31}$/,
            message: '只能包含字母，数字或两种特殊字符（-_）且只能以字母或-开头',
            trigger: 'blur',
          },
        ],

        password: [
          { required: true, message: '', trigger: 'blur' },
          { min: 6, max: 32, message: '长度为6-32个字符', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)(?!([-_])+$)[A-Za-z0-9_-].{5,32}$/,
            message: '字母，数字或者特殊字符（-_）至少包含两种',
            trigger: 'blur',
          },
          { validator: dataValid, message: '不能包含账号', trigger: 'blur' },
        ],

        confirmPassword: [
          { required: true, message: 'confirm password is required.', trigger: 'blur' },
          { validator: confirmValid, message: 'password & confirm password must be the same.', trigger: 'blur' },
        ],

        fullName: [{ required: true, message: 'full name is required', trigger: 'blur' }],

        email: [
          { required: true, message: '', trigger: 'blur' },
          {
            pattern: /\w+@\w+\.\w+/,
            message: '使用雷·汤姆林森创立的标准E-mail格式，即用户标识符+ @ + 域名',
            trigger: 'blur',
          },
        ],

        unit: [{ required: true, message: '', trigger: 'blur' }],

        area: [{ required: true, message: '', trigger: 'blur' }],
      },
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/register', {
              username: this.registerForm.username,
              password: this.registerForm.password,
              email: this.registerForm.email,
              fullName: this.registerForm.fullName,
              unit: this.registerForm.unit,
              area: this.registerForm.area,
            })
            .then((resp) => {
              // 根据后端的返回数据修改
              if (resp.status === 200 && Object.prototype.hasOwnProperty.call(resp.data, 'id')) {
                // 跳转到login
                this.$message({
                  type: 'success',
                  message: 'successful registration',
                  duration: '2000',
                  showClose: 'true',
                  center: 'true',
                });
                this.$router.replace('/index');
              } else {
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
              console.log(error);
              this.$message({
                type: 'error',
                message: error.data.message,
                duration: '2000',
                showClose: 'true',
                center: 'true',
              });
            });
        } else {
          // console.log("wrong submit");
          this.$message({
            type: 'warning',
            message: 'Please fill in the information',
            duration: '2000',
            showClose: 'true',
            center: 'true',
          });
        }
      });
    },
    aAjax() {
      this.$axios
        .post('/login', {
          username: this.registerForm.username,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          if (error.status === 500) {
            this.$message({
              type: 'error',
              message: "This username ' " + this.registerForm.username + " ' has been registered",
              duration: '2000',
              showClose: 'true',
              center: 'true',
            });
            this.registerForm.username = '';
          } else {
            console.log('error');
          }
        });
    },
  },
};
</script>

<style scoped>
.inputBox {
  width: 80%;
  margin: 30px auto;
}
</style>
