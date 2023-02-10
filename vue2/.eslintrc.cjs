/*
 * @Author: chenzl
 * @Date: 2022-12-15 14:31:55
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-07 17:08:48
 * @Description: eslint 配置
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  globals: {
    __APP_INFO__: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // 关闭 eslint 与 prettier 的冲突报错
    'prettier/prettier': 'off',

    // 禁止使用已弃用的 $listeners (in Vue.js 3.0.0+)
    'vue/no-deprecated-dollar-listeners-api': 'off',

    // 禁止使用已弃用的 functional 模板功能 (in Vue.js 3.0.0+)
    'vue/no-deprecated-functional-template': 'off',

    // 禁止使用已弃用的 .native 修饰符 (in Vue.js 3.0.0+)
    'vue/no-deprecated-v-on-native-modifier': 'off',

    // 要求组件名称始终是多个单词
    'vue/multi-word-component-names': 'off',
  },
};
