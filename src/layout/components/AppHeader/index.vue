<template>
  <div
    class="header"
    :class="{ isFixed: layout.isFixedHeader, 'layout-top-header': layout.mode === 'top' }"
  >
    <div class="header-left" v-if="layout.mode === 'top'">
      <Logo class="header-logo" />

      <AppMenu class="header-menu" />
    </div>
    <div class="header-left" v-else>
      <i
        v-if="layout.mode !== 'top'"
        class="hamburger"
        :class="sidebar.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggleSidebar"
      ></i>

      <Breadcrumb v-if="layout.mode !== 'top'" />
    </div>

    <div class="header-actions">
      <el-dropdown>
        <div class="user-info">
          <el-avatar :src="avatar"></el-avatar>
          <span class="user-name">{{ name }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>参考项目</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from '../Logo';
  import AppMenu from '../AppMenu';
  import Breadcrumb from '../Breadcrumb';

  export default {
    name: 'AppHeader',
    components: { Logo, AppMenu, Breadcrumb },
    computed: {
      ...mapGetters(['layout', 'sidebar', 'avatar', 'name']),
    },
    methods: {
      /**
       * @description 展开 / 折叠侧边栏
       */
      toggleSidebar() {
        this.$store.dispatch('app/toggleSidebar');
      },
      /**
       * @description 退出登录
       */
      async logout() {
        await this.$store.dispatch('user/logout');
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: $headerHeight;
    background: #fff;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;

    .header-left,
    .header-actions {
      display: flex;
      align-items: center;
    }

    .hamburger {
      margin: 0 20px;
      cursor: pointer;
      font-size: 32px;
    }

    .user-info {
      display: flex;
      align-items: center;
      height: $headerHeight;
      padding: 0 20px;

      .user-name {
        margin-left: 10px;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    &.isFixed {
      position: fixed;
      left: $sideOpenWidth;
      right: 0;
      top: 0;
    }

    &.layout-top-header {
      border-bottom: none;
      background: v-bind('sidebar.menuBackgroundColor');

      .header-logo,
      .header-menu {
        display: flex;
        align-items: center;
      }

      .header-logo {
        padding: 0 20px;
        margin-right: 30px;
        background: v-bind('sidebar.menuBackgroundColor');

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .header-menu {
        flex: 1;
      }

      .user-name {
        color: #fff;
      }
    }
  }
</style>
