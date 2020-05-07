<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />
    <div style="display: flex;min-height: calc(100vh - 60px);">
      <el-menu v-bind:class="{ Bar: !isCollapse }" default-active="1" :collapse="isCollapse" :router="false" :collapse-transition="false">
        <el-menu-item @click="show = 'Conferencelist'" index="1" class="mainMenu">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">会议审核</span>
        </el-menu-item>

        <el-menu-item @click="show = 'setting'" index="2" class="mainMenu" disabled>
          <i class="el-icon-s-operation"></i>
          <span slot="title">管理用户</span>
        </el-menu-item>

        <el-menu-item @click="isCollapse = !isCollapse" index="3" style="position: absolute;bottom: 0;width:100%" class="mainMenu">
          <i class="el-icon-more"></i>
        </el-menu-item>
      </el-menu>

      <div class="Choice">
        <Conferencelist v-show="show === 'Conferencelist'" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Conferencelist from '@/components/adminComponents/Conferencelist.vue';

export default {
  name: 'Admin',
  components: { Header, Conferencelist },
  created() {
    this.$notify({ title: '提示', message: '现双击可查看会议详情', offset: 50 });
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
