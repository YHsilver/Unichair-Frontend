<template>
  <el-main style="padding-top: 2%">
    <!-- <el-row style="font-size: 2em; width: 86%;">
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
    </el-row> -->
    <el-button @click="loginFormVisible = true">Login</el-button>

    <el-dialog title="" :visible.sync="loginFormVisible" width="fit-content">
      <LoginForm />
    </el-dialog>
  </el-main>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'Index',
  data() {
    return { loginFormVisible: false };
  },
  components: {
    LoginForm,
  },
  methods: {},
};
</script>

<style scoped>
#welcome {
  font-size: 1.6em;
  text-align: left;
  margin: 6%;
  margin-top: 0px;
}
</style>
