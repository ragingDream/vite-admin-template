/*
 * @Author: chenzl
 * @Date: 2026-03-09 10:59:14
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-09 16:56:11
 * @Description: Enter a description of the current file
 */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import unoConfig from './uno.config.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取当前环境的配置文件变量
  const env = loadEnv(mode, process.cwd());

  return {
    // 配置路径别名 @ 代表 src
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },

    plugins: [
      vue(),

      // UnoCSS 原子化 CSS 引擎
      UnoCSS(unoConfig),

      // 自动导入 Vue API (ref, reactive 等) 和 Element Plus 组件
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true // 解决 ESLint 报错
        }
      }),

      // 自动注册 Element Plus 组件
      Components({
        resolvers: [ElementPlusResolver()]
      }),

      // 打包分析插件 (只有执行 build 命令时才会生成)
      visualizer({
        open: true, // 自动打开分析页面
        filename: 'dist/stats.html'
      }),

      // Gzip 压缩打包产物
      viteCompression()
    ],

    // 开发服务器配置
    server: {
      port: 3000,
      open: true,
      // 配置代理解决跨域 (开发环境用)
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_TARGET_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    },

    // 打包优化配置
    build: {
      // 清除 console 和 debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 代码分割策略
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'element-plus': ['element-plus']
          }
        }
      }
    }
  };
});
