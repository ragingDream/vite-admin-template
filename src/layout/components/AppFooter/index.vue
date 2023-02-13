<template>
  <div class="footer">Copyright ©2023 chenzl</div>
</template>

<script>
  export default {
    name: 'AppFooter',
  };
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: $sideOpenWidth;
    padding: 0 20px;
    height: $footerHeight;
    border-top: 1px solid #ccc;
    background-color: #fff;
    line-height: $footerHeight;
  }
</style>
