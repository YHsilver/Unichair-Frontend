<template>
  <div style="min-height:100vh;display:flex;flex-direction: column;">
    <Header v-bind:loginSwitch="false" class="headContainer" />
    <div style="flex:1">
      <Welcome />
      <el-collapse v-model="activeLab" style="width:90%;margin:5%;">
        <el-collapse-item title="👍 LAB2" name="1"> <Lab2 /> </el-collapse-item>
        <el-collapse-item title="👍 LAB3" name="2"> <Lab3 /> </el-collapse-item>
      </el-collapse>
    </div>
    <Footer />
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Welcome from '@/components/homeComponents/Welcome.vue';
import Lab2 from '@/components/homeComponents/Lab2.vue';
import Lab3 from '@/components/homeComponents/Lab3.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: { Welcome, Lab2, Lab3, Header, Footer },
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
