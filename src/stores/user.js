// src/stores/user.js
import { getUserInfo, logoutApi } from '@/api/user'; // 引入 API
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // --- 状态 ---
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref(null); // 新增：存储用户信息 (昵称、头像等)

  // --- 动作 ---

  // 1. 设置 Token
  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  // 2. 获取用户信息
  async function fetchUserInfo() {
    try {
      const res = await getUserInfo();
      userInfo.value = res.data; // 假设后端返回的数据在 data 字段里
      return res.data;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error; // 抛出错误，让路由守卫处理
    }
  }

  // 3. 退出登录 (完善版)
  async function logout() {
    try {
      // 如果后端有退出接口，先调用一下
      await logoutApi();
    } catch (e) {
      // 即使接口报错，也要执行本地退出
    } finally {
      // 清空本地数据
      token.value = '';
      userInfo.value = null;
      localStorage.removeItem('token');
    }
  }

  // 4. 重置 Store (可选)
  function resetStore() {
    token.value = '';
    userInfo.value = null;
  }

  return {
    token,
    userInfo,
    setToken,
    fetchUserInfo,
    logout,
    resetStore
  };
});
