/*
 * @Author: chenzl
 * @Date: 2023-01-31 14:16:25
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-10 10:28:50
 * @Description: Enter a description of the current file
 */
import { getUserMenu } from '@/api/user';
import { constantRoutes, errorRoutes } from '@/router';
import Layout from '@/layout';
import Iframe from '@/components/Iframe';

// 导入全部页面
const viewComponents = import.meta.glob('../../views/**/*.vue');

/**
 * @description 加载
 * @param {string} path 路由组件路径
 * @returns 路由组件
 */
const asyncComponents = (path) => {
  return path in viewComponents ? viewComponents[path] : undefined;
};

/**
 * Filter asynchronous routing tables by recursion
 * @param asyncRouterMap asyncRoutes
 */
const filterAsyncRoutes = (asyncRouterMap) => {
  const accessedRouters = asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        // Layout组件
        route.component = Layout;
      } else if (route.component === 'Iframe') {
        // Iframe组件
        route.component = Iframe;
      } else {
        route.component = asyncComponents(`../../${route.component}.vue`); // 导入组件
      }
    }

    if (route.children && route.children.length) {
      route.children = filterAsyncRoutes(route.children);
    }
    return true;
  });

  return accessedRouters;
};

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = [...constantRoutes, ...routes];
  },
};

const actions = {
  // get user menu
  getUserMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserMenu(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject('验证失败，请重新登录');
          }

          const { routes } = data;

          // roles must be a non-empty array
          if (!routes || routes.length <= 0) {
            reject('getUserMenu: routes 必须是非空数组');
          }

          const accessedRoutes = filterAsyncRoutes(routes);
          const allRoutes = accessedRoutes.concat(errorRoutes);

          commit('SET_ROUTES', allRoutes);
          resolve(allRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
