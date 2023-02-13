/*
 * @Author: chenzl
 * @Date: 2022-12-15 13:42:52
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-10 16:36:02
 * @Description: vite 配置
 */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import dayjs from 'dayjs';
import WindiCSS from 'vite-plugin-windicss';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }) => {
  const { VITE_PORT, VITE_BASE_URL, VITE_MOCK, VITE_PUBLIC_DIR, VITE_ASSETS_DIR, VITE_OUT_DIR } =
    loadEnv(mode, process.cwd());
  const noDev = command !== 'serve';
  const isBuild = command === 'build';

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
          // chunk 文件名
          chunkFileNames: 'static/js/[name]-[hash].js',

          // 入口文件名
          entryFileNames: 'static/js/[name]-[hash].js',

          // 静态资源文件名
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

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
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: VITE_MOCK,
        prodEnabled: noDev && VITE_MOCK,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../mock/createMockServer';
          setupProdMockServer();
        `,
      }),
      WindiCSS(),
      visualizer(),
    ],

    // 静态资源服务的文件夹
    publicDir: VITE_PUBLIC_DIR,

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
