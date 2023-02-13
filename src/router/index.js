/*
 * @Author: chenzl
 * @Date: 2022-12-20 11:30:45
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-10 09:37:59
 * @Description: 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

/**
 * fix: 修复 router 的 push 与 replace 相同路径跳转的报错问题
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch(() => {});
};

Vue.use(VueRouter);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']           control the page roles (you can set multiple roles)
    title: 'title'                      the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x'        the icon show in the sidebar
    breadcrumb: false                   if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'         if set path, the sidebar will highlight the path you set
    iframeURL: 'http://example.com'     if set URL, can embedded web page(meta siblings component must be 'Iframe')
  }
 */

const { VITE_BASE_URL, VITE_ROUTER_MODE } = import.meta.env;

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/403',
    meta: { title: '403' },
    component: () => import('@/views/403/index'),
    hidden: true,
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('@/views/404/index'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        component: () => import('@/views/home/index'),
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/about',
        name: 'About',
        meta: { title: '关于', icon: 'el-icon-s-custom' },
        component: () => import('@/views/about/index'),
      },
    ],
  },
];

/**
 * errorRoutes
 * 404 page must be placed at the end !!!
 */
export const errorRoutes = [{ path: '*', name: 'ErrorPage', redirect: '/404', hidden: true }];

const createRouter = () =>
  new VueRouter({
    base: VITE_BASE_URL,
    mode: VITE_ROUTER_MODE,
    routes: constantRoutes,
    scrollBehavior() {
      return {
        y: 0,
        behavior: 'smooth',
      };
    },
  });

// 创建 touter 实例
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter();

  router.matcher = newRouter.matcher; // reset router
};

export default router;
