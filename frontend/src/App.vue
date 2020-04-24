<template>
  <div id="app">
    <Header />
    <router-view style="flex:1" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'APP',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Nunito, sans-serif;
  /* font-size: 16px; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6c757d;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafbfe;
}
</style>
