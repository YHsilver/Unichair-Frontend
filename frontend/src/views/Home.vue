<template>
  <div style="min-height:100vh;display:flex;flex-direction: column;">
    <Header v-bind:loginSwitch="false" class="headContainer" />
    <div style="flex:1">
      <Welcome />
      <Lab2 />
    </div>
    <Footer />
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Welcome from '@/components/homeComponents/Welcome.vue';
import Lab2 from '@/components/homeComponents/Lab2.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Welcome,
    Lab2,
    Header,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
