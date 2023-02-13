/*
 * @Author: chenzl
 * @Date: 2023-01-31 14:33:36
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-08 14:12:21
 * @Description: Enter a description of the current file
 */
import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';
import { getPageTitle } from '@/utils';
import { getToken } from '@/utils/auth'; // get token from cookie
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

// 路由白名单
const whiteList = ['/login']; // no redirect whitelist

// 进度条设置
NProgress.configure({ showSpinner: false });

// router 跳转前
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['user']
          await store.dispatch('user/getUserInfo');

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/getUserMenu');

          // dynamically add accessible routes
          accessRoutes.forEach((item) => {
            router.addRoute(item);
          });

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

// router 跳转后
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
