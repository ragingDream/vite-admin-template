/*
 * @Author: chenzl
 * @Date: 2023-02-02 08:46:44
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-09 08:37:50
 * @Description: Enter a description of the current file
 */

const localeLang = 'zh';
const state = {
  language: localeLang, // 默认语言

  // 布局设置
  layout: {
    theme: '#409EFF', // 主题色
    predefineTheme: [
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ], // 预设主题色
    mode: 'left', // 布局模式， top | left
    isShowSettingsBtn: true, // 是否显示设置按钮
    isFixedHeader: true, // 是否固定 header
    isShowFooter: true, // 是否显示 footer
    isShowLogo: true, // 侧边栏是否显示 logo
  },

  // 侧边栏设置
  sidebar: {
    isCollapse: false, // 侧边栏是否折叠
    uniqueOpened: true, // 侧边栏是否开启手风琴模式
    menuTextColor: '#bfcbd9', // 菜单文字颜色
    menuActiveTextColor: '#409eff', // 菜单选中文字颜色
    menuBackgroundColor: '#304156', // 菜单背景色
    menuHoverBackgroundColor: '#263445', // 菜单 hover 背景色
    subMenuBackgroundColor: '#1f2d3d', // 子菜单背景色
    subMenuHoverBackgroundColor: '#001528', // 子菜单 hover 背景色
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.isCollapse = !state.sidebar.isCollapse;
  },
  CHANGE_SETTING: (state, { type, key, value }) => {
    if (type in state) {
      state[type][key] = value;
    }
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
  },
};

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
};

export { localeLang };
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
