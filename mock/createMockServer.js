import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 逐一导入您的 mock 文件
// 可以使用 import.meta.glob功能来进行全部导入
import userModule from './user';

export function setupProdMockServer() {
  createProdMockServer([...userModule]);
}
