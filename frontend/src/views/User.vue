<template>
  <div style="display:flex;flex-direction:column">
    <Header v-bind:loginSwitch="true" />

    <div style="display: flex;min-height: calc(100vh - 60px);">
      <el-menu v-bind:class="{ Bar: !isCollapse }" :default-active="$route.path.replace('/user/', '')" :collapse="isCollapse" :collapse-transition="false" router>
        <el-menu-item index="NewApplication" class="mainMenu">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">New Application</span>
        </el-menu-item>

        <el-submenu class="mainMenu" index="Conference">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span slot="uer">Conference</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* Conference */</span>
            <el-menu-item index="MyApplication">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">My Applications</span>
            </el-menu-item>
            <el-menu-item index="MeParticipated">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">Me Participated</span>
            </el-menu-item>
            <el-menu-item index="MyStar" disabled>
              <i class="el-icon-collection-tag"></i>
              <span slot="title">My Star</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="ConferenceSquare" class="mainMenu">
          <i class="el-icon-wind-power"></i>
          <span slot="title">Conference Square</span>
        </el-menu-item>

        <el-submenu class="mainMenu" index="My">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="uer">Personal Center</span>
          </template>
          <el-menu-item-group>
            <span slot="title">/* Personal Center */</span>
            <el-menu-item index="Messages" @click="seeMessage()">
              <i class="el-icon-message"></i>
              <span slot="title">My Messages<el-badge style="top: -10px;"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="UserInfo">
              <i class="el-icon-postcard"></i>
              <span slot="title">User Info</span>
            </el-menu-item>
            <el-menu-item index="Setting" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">Setting</span>
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
    return { isCollapse: true };
  },
  methods: {
    seeMessage() {
      this.$notify({ title: 'Tip', message: 'Double click the meeting name to view the meeting details', offset: 50 });
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
