<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/images/404.png" alt="404" />
        <img class="pic-404__child left" src="@/assets/images/404-cloud.png" alt="404" />
        <img class="pic-404__child mid" src="@/assets/images/404-cloud.png" alt="404" />
        <img class="pic-404__child right" src="@/assets/images/404-cloud.png" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">尊敬的用户!</div>
        <div class="bullshit__info">
          您访问的页面出错了，请检查您输入的网址是否正确，或点击下方按钮返回主页
        </div>
        <span class="bullshit__return-home" @click="goBackHome()"> 返回主页 </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page404',
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
  .http404-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .http404 {
    position: relative;
    overflow: hidden;
    padding: 0 50px;
    width: 1200px;

    .pic-404 {
      position: relative;
      float: left;
      overflow: hidden;
      width: 600px;

      &__parent {
        width: 100%;
      }

      &__child {
        position: absolute;

        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        &.mid {
          top: 10px;
          left: 420px;
          width: 46px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1.2s;
          animation-fill-mode: forwards;
        }

        &.right {
          top: 100px;
          left: 500px;
          width: 62px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }

          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }

          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }

          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }

        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }

          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }

          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }

          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }

        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }

          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }

          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }

          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }

    .bullshit {
      position: relative;
      float: left;
      overflow: hidden;
      padding: 30px 0;
      width: 300px;

      &__oops {
        margin-bottom: 20px;
        color: #1482f0;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }

      &__info {
        margin-bottom: 30px;
        color: grey;
        font-size: 13px;
        line-height: 21px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }

      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        border-radius: 100px;
        background: #1482f0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 36px;
        opacity: 0;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }

      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
</style>
