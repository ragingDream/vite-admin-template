/*
 * @Author: chenzl
 * @Date: 2023-01-16 16:06:18
 * @LastEditors: chenzl
 * @LastEditTime: 2023-01-28 17:25:17
 * @Description: Windi CSS 配置：https://windicss.org/utilities/general/colors.html
 */
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  // 别名
  alias: {
    'app-bg': 'bg-gray-200 hover:bg-dark-300',
  },

  // 开启属性模式编写
  attributify: {
    prefix: 'w:',
  },
});
