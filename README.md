# 现代化前端管理系统模板

基于 Vite + Vue3 构建的企业级前端项目模板，集成了完整的工程化配置、权限管理、数据可视化大屏等功能。

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| **Vue** | ^3.5.25 | 渐进式 JavaScript 框架 |
| **Vite** | ^8.0.0-beta.13 | 新一代前端构建工具 |
| **Pinia** | ^3.0.4 | Vue 官方状态管理库 |
| **Vue Router** | ^4.6.4 | Vue 官方路由管理器 |
| **Element Plus** | ^2.13.5 | 基于 Vue 3 的企业级组件库 |
| **@element-plus/icons-vue** | ^2.3.2 | Element Plus 官方图标库 |
| **UnoCSS** | ^66.6.6 | 高性能原子化 CSS 引擎 |
| **Axios** | ^1.13.6 | 通用 HTTP 请求库 |
| **ECharts** | ^6.0.0 | 数据可视化图表库 |
| **Day.js** | ^1.11.19 | 轻量级日期处理库 |
| **FileSaver** | ^2.0.5 | 文件下载工具库 |
| **NProgress** | ^0.2.0 | 页面加载进度条 |

### 开发工具

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| **Prettier** | ^3.8.1 | 代码格式化工具 |
| **ESLint** | ^10.0.3 | 代码质量检测工具 |
| **eslint-config-prettier** | ^10.1.8 | ESLint 与 Prettier 集成配置 |
| **eslint-plugin-prettier** | ^5.5.5 | Prettier 作为 ESLint 规则运行 |
| **eslint-plugin-vue** | ^10.8.0 | Vue 代码 ESLint 插件 |
| **Less** | ^4.5.1 | CSS 预处理器 |
| **unplugin-auto-import** | ^21.0.0 | 自动导入 API 插件 |
| **unplugin-vue-components** | ^31.0.0 | 自动注册 Vue 组件插件 |
| **vite-plugin-compression** | ^0.5.1 | Vite 压缩插件 |
| **rollup-plugin-visualizer** | ^7.0.1 | 打包体积分析插件 |

## ✨ 功能特性

### 1. 工程化配置

- ✅ Vite 极速开发体验
- ✅ Prettier 代码格式化 (强制分号)
- ✅ 路径别名 `@` 配置

### 2. UI 与图标

- ✅ Element Plus 组件库集成
- ✅ Element Plus 图标全局注册
- ✅ UnoCSS 原子化 CSS 支持 (含 shortcuts 封装)

### 3. 状态管理与路由

- ✅ Pinia 全局状态管理 (用户 Token/信息存储)
- ✅ Vue Router 路由守卫
- ✅ 白名单路由配置
- ✅ 404 页面自动拦截
- ✅ 支持 URL 携带 Token 自动登录

### 4. 网络请求 (Axios 深度封装)

- ✅ 统一的请求/响应拦截器
- ✅ 智能错误弹窗去重 (5秒内相同错误不重复提示)
- ✅ 错误分流处理 (401/403/404/500)
- ✅ 文件下载 (`responseType: 'blob'`) 支持
- ✅ 支持自定义 `useResponseFileName` 自动解析文件名

### 5. 数据可视化

- ✅ ECharts 通用 Hooks 封装
- ✅ ECharts 通用组件封装
- ✅ 支持 `dark`/`light` 主题切换
- ✅ 容器大小自适应 (ResizeObserver)
- ✅ 数据变化自动更新图表

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码格式化

```bash
npm run format
```

## 📁 项目结构

```plaintext
src
├── api/                  # API 接口层
│   └── user.js           # 用户相关接口
├── assets/               # 静态资源
├── components/           # 公共组件
│   └── BaseChart.vue     # ECharts 通用图表组件
├── hooks/                # 组合式函数
│   └── useChart.js       # ECharts 逻辑封装
├── router/               # 路由配置
│   └── index.js          # 路由守卫与配置
├── stores/               # Pinia 状态管理
│   └── user.js           # 用户状态
├── styles/               # 全局样式
│   └── index.less        # 样式入口与 UnoCSS shortcuts
├── utils/                # 工具函数
│   └── request.js        # Axios 请求封装
├── views/                # 页面视图
│   ├── Home.vue          # 首页
│   ├── Login.vue         # 登录页
│   └── 404.vue           # 404 页
├── App.vue               # 根组件
└── main.js               # 应用入口
```

## 🔧 环境变量

在根目录下创建 .env.development、.env.staging、.env.production 文件：

```env
# .env.development 示例
VITE_APP_TITLE = 管理系统
VITE_APP_BASE_API = /api
```

## 📝 License

```plaintext
MIT
```
