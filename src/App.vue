<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style lang="scss" scoped>
  #app {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
</style>
