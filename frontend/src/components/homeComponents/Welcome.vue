<template>
  <div>
    <el-row id="intro">
      <el-col :md="8" :sm="24">
        <el-carousel indicator-position="outside" width="400px" height="min(400px,60vw)">
          <el-carousel-item v-for="i in 4" :key="i">
            <img style="max-height: 360px; padding: 10px;max-width: 100%;" alt="startup" :src="'welcome/setup (' + i + ').svg'" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :md="16" :sm="24">
        <el-tag type="danger" effect="dark" size="mini">new</el-tag>
        <span> Welcome to new conference tool</span>

        <h1>Vue.js + Element UI + SpringBoot Web</h1>
        <h3>Community of World's Greatest Minds</h3>
        <h3>Management of Submission and Review</h3>
        <h3>Exploration of Mysteries of the Universe</h3>
        <br />
        <el-button @click="registerFormVisible = true" type="success" style="width:180px;height:50px;font-size:0.8rem" round>
          Try for free
          <i class="el-icon-right el-icon--right"></i>
        </el-button>
        <el-dialog :visible.sync="registerFormVisible" width="520px">
          <registerForm @registerFinished="registerFormVisible = false" />
        </el-dialog>
      </el-col>
    </el-row>

    <!-- 斜线 -->
    <div style="height: 100px; background-color: #727cf5; transform: translateY(-50px) skewY(-3deg);"></div>

    <el-row>
      <el-col :md="24" :sm="24">
        <img class="logo" alt="Vue logo" src="@/assets/vue-logo.png" />
        <img class="logo" alt="Element logo" src="@/assets/element-logo.svg" />
        <img class="logo" alt="Spring logo" src="@/assets/spring-logo.svg" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import registerForm from '@/components/authComponents/RegisterForm.vue';

export default {
  name: 'Welcome',
  components: { registerForm },
  data() {
    return { registerFormVisible: false };
  },
};
</script>

<style scoped>
#intro {
  height: auto;
  padding: 80px;
  color: white;
  background-image: linear-gradient(to bottom, #8669ed, #727cf5);
}

.logo {
  height: 80px;
  padding: 10px;
}
</style>
