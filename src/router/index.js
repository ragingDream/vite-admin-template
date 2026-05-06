/*
 * @Author: chenzl
 * @Date: 2026-03-09 15:36:15
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-10 17:00:12
 * @Description: Enter a description of the current file
 */
import { createRouter, createWebHistory } from 'vue-router';
import { setupRouterGuards } from './guards'; // 引入守卫

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录页' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', requiresAuth: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 安装路由守卫
setupRouterGuards(router);

export default router;
