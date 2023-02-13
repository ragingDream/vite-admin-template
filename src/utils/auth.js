/*
 * @Author: chenzl
 * @Date: 2023-01-06 16:08:40
 * @LastEditors: chenzl
 * @LastEditTime: 2023-01-31 16:31:59
 * @Description: 令牌相关
 */
import Cookies from 'js-cookie';

const TokenKey = 'token';

/**
 * @description 获取 token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * @description 设置 token
 * @param {string} token 令牌
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 * @description 清除 token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
