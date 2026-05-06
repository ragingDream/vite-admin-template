<template>
  <div ref="containerRef" class="scale-screen-container" :style="{ backgroundColor: bgColor }">
    <div
      class="scale-screen-content"
      :style="{
        width: `${designWidth}px`,
        height: `${designHeight}px`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }"
    >
      <!-- 插槽：放置你的大屏内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  /**
   * 设计稿宽度 (单位：px)
   */
  designWidth: {
    type: Number,
    default: 1920
  },
  /**
   * 设计稿高度 (单位：px)
   */
  designHeight: {
    type: Number,
    default: 1080
  },
  /**
   * 背景色
   */
  bgColor: {
    type: String,
    default: '#000000'
  },
  /**
   * 窗口 resize 防抖延迟 (单位：ms)
   */
  delay: {
    type: Number,
    default: 200
  }
});

const containerRef = ref(null);
const scale = ref(1);
let resizeTimer = null;

// 核心计算缩放比例
const calculateScale = () => {
  if (!containerRef.value) return;

  const containerWidth = containerRef.value.clientWidth;
  const containerHeight = containerRef.value.clientHeight;

  // 防止容器宽高为 0 导致计算错误
  if (!containerWidth || !containerHeight) return;

  // 计算宽高缩放比，取较小值以保证完整显示在屏幕内
  const scaleX = containerWidth / props.designWidth;
  const scaleY = containerHeight / props.designHeight;

  scale.value = Math.min(scaleX, scaleY);
};

// 防抖处理
const debounceCalculate = () => {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    calculateScale();
  }, props.delay);
};

onMounted(() => {
  // 初始化计算一次
  calculateScale();
  // 监听窗口变化
  window.addEventListener('resize', debounceCalculate);
});

onUnmounted(() => {
  // 清理事件监听和定时器
  window.removeEventListener('resize', debounceCalculate);
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
});
</script>

<style scoped>
.scale-screen-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scale-screen-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center; /* 从中心开始缩放 */
  overflow: hidden;
  transition: transform 0.3s ease;
}
</style>
