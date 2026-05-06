/*
 * @Author: chenzl
 * @Date: 2026-03-10 16:56:17
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-10 17:00:41
 * @Description: Enter a description of the current file
 */
import { useUserStore } from '@/stores/user';
import NProgress from 'nprogress';
const { VITE_APP_TITLE } = import.meta.env;

// 路由白名单 (不需要登录就能访问的页面)
const whiteList = ['/login', '/404'];

export function setupRouterGuards(router) {
  // 前置路由守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start(); // 开启进度条

    // 动态设置页面标题
    document.title = to.meta.title ? `${to.meta.title} - ${VITE_APP_TITLE}` : VITE_APP_TITLE;

    const userStore = useUserStore();
    const urlToken = to.query.token;

    // 检测并保存 URL 中的 Token
    urlToken && userStore.setToken(urlToken);

    if (userStore.token) {
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        // if (!userStore.userInfo) {
        //   try {
        //     // 如果没有用户信息，发起请求获取
        //     await userStore.fetchUserInfo();
        //     next(); // 获取成功，放行
        //   } catch (error) {
        //     // 获取失败 (可能 Token 过期)，强制退出
        //     await userStore.logout();
        //     ElMessage.error('登录已过期，请重新登录');
        //     next(`/login?redirect=${to.fullPath}`);
        //   }
        // } else {
        //   // 已经有用户信息了，直接放行
        //   next();
        // }
        next();
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
      }
    }
  });

  // 后置路由守卫
  router.afterEach(() => {
    NProgress.done(); // 结束进度条
  });
}
