/*
 * @Author: chenzl
 * @Date: 2023-02-08 16:21:15
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-08 16:39:17
 * @Description: Enter a description of the current file
 */
const svgModules = import.meta.glob('@/assets/icons/*.svg');
const svgIcons = [];

Object.keys(svgModules).forEach((i) => {
  const fileName = i.replace(/(.*\/)*([^.]+).*/gi, '$2');

  svgIcons.push(fileName);
});

export default svgIcons;
