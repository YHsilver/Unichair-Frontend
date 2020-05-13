<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/home/Header.vue';

export default {
  name: 'APP',
  components: { Header },
  created() {
    console.log('\n'.concat(' %c Uni Conference 🎉 v', '2.0.0', ' \n'), 'color: #fafafa; background: #8669ed; padding:5px 0;');
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Nunito, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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

/* scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(44, 44, 44, 0.2);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
  background-color: rgba(44, 44, 44, 0.2);
  border-radius: 6px;
}

sr-rd-content pre,
sr-rd-content pre *,
sr-rd-content pre div {
  font-size: 20px !important;
}

sr-rd-content,
sr-rd-desc,
sr-rd-title {
  width: auto;
}
</style>
