<template>
  <el-footer>
    <el-col :span="24" id="footerContent">
      <span>© 2020 Uni Conference. Design and coded by p.h.y</span>
    </el-col>
  </el-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.el-footer {
  background-color: #313a46 !important;
  width: 100%;
  height: 60px;
  bottom: 0;
}

#footerContent {
  font-size: 0.9rem;
  color: white;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
