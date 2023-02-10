<template>
  <div class="sidebar" :class="{ collapsed: sidebar.isCollapse, hasLogo: layout.isShowLogo }">
    <Logo v-if="layout.isShowLogo" />

    <div ref="menuContainer" class="menu-container">
      <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper" :noresize="false">
        <AppMenu />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from '../Logo';
  import AppMenu from '../AppMenu';

  export default {
    name: 'AppSide',
    components: { Logo, AppMenu },
    data() {
      return {
        resizeObserver: null, // 监听对象
      };
    },
    computed: {
      ...mapGetters(['layout', 'sidebar']),
    },
    mounted() {
      this.observerSideHeight();
    },
    beforeUnmount() {
      if (!this.resizeObserver) {
        return false;
      }

      this.resizeObserver.unobserve(this.$refs.scrollbar);
      this.resizeObserver = null;
    },
    methods: {
      /**
       * @description 监听侧边栏高度
       */
      observerSideHeight() {
        const ResizeObserver = window.ResizeObserver;

        this.resizeObserver = new ResizeObserver(() => {
          this.$nextTick(() => {
            /**
             * fix：解决 scrollbar 没有自动更新的问题
             */
            this.$refs.scrollbar && this.$refs.scrollbar.update();
          });
        });

        this.resizeObserver.observe(this.$refs.menuContainer);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: $sideOpenWidth;
    height: 100vh;
    overflow: hidden;
    background: v-bind('sidebar.menuBackgroundColor');

    .menu-container {
      width: 100%;
      height: 100%;
    }

    &.collapsed {
      width: $sideCollapseWidth;

      ::v-deep {
        .el-submenu__title span,
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    &.hasLogo {
      .menu-container {
        height: calc(100% - #{$headerHeight});
      }
    }
  }
</style>
