<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link v-if="sidebar.isCollapse" to="/" key="collapse">
        <svg-icon class="logo" name="logo" />
      </router-link>
      <router-link v-else to="/" key="expand">
        <svg-icon class="logo" name="logo" />
        <h1 class="title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Logo',
    computed: {
      ...mapGetters(['sidebar']),
      title() {
        return import.meta.env.VITE_APP_TITLE;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar-logo-container {
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;

    .logo {
      display: inline-block;
      font-size: 32px;
    }

    .title {
      display: inline-block;
      font-size: 18px;
      color: #fff;
      margin: 0 0 0 5px;
    }
  }
</style>
