<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />
    <div style="display: flex;min-height: calc(100vh - 60px);">
      <el-menu v-bind:class="{ Bar: !isCollapse }" :default-active="$route.path.replace('/admin/', '')" :collapse="isCollapse" router :collapse-transition="false">
        <el-menu-item index="Conferencelist" class="mainMenu">
          <i class="el-icon-chat-square"></i>
          <span slot="title">Audit Conference</span>
        </el-menu-item>

        <el-menu-item index="ManageUser" class="mainMenu" disabled>
          <i class="el-icon-s-operation"></i>
          <span slot="title">Manage Users</span>
        </el-menu-item>

        <el-menu-item @click="isCollapse = !isCollapse" style="position: absolute;bottom: 0;width:100%" class="mainMenu">
          <i class="el-icon-more"></i>
        </el-menu-item>
      </el-menu>

      <div class="Choice">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'Admin',
  components: { Header },
  created() {
    this.$message({ type: 'success', message: 'welcome aboard !', duration: '2000', showClose: 'true', center: 'true' });
    this.$notify({ title: 'Tip', message: 'Double click to view meeting details', offset: 50 });
  },
  data() {
    return { show: 'Conferencelist', isCollapse: true };
  },
  methods: {},
};
</script>

<style scoped>
.Bar {
  min-width: 200px;
}

.mainMenu {
  text-align: left;
}

.Choice {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
}
</style>
