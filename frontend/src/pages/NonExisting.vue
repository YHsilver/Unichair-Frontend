<template>
  <div id="NonExisting">
    <img src="/no_data.svg" style="width: min(640px,80%)" />
  </div>
</template>

<script>
export default {
  name: 'NonExisting',
};
</script>

<style>
#NonExisting {
  height: calc(100vh - 60px);
  background-image: linear-gradient(to bottom, #8669ed, #727cf5);
}
</style>
