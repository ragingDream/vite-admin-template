/*
 * @Author: chenzl
 * @Date: 2023-01-31 14:16:37
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-02 09:37:35
 * @Description: Enter a description of the current file
 */
const getters = {
  layout: (state) => state.app.layout,
  sidebar: (state) => state.app.sidebar,
  settings: (state) => state.app.settings,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  routes: (state) => state.permission.routes,
};
export default getters;
