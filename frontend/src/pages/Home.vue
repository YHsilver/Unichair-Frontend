<template>
  <div style="min-height:100vh;display:flex;flex-direction: column;">
    <div style="flex:1">
      <Hi />
      <Welcome />
      <el-collapse v-model="activeLab" style="width:90%;margin:5%;">
        <el-collapse-item title="👍 LAB2" name="1"> <Lab2 /> </el-collapse-item>
        <el-collapse-item title="👍 LAB3" name="2"> <Lab3 /> </el-collapse-item>
        <el-collapse-item title="👍 LAB4" name="3"> <Lab4 /> </el-collapse-item>
      </el-collapse>
    </div>
    <Footer />
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Hi from '@/components/HomeHi.vue';
import Welcome from '@/components/HomeWelcome.vue';
import Lab2 from '@/components/HomeLab2.vue';
import Lab3 from '@/components/HomeLab3.vue';
import Lab4 from '@/components/HomeLab4.vue';
import Footer from '@/components/TheFooter.vue';

export default {
  name: 'Home',
  components: { Hi, Welcome, Lab2, Lab3, Lab4, Footer },
  data() {
    return { activeLab: '1' };
  },
};
</script>

<style>
.el-collapse-item__wrap {
  background-color: #fafbfe !important;
}

.el-collapse-item__header {
  background-color: #fafbfe !important;
  padding-left: 44%;
  font-size: inherit !important;
}

.el-collapse-item__content {
  font-size: inherit !important;
}
</style>
