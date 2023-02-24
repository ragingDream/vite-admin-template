# vue2-vite3-admin

## 简介

[vue2-vite3-admin](https://github.com/ragingDream/vite-admin-template/tree/vue2) 是基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 改造的一个后台前端解决方案。它使用 vue2.7、vite3 和 element-ui 实现，内置了 i18n
国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。

## 功能

```bash
- 登录 / 注销

- 权限验证
  - 页面权限
  - 权限配置

- 多环境发布
  - dev
  - test
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - Svg Sprite 图标
  - 本地/后端 mock 数据

- 错误页面
  - 403
  - 404

- Home
- About
- ECharts 图表
- CountTo
- Clipboard(剪贴复制)
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动服务
npm run dev
```

浏览器访问 <http://localhost:5173>

## 发布

```bash
# 构建生产环境
npm run build

# 构建测试环境
npm run build:test
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run build:report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix

# 样式格式检查
npm run stylelint

# 样式格式检查并自动修复
npm run stylelint -- --fix
```
