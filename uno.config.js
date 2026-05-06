/*
 * @Author: chenzl
 * @Date: 2026-03-09 15:34:04
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-09 16:07:43
 * @Description: Enter a description of the current file
 */
import { presetWind3 } from '@unocss/preset-wind3';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [presetWind3()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center'
  }
});
