/*
 * @Author: chenzl
 * @Date: 2023-01-31 14:14:41
 * @LastEditors: chenzl
 * @LastEditTime: 2023-01-31 14:17:34
 * @Description: Enter a description of the current file
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
  },
  getters,
});

export default store;
