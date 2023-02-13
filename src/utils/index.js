/*
 * @Author: chenzl
 * @Date: 2023-01-05 10:06:47
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-06 11:03:50
 * @Description: Enter a description of the current file
 */
import dayjs from 'dayjs';
import FileSaver from 'file-saver';

/**
 * @description 获取原始类型
 * @param {date / string} date 日期
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export const getRawType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

/**
 * @description 获取页面标题
 * @param {string} pageTitle 页面标题
 * @returns {String}
 */
export const getPageTitle = (pageTitle) => {
  const title = import.meta.env.VITE_APP_TITLE;

  return `${title}${pageTitle ? ` - ${pageTitle}` : ''}`;
};

/**
 * @description 格式化日期
 * @param {date / string} date 日期
 * @param {string} formatType 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 */
export const formatTime = (date, formatType = 'YYYY-MM-DD HH:mm:ss') => {
  return date ? dayjs(date).format(formatType) : null;
};

/**
 * @description 下载文件
 * @param {Blob | File | Ur} data 待下载的文件
 * @param {string} fileName 保存的文件名
 */
export const downloadFile = (data, fileName = new Date().getTime()) => {
  FileSaver.saveAs(data, fileName);
};

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }

  let classString = element.className;
  const nameIndex = classString.indexOf(className);

  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}
