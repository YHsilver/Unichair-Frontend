<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />
    <div style="display: flex;">
      <el-menu class="Bar" default-active="2" :collapse="true" :router="false">
        <el-menu-item @click="show = 'ConferenceForm'" index="0">
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">申请会议</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">会议中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">会议列表</span>
            <el-menu-item index="1-1">
              <i class="el-icon-chat-square"></i>
              <span slot="title">我的会议</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">全部会议</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="uer">个人中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">个人中心</span>
            <el-menu-item index="2-1">
              <i class="el-icon-message"></i>
              <span slot="title">消息中心</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-news"></i>
              <span slot="title" @click="show = 'UserInfo'">个人资料</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <div class="Choice">
        <!-- 个人资料 -->
        <UserInfo v-show="show === 'UserInfo'" />
        <!-- 消息中心 -->
        <ConferenceForm v-show="show === 'ConferenceForm'" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UserInfo from '@/components/userComponents/UserInfo.vue';
import ConferenceForm from '@/components/userComponents/ConferenceForm.vue';

export default {
  name: 'User',
  components: { Header, UserInfo, ConferenceForm },
  data() {
    return { show: 'UserInfo' };
  },
  methods: {},
};
</script>

<style>
.Bar {
  min-height: calc(100vh - 60px);
}

.Choice {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
}
</style>
