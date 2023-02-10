<template>
  <div
    class="app-wrapper"
    :class="{
      hasSide: layout.mode !== 'top',
      collapsed: layout.mode !== 'top' && sidebar.isCollapse,
    }"
  >
    <AppSide v-if="layout.mode !== 'top'" />

    <div ref="mainContainer" class="main-container">
      <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
        <AppHeader />

        <AppMain />

        <AppFooter v-if="layout.isShowFooter" />
      </el-scrollbar>
    </div>

    <AppSettings />

    <el-backtop target=".main-container .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppHeader from './components/AppHeader';
  import AppMain from './components/AppMain';
  import AppFooter from './components/AppFooter';
  import AppSide from './components/AppSide';
  import AppSettings from './components/AppSettings';

  export default {
    name: 'Layout',
    components: { AppHeader, AppMain, AppFooter, AppSide, AppSettings },
    data() {
      return {
        resizeObserver: null, // 监听对象
      };
    },
    computed: {
      ...mapGetters(['layout', 'sidebar']),
    },
    methods: {
      /**
       * @description 监听主界面高度
       */
      observerMainHeight() {
        const ResizeObserver = window.ResizeObserver;

        this.resizeObserver = new ResizeObserver(() => {
          this.$nextTick(() => {
            /**
             * fix：解决 scrollbar 没有自动更新的问题
             */
            this.$refs.scrollbar && this.$refs.scrollbar.update();
          });
        });

        this.resizeObserver.observe(this.$refs.mainContainer);
      },
    },
    mounted() {
      this.observerMainHeight();
    },
    beforeUnmount() {
      if (!this.resizeObserver) {
        return false;
      }

      this.resizeObserver.unobserve(this.$refs.scrollbar);
      this.resizeObserver = null;
    },
  };
</script>

<style lang="scss" scoped>
  .app-wrapper {
    overflow: hidden;
    height: 100vh;

    .main-container,
    .header,
    .footer,
    .sidebar {
      transition: all 0.3s;
    }

    .header,
    .footer {
      left: 0;
      z-index: 1100;
    }

    .main-container {
      position: relative;
      height: 100vh;
      background: #f5f7f9;
    }

    &.hasSide {
      .header,
      .footer {
        left: $sideOpenWidth;
      }

      .main-container {
        margin-left: $sideOpenWidth;
      }

      &.collapsed {
        .main-container {
          margin-left: $sideCollapseWidth;
        }

        .header,
        .footer {
          left: $sideCollapseWidth;
        }
      }
    }
  }
</style>
