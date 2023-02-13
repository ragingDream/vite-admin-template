/*
 * @Author: chenzl
 * @Date: 2023-01-06 15:31:59
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-01 10:00:48
 * @Description: 用户相关
 */
import { get, post } from '@/utils/request';

// 登录
const login = (data) => {
  return post('/user/login', data);
};

// 获取用户信息
const getUserInfo = () => {
  return get('/user/getUserInfo');
};

// 获取用户菜单
const getUserMenu = () => {
  return get('/user/getUserMenu');
};

// 登出
const logout = (data) => {
  return post('/user/logout', data);
};

export { login, getUserInfo, getUserMenu, logout };
