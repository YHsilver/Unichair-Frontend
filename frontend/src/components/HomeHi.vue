<template>
  <el-row id="hi">
    <el-col :md="16" :sm="24">
      <div id="hiIM">
        Hi! We’re <br />
        🦄 Uni Conference.
      </div>
      <div class="animationSection">
        <div class="animation animation1"></div>
        <div class="animation animation2"></div>
        <div class="animation animation3"></div>
        <div class="animation animation4"></div>
        <div class="animation animation5"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HomeHi',
};
</script>

<style>
#hi {
  height: 100vh;
  background-color: #8669ed;
  overflow: hidden;
}

#hiIM {
  font-size: 64px;
  font-weight: 900;
  padding: 20%;
  color: white;
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
}

@keyframes shootingStar {
  0% {
    transform: translate3d(0, -1920px, 0);
  }
  to {
    transform: translate3d(0, 1920px, 0);
  }
}

.animationSection {
  transform: rotateZ(-45deg);
}

.animationSection .animation::before {
  position: absolute;
  background: #fff;
  content: '';
  transform: translate3d(0, -100%, 0);
}

.animationSection .animation {
  height: 100%;
  position: absolute;
  top: 0;
  border-right: 1px solid hsla(0, 0%, 100%, 0.3);
  transform: scaleX(0.5);
}

.animationSection .animation:before {
  position: absolute;
  background: #fff;
  content: '';
  transform: translate3d(0, -100%, 0);
}

.animationSection .animation1 {
  left: 15%;
}

.animationSection .animation1:before {
  width: 4px;
  height: 18px;
  opacity: 0.8;
  animation: shootingStar 3s ease-in-out infinite;
}

.animationSection .animation2 {
  left: 30%;
}

.animationSection .animation2:before {
  left: -3px;
  width: 6px;
  height: 24px;
  animation: shootingStar 4s ease-in-out infinite;
}

.animationSection .animation3 {
  left: 52%;
}

.animationSection .animation3:before {
  width: 4px;
  height: 14px;
  opacity: 0.6;
  animation: shootingStar 5s ease-in-out infinite;
}

.animationSection .animation4 {
  left: 65%;
}

.animationSection .animation4:before {
  left: -3px;
  width: 6px;
  height: 24px;
  animation: shootingStar 4s ease-in-out infinite;
}

.animationSection .animation5 {
  left: 85%;
}

.animationSection .animation5:before {
  width: 4px;
  height: 18px;
  opacity: 0.8;
  animation: shootingStar 3s ease-in-out infinite;
}
</style>
