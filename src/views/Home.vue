<template>
  <ScaleScreen bg-color="#1f2937">
    <div class="p-10">
      <h1 class="text-3xl font-bold text-blue-600 mb-4">🎉 恭喜，项目搭建成功！</h1>
      <p class="mb-4">欢迎来到首页，这里是受保护的路由，没有 Token 会被拦截回登录页。</p>
      <el-button type="danger" @click="logout">退出登录</el-button>
    </div>

    <div class="p-4">
      <!-- 基础用法 -->
      <el-icon><Edit /></el-icon>
      <el-icon><Delete /></el-icon>
      <el-icon><Search /></el-icon>

      <!-- 控制大小 -->
      <el-icon :size="20"><User /></el-icon>
      <el-icon :size="30"><Setting /></el-icon>

      <!-- 控制颜色 (通过 color 属性或 CSS) -->
      <el-icon color="#409EFF"><SuccessFilled /></el-icon>
      <el-icon class="text-red-500"><WarningFilled /></el-icon>

      <!-- 按钮中使用 -->
      <el-button type="primary">
        <el-icon class="mr-1"><Download /></el-icon>
        下载
      </el-button>
    </div>

    <div class="big-screen-container bg-gray-900 p-4">
      <h1 class="text-white text-center text-2xl mb-6">数据可视化大屏</h1>

      <div class="grid grid-cols-2 gap-4">
        <!-- 左侧：普通柱状图 -->
        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-blue-400 mb-2">销售趋势</h3>
          <BaseChart :option="barOption" height="350px" />
        </div>

        <!-- 右侧：带自动轮播的饼图 (大屏常用) -->
        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-green-400 mb-2">渠道占比 (自动轮播)</h3>
          <BaseChart
            :option="pieOption"
            height="350px"
            :auto-play="true"
            :auto-play-interval="2000"
          />
        </div>
      </div>
    </div>
  </ScaleScreen>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import BaseChart from '@/components/BaseChart.vue';
import ScaleScreen from '@/components/ScaleScreen.vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push('/login');
};

// --- 1. 柱状图配置 ---
const barOption = ref({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: { lineStyle: { color: '#fff' } }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#fff' } },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    }
  ]
});

// --- 2. 饼图配置 ---
const pieOption = ref({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center', textStyle: { color: '#fff' } },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#1f2937',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: 'bold' }
      },
      data: [
        { value: 1048, name: '搜索引擎', itemStyle: { color: '#5470c6' } },
        { value: 735, name: '直接访问', itemStyle: { color: '#91cc75' } },
        { value: 580, name: '邮件营销', itemStyle: { color: '#fac858' } },
        { value: 484, name: '联盟广告', itemStyle: { color: '#ee6666' } },
        { value: 300, name: '视频广告', itemStyle: { color: '#73c0de' } }
      ]
    }
  ]
});
</script>
