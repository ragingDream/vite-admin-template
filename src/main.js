/*
 * @Author: chenzl
 * @Date: 2022-12-15 11:28:33
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-09 16:53:55
 * @Description: 项目入口文件
 */
import Vue from 'vue';
import Element from 'element-ui';
import router from '@/router';
import store from '@/store';
import i18n from '@/locales';
import SvgIcon from '@/components/SvgIcon';
import App from './App';
import '@/router/permission';
import 'virtual:svg-icons-register';
import 'virtual:windi.css';
import '@/assets/styles/index.scss';

Vue.use(Element);
Vue.component('svg-icon', SvgIcon);

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
