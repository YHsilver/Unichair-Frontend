<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />
    <div style="display:flex">
      <el-menu class="Bar" default-active="0" :collapse="true" :router="false">
        <el-menu-item @click="show = 'Conferencelist'" index="0">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">会议审核</span>
        </el-menu-item>

        <el-menu-item @click="show = 'setting'" index="1">
          <i class="el-icon-s-operation"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>

      <Conferencelist v-show="show === 'Conferencelist'" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Conferencelist from '@/components/adminComponents/Conferencelist.vue';

export default {
  name: 'Admin',
  components: { Header, Conferencelist },
  data() {
    return { show: 'Conferencelist' };
  },
  methods: {},
};
</script>

<style>
.Bar {
  min-height: calc(100vh - 60px);
}
</style>
