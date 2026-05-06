<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useChart } from '@/hooks/useChart';

const props = defineProps({
  // 图表配置
  option: {
    type: Object,
    required: true
  },
  // 宽度
  width: {
    type: String,
    default: '100%'
  },
  // 高度
  height: {
    type: String,
    default: '400px'
  },
  // 主题: 'dark' 或 'light'
  theme: {
    type: String,
    default: 'dark'
  }
});

const emit = defineEmits(['chart-ready']);

const chartRef = ref(null);
const { initChart, setOption, getInstance } = useChart(chartRef);

// 监听配置变化
watch(
  () => props.option,
  newVal => {
    if (newVal) {
      setOption(newVal);
    }
  },
  { deep: true }
);

onMounted(() => {
  initChart(props.theme);
  setOption(props.option);
  emit('chart-ready', getInstance());
});
</script>
