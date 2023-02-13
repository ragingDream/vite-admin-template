<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { generateTitle } from '@/utils/i18n';
  import { compile } from 'path-to-regexp';

  export default {
    name: 'Breadcrumb',
    data() {
      return {
        levelList: null, // 层级列表
      };
    },
    watch: {
      $route: {
        handler: function () {
          this.getBreadcrumb();
        },
        immediate: true,
      },
    },
    methods: {
      generateTitle,
      /**
       * @description 获取面包屑
       */
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
        const first = matched[0];

        if (!this.isHome(first)) {
          matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
        }

        this.levelList = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
      },
      /**
       * @description 是否是首页路由
       * @param {object} 路由对象
       */
      isHome(route) {
        const name = route && route.name;

        if (!name) {
          return false;
        }

        return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
      },
      /**
       * @description 路径编译
       * @param {string} path 路径
       */
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route;
        const toPath = compile(path);

        return toPath(params);
      },
      /**
       * @description 链接处理
       * @param {object} item 路由对象
       */
      handleLink(item) {
        const { redirect, path } = item;

        if (redirect) {
          this.$router.push(redirect);
          return;
        }

        this.$router.push(this.pathCompile(path));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .breadcrumb-container.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }

    ::v-deep {
      .el-breadcrumb__inner a {
        font-weight: 400;
      }
    }
  }
</style>
