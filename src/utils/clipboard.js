/*
 * @Author: chenzl
 * @Date: 2023-02-08 16:42:08
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-10 10:32:59
 * @Description: Enter a description of the current file
 */
import Vue from 'vue';
import Clipboard from 'clipboard';

/**
 * @description 复制成功
 */
const clipboardSuccess = () => {
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500,
  });
};

/**
 * @description 复制失败
 */
const clipboardError = () => {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error',
  });
};

/**
 * @description 复制剪贴板处理器
 * @param {string} text 复制文本
 * @param {object} event 事件对象
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });

  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.destroy();
  });

  clipboard.on('error', () => {
    clipboardError();
    clipboard.destroy();
  });

  clipboard.onClick(event);
}
