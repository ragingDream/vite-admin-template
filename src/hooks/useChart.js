/*
 * @Author: chenzl
 * @Date: 2026-03-10 10:36:53
 * @LastEditors: chenzl
 * @LastEditTime: 2026-03-10 10:37:04
 * @Description: Enter a description of the current file
 */
import * as echarts from 'echarts';
import { onUnmounted } from 'vue';

export function useChart(elRef, options = {}) {
  let chartInstance = null;
  let resizeObserver = null;

  // 初始化图表
  const initChart = (theme = 'dark') => {
    if (!elRef.value) return;

    if (chartInstance) {
      chartInstance.dispose();
    }

    chartInstance = echarts.init(elRef.value, theme);

    if (options) {
      chartInstance.setOption(options);
    }

    // 监听容器大小变化
    resizeObserver = new ResizeObserver(() => {
      chartInstance && chartInstance.resize();
    });
    resizeObserver.observe(elRef.value);
  };

  // 更新配置
  const setOption = (newOptions, notMerge = false) => {
    if (chartInstance) {
      chartInstance.setOption(newOptions, notMerge);
    }
  };

  // 获取实例
  const getInstance = () => chartInstance;

  // 组件卸载时清理
  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  });

  return {
    initChart,
    setOption,
    getInstance
  };
}
