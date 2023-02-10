/*
 * @Author: chenzl
 * @Date: 2022-12-15 15:02:29
 * @LastEditors: chenzl
 * @LastEditTime: 2023-01-05 15:11:59
 * @Description: prettier 配置
 */
module.exports = {
  printWidth: 100, // 指定将换行的行长
  tabWidth: 2, // 定每个缩进级别的空格数
  useTabs: false, // 使用空格缩进行而不是制表符
  semi: true, // 在语句的末尾打印分号
  vueIndentScriptAndStyle: true, // 是否缩进 Vue 文件中 <script> 和 <style> 标记内的代码
  singleQuote: true, // 使用单引号而不是双引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 在对象文字中的括号之间打印空格
  trailingComma: 'es5', // 在 ES5 中有效的尾随逗号
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 单独放在下一行
  jsxSingleQuote: false, // 在 JSX 中使用双引号而不是单引号
  arrowParens: 'always', // 箭头函数的参数始终包含括号
  insertPragma: false, // 禁止在文件顶部插入一个特殊的 @format 标记，指定文件已使用 Prettier 格式化
  requirePragma: false, // 禁止在文件顶部插入一个特殊的 @prettier 标记，指定文件已使用 Prettier 格式化
  proseWrap: 'never', // 从不更改 markdown 文本中的换行
  htmlWhitespaceSensitivity: 'strict', // 指定 HTML、Vue、Angular 和 Handlebars 的全局空格敏感性 - 所有标签周围的空白（或没有空白）被认为是重要的
  endOfLine: 'lf', // 使用(\n)进行换行
  rangeStart: 0, // 格式化文件的起始位置
  rangeEnd: Infinity, // 格式化文件的结束位置，默认为 'Infinity'
};
