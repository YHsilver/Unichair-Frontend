<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />

    <div style="display: flex;">
      <el-menu class="Bar" default-active="2" :collapse="true">
        <el-menu-item index="1" @click="show = 'ConferenceForm'">
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">申请会议</span>
        </el-menu-item>

        <el-menu-item index="2" @click="show = 'ConferenceSquare'">
          <i class="el-icon-wind-power"></i>
          <span slot="title">会议广场</span>
        </el-menu-item>

        <el-menu-item index="3" @click="show = 'MyConference'">
          <i class="el-icon-tickets"></i>
          <span slot="title">我的会议</span>
        </el-menu-item>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="uer">个人中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">个人中心</span>
            <el-menu-item index="4-1" @click="seeMessage()">
              <i class="el-icon-message"></i>
              <span slot="title">消息中心<el-badge :is-dot="isDot" style="top: -10px;"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="4-2" @click="show = 'UserInfo'">
              <i class="el-icon-news"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="4-3" @click="show = 'Setting'">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <div class="Choice">
        <!-- 个人资料 -->
        <UserInfo v-show="show === 'UserInfo'" />
        <!-- 会议广场 -->
        <ConferenceSquare v-show="show === 'ConferenceSquare'" />
        <!-- 消息中心 -->
        <ConferenceForm v-show="show === 'ConferenceForm'" />
        <ConferenceDetail v-show="show === 'ConferenceDetail'" />
        <!-- 我的邀请函 -->
        <Messages v-show="show === 'Messages'" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UserInfo from '@/components/userComponents/UserInfo.vue';
import ConferenceForm from '@/components/userComponents/ConferenceForm.vue';
import ConferenceSquare from '@/components/userComponents/ConferenceSquare.vue';
import ConferenceDetail from '@/components/userComponents/ConferenceDetail.vue';
import Messages from '@/components/userComponents/Messages.vue';

export default {
  name: 'User',
  components: { Header, UserInfo, ConferenceForm, ConferenceSquare, ConferenceDetail, Messages },
  data() {
    return { show: 'ConferenceSquare', isDot: true };
  },
  methods: {
    seeMessage() {
      this.show = 'Messages';
      this.isDot = false;
    },
  },
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
