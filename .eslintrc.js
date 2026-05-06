/*
 * @Author: chenzl
 * @Date: 2026-03-09 15:38:53
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-09 16:55:50
 * @Description: Enter a description of the current file
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn'
  }
};
