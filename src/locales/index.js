/*
 * @Author: chenzl
 * @Date: 2022-12-20 10:13:07
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-09 08:36:40
 * @Description: 国际化配置
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { localeLang } from '@/store/modules/app';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import zh from './zh-CN'; // 中文语言包
import en from './en'; // 英文语言包

Vue.use(VueI18n);

// 实例化I18n
const i18n = new VueI18n({
  locale: localeLang, // 初始化配置语言
  messages: {
    zh: {
      ...zhLocale,
      ...zh,
    },
    en: {
      ...enLocale,
      ...en,
    },
  },
});

// element-ui 国际化
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
