<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />

    <div style="display: flex;min-height: calc(100vh - 60px);">
      <el-menu v-bind:class="{ Bar: !isCollapse }" :default-active="$route.path.replace('/user/', '')" :collapse="isCollapse" :collapse-transition="false" router>
        <el-menu-item index="NewApplication" class="mainMenu">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">申请会议</span>
        </el-menu-item>

        <el-submenu class="mainMenu" index="Conference">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span slot="uer">我的会议</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* 我的会议 */</span>
            <el-menu-item index="MyApplication">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">我申请的会议</span>
            </el-menu-item>
            <el-menu-item index="MyConference">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">我参与的会议</span>
            </el-menu-item>
            <el-menu-item index="MyStar" disabled>
              <i class="el-icon-collection-tag"></i>
              <span slot="title">我收藏的会议</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="ConferenceSquare" class="mainMenu">
          <i class="el-icon-wind-power"></i>
          <span slot="title">会议广场</span>
        </el-menu-item>

        <el-submenu class="mainMenu" index="My">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="uer">个人中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* 个人中心 */</span>
            <el-menu-item index="Messages" @click="seeMessage()">
              <i class="el-icon-message"></i>
              <span slot="title">消息中心<el-badge :is-dot="isDot" style="top: -10px;"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="UserInfo">
              <i class="el-icon-postcard"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="Setting" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

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
  name: 'User',
  components: { Header },
  data() {
    return { isDot: true, isCollapse: true };
  },
  created() {
    this.$notify({ title: '提示', message: '现双击可查看会议详情', offset: 50 });
  },
  methods: {
    seeMessage() {
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
