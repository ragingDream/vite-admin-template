<template>
  <div class="flex-center full-screen bg-gray-50">
    <el-result icon="warning" title="404">
      <template #sub-title>
        <span class="text-gray-500">抱歉，您访问的页面不存在或已被移除</span>
      </template>
      <template #extra>
        <div class="space-x-4">
          <el-button type="primary" @click="goHome">返回首页</el-button>
          <el-button @click="goBack">返回上一页</el-button>
        </div>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>
