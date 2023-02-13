<template>
  <div class="http403-container">
    <div class="text-center">
      <img src="@/assets/images/403.png" alt="" />
    </div>
    <div class="text-center">
      <h1 class="desc-text">抱歉，你无权访问该页面</h1>
      <el-button type="primary" @click="goBackHome">回到主页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page403',
    methods: {
      /**
       * @description 返回首页
       */
      goBackHome() {
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .http403-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 0;
    width: 100%;
    height: 100%;
  }

  .desc-text {
    padding: 20px 0;
    color: #666;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
  }
</style>
