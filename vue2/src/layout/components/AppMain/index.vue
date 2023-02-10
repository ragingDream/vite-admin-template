<template>
  <div
    class="main"
    :class="{ siblingFixedHeader: layout.isFixedHeader, siblingFooter: layout.isShowFooter }"
  >
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters(['layout']),
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    padding: 10px;
  }

  .siblingFixedHeader {
    padding-top: calc(10px + #{$headerHeight});
  }

  .siblingFooter {
    padding-bottom: calc(10px + #{$footerHeight});
  }
</style>
