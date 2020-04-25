<template>
  <div style="min-height:100vh;display:flex;flex-direction: column;">
    <Header v-bind:loginSwitch="false" />
    <div style="flex:1">
      <Welcome />
    </div>
    <Footer />
  </div>
</template>

<script>
import Welcome from '@/components/homeComponents/Welcome.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Welcome,
    Header,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
