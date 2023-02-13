<template>
  <el-menu
    class="menu-list"
    :mode="mode"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="sidebar.uniqueOpened"
    :background-color="sidebar.menuBackgroundColor"
    :text-color="sidebar.menuTextColor"
    :active-text-color="sidebar.menuActiveTextColor"
    :collapse-transition="false"
  >
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
      :class="{ 'el-menu-item': layout.mode === 'top' }"
    />
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';

  export default {
    name: 'AppMenu',
    components: { SidebarItem },
    computed: {
      ...mapGetters(['layout', 'sidebar', 'routes']),
      mode() {
        return this.layout.mode === 'top' ? 'horizontal' : 'vertical';
      },
      activeMenu() {
        const { meta, path } = this.$route;

        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }

        return path;
      },
      isCollapse() {
        return this.sidebar.isCollapse;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .menu-list {
    ::v-deep {
      .el-submenu__title:hover,
      .submenu-title-noDropdown:hover,
      .el-menu-item.is-active {
        background-color: v-bind('sidebar.menuHoverBackgroundColor') !important;
      }

      &.el-menu--inline {
        .el-submenu__title,
        .el-menu-item {
          background-color: v-bind('sidebar.subMenuBackgroundColor') !important;

          &:hover {
            background-color: v-bind('sidebar.subMenuHoverBackgroundColor') !important;
          }
        }

        .el-menu-item.is-active {
          background-color: v-bind('sidebar.subMenuHoverBackgroundColor') !important;
        }
      }

      &.el-menu--horizontal {
        & > div.el-menu-item {
          border-bottom: none;
        }

        .el-menu-item {
          height: $headerHeight;
          line-height: $headerHeight;

          &.is-active {
            border-bottom: 3px solid v-bind('sidebar.menuActiveTextColor');
          }
        }
      }
    }
  }
</style>
