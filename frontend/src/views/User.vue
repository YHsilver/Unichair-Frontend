<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />

    <div style="display: flex;min-height: calc(100vh - 60px);">
      <el-menu v-bind:class="{ Bar: !isCollapse }" default-active="3" :collapse="isCollapse" :collapse-transition="false">
        <el-menu-item index="1" @click="show = 'ConferenceForm'" class="mainMenu">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">申请会议</span>
        </el-menu-item>

        <el-submenu index="2" class="mainMenu">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span slot="uer">我的会议</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* 我的会议 */</span>
            <el-menu-item index="2-1" @click="show = 'MyApplication'">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">我申请的会议</span>
            </el-menu-item>
            <el-menu-item index="2-2" @click="show = 'MyConference'">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">我参与的会议</span>
            </el-menu-item>
            <el-menu-item index="2-3" @click="show = 'MyStar'" disabled>
              <i class="el-icon-collection-tag"></i>
              <span slot="title">我收藏的会议</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3" @click="show = 'ConferenceSquare'" class="mainMenu">
          <i class="el-icon-wind-power"></i>
          <span slot="title">会议广场</span>
        </el-menu-item>

        <el-submenu index="4" class="mainMenu">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="uer">个人中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* 个人中心 */</span>
            <el-menu-item index="4-1" @click="seeMessage()">
              <i class="el-icon-message"></i>
              <span slot="title">消息中心<el-badge :is-dot="isDot" style="top: -10px;"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="4-2" @click="show = 'UserInfo'">
              <i class="el-icon-postcard"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="4-3" @click="show = 'Setting'" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item @click="isCollapse = !isCollapse" index="5" style="position: absolute;bottom: 0;width:100%" class="mainMenu">
          <i class="el-icon-more"></i>
        </el-menu-item>
      </el-menu>

      <div class="Choice">
        <!-- 个人资料 -->
        <UserInfo v-show="show === 'UserInfo'" />
        <!-- 会议广场 -->
        <ConferenceSquare v-show="show === 'ConferenceSquare'" />
        <!-- 申请会议 -->
        <ConferenceForm v-show="show === 'ConferenceForm'" />
        <!-- 我申请的会议 -->
        <MyApplication v-show="show === 'MyApplication'" />
        <!-- 我的邀请函 -->
        <Messages v-show="show === 'Messages'" />
        <!-- 我的会议 -->
        <MyConference v-show="show === 'MyConference'" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UserInfo from '@/components/userComponents/UserInfo.vue';
import ConferenceForm from '@/components/userComponents/ConferenceForm.vue';
import ConferenceSquare from '@/components/userComponents/ConferenceSquare.vue';
import MyConference from '@/components/userComponents/MyConference.vue';
import MyApplication from '@/components/userComponents/MyApplication.vue';
import Messages from '@/components/userComponents/Messages.vue';

export default {
  name: 'User',
  components: { Header, UserInfo, ConferenceForm, ConferenceSquare, MyConference, Messages, MyApplication },
  data() {
    return { show: 'ConferenceSquare', isDot: true, isCollapse: true };
  },
  created() {
    this.$notify({ title: '提示', message: '现双击可查看会议详情', offset: 50 });
  },
  methods: {
    seeMessage() {
      this.show = 'Messages';
      this.isDot = false;
      this.$notify({ title: '提示', message: '双击会议名称查看会议详情', offset: 50 });
    },
  },
};
</script>

<style scoped>
.Bar {
  min-width: 200px;
}

.Choice {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.mainMenu {
  text-align: left;
}
</style>
