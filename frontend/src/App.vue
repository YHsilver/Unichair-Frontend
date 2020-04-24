<template>
  <div id="app">
    <Header v-bind:loginSwitch="true" />
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/index">Index</router-link>
    </div>
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
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6c757d;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafbfe;
}

#nav {
  padding: 10px;
  background: #4e5bf2;
  color: white;
  text-align: left;
}

#nav a {
  text-decoration: none;
  color: white;
}

#nav a:hover {
  color: antiquewhite;
}
</style>
