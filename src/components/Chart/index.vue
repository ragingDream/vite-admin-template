<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
  import * as echarts from 'echarts';
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
