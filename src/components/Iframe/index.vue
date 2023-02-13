<template>
  <div class="iframe-container" v-loading="loading" element-loading-text="拼命加载中">
    <iframe class="iframe" :src="frameSrc" @load="hideLoading"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'IframeLayout',
    data() {
      return {
        loading: true, // loading 标志
      };
    },
    computed: {
      frameSrc() {
        const {
          meta: { iframeURL },
        } = this.$route;

        return iframeURL || '';
      },
    },
    methods: {
      /**
       * @description 关闭 loading
       */
      hideLoading() {
        this.loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .iframe-container {
    position: relative;
    margin: -10px;
    width: calc(100% + 20px);
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});

    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
