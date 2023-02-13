/*
 * @Author: chenzl
 * @Date: 2023-01-13 10:14:23
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-10 10:34:15
 * @Description: 校验方法合集
 */
/**
 * @description 是否是外链
 * @param {string} path 链接路径
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
