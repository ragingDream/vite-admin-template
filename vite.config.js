/*
 * @Author: chenzl
 * @Date: 2022-12-15 13:42:52
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-20 16:04:32
 * @Description: vite 配置
 */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import dayjs from 'dayjs';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import WindiCSS from 'vite-plugin-windicss';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }) => {
  // 项目配置
  const {
    VITE_APP_TITLE,
    VITE_PORT,
    VITE_BASE_URL,
    VITE_MOCK,
    VITE_ASSETS_DIR,
    VITE_OUT_DIR,
    VITE_GZIP_COMPRESSION,
  } = loadEnv(mode, process.cwd());

  // 不是 development 命令
  const noDev = command !== 'serve';

  // 是 build 命令
  const isBuild = command === 'build';

  console.log();

  // vite 插件
  const vitePlugins = [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          title: VITE_APP_TITLE,
        },
      },
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
    viteMockServe({
      // mock 文件的存储文件夹
      mockPath: 'mock',

      // 本地环境是否开启 mock
      localEnabled: VITE_MOCK,

      // 生产环境是否开启
      prodEnabled: noDev && VITE_MOCK,

      // 注入 mock 服务
      injectCode: `
        import { setupProdMockServer } from '../mock/createMockServer';
        setupProdMockServer();
      `,
    }),
    WindiCSS(),
    viteCompression({
      // 是否开启 gzip 压缩
      disable: !(isBuild && VITE_GZIP_COMPRESSION),

      // 超过 50 kb 才压缩
      threshold: 50 * 1024,
    }),
  ];

  // 是否启用 rollup-plugin-visualizer 依赖分析插件
  // ! 需放在插件的最后一位
  if (isBuild && mode === 'report') {
    vitePlugins.push(
      visualizer({
        // 生成的图表文件名称
        filename: 'report.html',

        // 是否在默认用户代理中打开生成的文件
        open: true,
      })
    );
  }

  return defineConfig({
    // 公共基础路径
    base: VITE_BASE_URL,

    // 打包构建选项
    build: {
      // 指定生成静态资源的存放路径（相对于 build.outDir）
      assetsDir: VITE_ASSETS_DIR,

      // 规定触发警告的 chunk 大小（以 kbs 为单位）
      chunkSizeWarningLimit: 1024,

      // 指定输出路径（相对于 项目根目录)
      outDir: VITE_OUT_DIR,

      // 禁用 gzip 压缩大小
      reportCompressedSize: false,

      // chunk 分块策略
      rollupOptions: {
        output: {
          // 静态资源文件名
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

          // chunk 文件名
          chunkFileNames: 'static/js/[name]-[hash].js',

          // 入口文件名
          entryFileNames: 'static/js/[name].js',

          // 手动分割 chunk
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'vue-i18n', 'vuex'],
            'echart-vendor': ['echarts'],
            'ui-vendor': ['element-ui'],
            'utils-vendor': [
              'axios',
              'clipboard',
              'dayjs',
              'file-saver',
              'js-cookie',
              'lodash-es',
              'nprogress',
              'path-browserify',
              'path-to-regexp',
            ],
          },
        },
      },

      // 设置最终构建的浏览器兼容目
      target: 'es2015',
    },

    // css 配置选项
    css: {
      // 预处理器的选项
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";`,
          exclude: 'node_modules',
        },
      },
    },

    // 全局常量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    // 编译配置
    esbuild: {
      // 生产环境，删除 console 与 debugger
      drop: isBuild ? ['console', 'debugger'] : [],
    },

    // vite 插件
    plugins: vitePlugins,

    // 解构配置
    resolve: {
      // 路径别名
      alias: {
        '~': path.resolve(__dirname, './node_modules'),
        '@': path.resolve(__dirname, './src'),
      },

      // 省略的扩展名列表
      extensions: ['.js', '.json', '.vue'],
    },

    // 开发服务器选项
    server: {
      // 是否允许跨域
      cors: true,

      // 监听的 IP 地址
      host: true,

      // 是否开启 https
      https: false,

      // 启动时自动打开浏览器
      open: true,

      // 端口
      port: VITE_PORT,

      // 代理配置
      proxy: {
        // '/api': {
        //   target: 'http://api.vite-admin.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // },
      },
      // 若端口已被占用则会直接退
      strictPort: true,
    },
  });
};
