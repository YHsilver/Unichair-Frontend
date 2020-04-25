<template>
  <div id="card">
    <el-avatar :size="120"> {{ user.username }} </el-avatar>
    <table>
      <!-- 键值 键名 -->
      <tr v-for="(value, name) in user" :key="name">
        <th>{{ name }}</th>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
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
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios
        .post('/token', {
          token: this.$store.state.token,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.user = resp.data;
          } else {
            this.$message({ type: 'error', message: 'token invalid', duration: '2000', showClose: 'true', center: 'true' });
            this.$router.replace('/');
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({ type: 'error', message: 'token invalid', duration: '2000', showClose: 'true', center: 'true' });
          this.$router.replace('/');
        });
    },
  },
};
</script>

<style>
#card {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
}

td,
th {
  padding: 10px;
  text-align: left;
}
</style>
