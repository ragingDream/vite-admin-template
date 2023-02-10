<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <MenuLink v-if="onlyOneChild.meta" :item="onlyOneChild" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <MenuItem
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </MenuLink>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <MenuItem
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="generateTitle(item.meta.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path-browserify';
  import { generateTitle } from '@/utils/i18n';
  import { isExternal } from '@/utils/validate';
  import MenuItem from './MenuItem';
  import MenuLink from './MenuLink';

  export default {
    name: 'SidebarItem',
    components: { MenuItem, MenuLink },
    props: {
      // route object
      item: {
        type: Object,
        required: true,
      },
      isNest: {
        type: Boolean,
        default: false,
      },
      basePath: {
        type: String,
        default: '',
      },
    },
    data() {
      this.onlyOneChild = null;
      return {};
    },
    methods: {
      /**
       * @description 是否显示单个子元素
       * @param {array} children 子元素数组
       * @param {object} parent 父元素
       */
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter((item) => {
          if (item.hidden) {
            return false;
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item;
            return true;
          }
        });
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }
        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
          return true;
        }
        return false;
      },
      /**
       * @description 解析路径
       * @param {string} routePath 路由路径
       */
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
      },
      generateTitle,
    },
  };
</script>
