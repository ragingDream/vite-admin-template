/*
 * @Author: chenzl
 * @Date: 2026-03-10 09:36:58
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-10 17:18:35
 * @Description: Enter a description of the current file
 */
import dayjs from 'dayjs';
import FileSaver from 'file-saver';

/**
 * @description 获取原始类型
 * @param {any} value 值
 * @returns {string} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export const getRawType = value => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

/**
 * @description 格式化日期
 * @param {date / string} date 日期
 * @param {string} formatType 日期格式，默认为 YYYY-MM-DD HH:mm:ss
 */
export const formatTime = (date, formatType = 'YYYY-MM-DD HH:mm:ss') => {
  return date ? dayjs(date).format(formatType) : null;
};

/**
 * @description 下载文件
 * @param {Blob | File | Url} data 待下载的文件
 * @param {string} fileName 保存的文件名
 */
export const downloadFile = (data, fileName) => {
  FileSaver.saveAs(data, fileName);
};

/**
 * @description 简单深克隆
 * @param {any} val 仅处理请求参数常用类型：Object/Array/Date/RegExp
 */
export const simpleDeepClone = val => {
  if (val === null || typeof val !== 'object') return val;
  if (val instanceof Date) return new Date(val.getTime());
  if (val instanceof RegExp) return new RegExp(val.source, val.flags);

  const clone = Array.isArray(val) ? [] : {};
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      clone[key] = simpleDeepClone(val[key]);
    }
  }
  return clone;
};
