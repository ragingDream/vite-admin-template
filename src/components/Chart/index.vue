<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core';
  // 引入常用图表，图表后缀都为 Chart
  import { BarChart, LineChart, RadarChart, PieChart, MapChart, GaugeChart } from 'echarts/charts';
  // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  // 注册必须的组件
  echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    RadarChart,
    PieChart,
    MapChart,
    GaugeChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  import resize from './mixins/resize';

  export default {
    name: 'Chart',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart',
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '350px',
      },
      autoResize: {
        type: Boolean,
        default: true,
      },
      chartOptions: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        chart: undefined, // 图标示例对象
      };
    },
    watch: {
      chartOptions: {
        deep: true,
        handler(val) {
          this.chart.clear();
          this.setOptions(val);
        },
      },
    },
    mounted() {
      this.chartOptions && this.initChart();
    },
    beforeUnmount() {
      if (!this.chart) {
        return false;
      }

      this.chart.dispose();
      this.chart = undefined;
    },
    methods: {
      /**
       * @description 初始化图表
       */
      initChart() {
        this.chart = echarts.init(this.$el);
        this.setOptions(this.chartOptions);
      },
      /**
       * @description 设置图表配置
       * @param {object} options 配置参数
       */
      setOptions(options) {
        this.chart.setOption(options);
      },
    },
  };
</script>
