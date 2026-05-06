<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <el-card class="w-96">
      <h2 class="text-center text-2xl font-bold mb-6">系统登录</h2>
      <el-form>
        <el-form-item>
          <el-input v-model="username" placeholder="请输入用户名 (随便输)" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="请输入密码 (随便输)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';

const username = ref('');
const password = ref('');
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const handleLogin = () => {
  if (!username.value || !password.value) return ElMessage.warning('请输入账号密码');

  // 模拟登录成功，设置假 token
  userStore.setToken('fake-token-' + Date.now());
  ElMessage.success('登录成功');

  const redirect = route.query.redirect || '/';
  router.push(redirect);
};
</script>
