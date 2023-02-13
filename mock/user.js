const tokens = {
  admin: {
    token: 'admin-token',
  },
  user: {
    token: 'user-token',
  },
};
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'user-token': {
    roles: ['user'],
    introduction: 'I am an user',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
    name: 'Normal User',
  },
};
const asyncRoutes = [
  {
    path: '/icons',
    component: 'Layout',
    children: [
      {
        path: '/icons',
        component: 'views/icons/index',
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon' },
      },
    ],
  },

  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: { title: '菜单嵌套', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index',
        name: 'Menu1',
        meta: { title: 'Menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            redirect: '/nested/menu1/menu1-3/menu1-3-1',
            meta: { title: 'Menu1-3' },
            children: [
              {
                path: 'menu1-3-1',
                component: 'views/nested/menu1/menu1-3/menu1-3-1/index',
                name: 'Menu1-3-1',
                meta: { title: 'Menu1-3-1' },
              },
              {
                path: 'menu1-3-2',
                component: 'views/nested/menu1/menu1-3/menu1-3-2/index',
                name: 'Menu1-3-2',
                meta: { title: 'Menu1-3-2' },
              },
            ],
          },
        ],
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'Menu2' },
      },
    ],
  },

  {
    path: '/theme',
    component: 'Layout',
    children: [
      {
        path: '/theme',
        component: 'views/theme/index',
        name: 'Theme',
        meta: { title: '主题', icon: 'theme' },
      },
    ],
  },

  {
    path: '/i18n',
    component: 'Layout',
    children: [
      {
        path: '/i18n',
        component: 'views/i18n/index',
        name: 'I18n',
        meta: { title: '国际化', icon: 'international' },
      },
    ],
  },

  {
    path: '/docs',
    component: 'Layout',
    children: [
      {
        path: '/docs',
        component: 'Iframe',
        meta: {
          title: '帮助文档',
          icon: 'el-icon-bangzhu',
          iframeURL: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
        },
      },
    ],
  },

  {
    path: '/external-link',
    component: 'Layout',
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: '外链', icon: 'el-icon-link' },
      },
    ],
  },
];
const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: asyncRoutes,
  },
  {
    key: 'user',
    name: 'user',
    description: 'Just a Normal User. Can only see the home page and the external link',
    routes: [
      {
        path: '/external-link',
        component: 'Layout',
        children: [
          {
            path: 'https://github.com/PanJiaChen/vue-element-admin',
            meta: { title: '外链', icon: 'el-icon-link' },
          },
        ],
      },
    ],
  },
];

export default [
  // user login
  {
    url: '/user/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username } = body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 'I000005',
          data: null,
          msg: '账号或密码错误',
        };
      }

      return {
        code: 'I000000',
        data: token,
        msg: '登录成功',
      };
    },
  },

  // get user info
  {
    url: '/user/getUserInfo',
    method: 'get',
    response: (config) => {
      const { token } = config.headers;
      const userInfo = users[token];

      // mock error
      if (!userInfo) {
        return {
          code: 'I000006',
          data: null,
          msg: '登录失败，无法获取用户详细信息',
        };
      }

      return {
        code: 'I000000',
        data: userInfo,
        msg: '获取用户信息成功',
      };
    },
  },

  // get user menu
  {
    url: '/user/getUserMenu',
    method: 'get',
    response: (config) => {
      const { token } = config.headers;
      const rolesItem = roles.find((item) => token.includes(item.key));

      // mock error
      if (!rolesItem) {
        return {
          code: 'I000006',
          data: null,
          msg: '登录失败，无法获取用户菜单信息',
        };
      }

      return {
        code: 'I000000',
        data: rolesItem,
        msg: '获取用户信息成功',
      };
    },
  },

  // user logout
  {
    url: '/user/logout',
    timeout: 200,
    method: 'post',
    response: () => {
      return {
        code: 'I000000',
        data: null,
        msg: '登出成功',
      };
    },
  },
];
