<template>
  <div class="login-container">
    <div class="login-block">
      <h1 class="title">{{ title }}</h1>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        label-position="left"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="登录用户名"
            type="text"
            prefix-icon="el-icon-user-solid"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            show-password
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-button :loading="loading" type="primary" class="btn-login" @click="handleLogin">
          登录
        </el-button>
      </el-form>
      <br />
      <p>username: admin/user &emsp; password: 不少于6位</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
        }, // login 表单
        rules: {
          username: [{ required: true, message: '请输入登录用户名' }],
          password: [
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少 6 位' },
          ],
        }, // login 规则
        loading: false, // 是否loading
        redirect: undefined, // 重定向地址
        otherQuery: {}, // 其他参数
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query;

          if (query) {
            this.redirect = query.redirect;
            this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true,
      },
    },
    computed: {
      title() {
        return import.meta.env.VITE_APP_TITLE;
      },
    },
    methods: {
      /**
       * @description: 获取除 redirect 外的查询参数
       * @param {object} query 查询参数对象
       */
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur];
          }

          return acc;
        }, {});
      },
      /**
       * @description: 登录
       */
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;

            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery,
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #2d3a4b;
  }

  .login-block {
    position: absolute;
    top: 150px;
    left: 50%;
    width: 420px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    transform: translate(-50%, 0);
  }

  .title {
    text-align: center;
    margin: 0;
  }

  .login-form {
    margin-top: 20px;
  }

  .btn-login {
    width: 100%;
  }
</style>
