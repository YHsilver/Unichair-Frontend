<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'APP',
  components: {},
  created() {
    console.log('\n'.concat(' %c Uni Conference 🎉 v', '1.2.1', ' \n'), 'color: #fafafa; background: #8669ed; padding:5px 0;');
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
