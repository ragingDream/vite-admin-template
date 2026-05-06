/*
 * @Author: chenzl
 * @Date: 2026-03-09 10:59:14
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-10 15:05:24
 * @Description: Enter a description of the current file
 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'element-plus/dist/index.css';
import 'virtual:uno.css'; // 引入 UnoCSS
import './styles/index.less';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.mount('#app');
