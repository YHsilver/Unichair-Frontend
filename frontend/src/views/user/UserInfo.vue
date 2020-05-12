<template>
  <el-card shadow="hover" id="card">
    <el-form label-position="left" label-width="200px">
      <el-avatar :size="120"> {{ user.username }} </el-avatar>

      <el-form-item label="Username">
        <span>{{ user.username }}</span>
      </el-form-item>
      <el-form-item label="Full Name">
        <span>{{ user.fullName }}</span>
      </el-form-item>
      <el-form-item label="Area">
        <span>{{ user.area }}</span>
      </el-form-item>
      <el-form-item label="Unit">
        <span>{{ user.unit }}</span>
      </el-form-item>
      <el-form-item label="Email">
        <span>{{ user.email }}</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      user: { username: '', id: '', fullName: '', email: '', unit: '', area: '' },
    };
  },
  created() {
    // this.getUser();
    this.user = this.$store.state.userDetails;
  },
  methods: {
    // getUser() {
    //   this.$axios
    //     .post('/token', { token: this.$store.state.token })
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         this.user = resp.data;
    //       } else {
    //         this.$message({ type: 'error', message: 'token invalid', duration: '2000', showClose: 'true', center: 'true' });
    //         this.$store.commit('logout');
    //         this.$router.push({ path: '/' });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({ type: 'error', message: 'token invalid', duration: '2000', showClose: 'true', center: 'true' });
    //       this.$store.commit('logout');
    //       this.$router.push({ path: '/' });
    //     });
    // },
  },
};
</script>

<style>
#card label {
  width: 200px !important;
  color: #8669ed !important;
  font-weight: 900;
}

#card {
  padding: 40px;
  margin: 20px;
  border: none;
  border-radius: 10px;
  width: 520px;
}
</style>
