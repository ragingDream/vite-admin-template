<template>
  <div class="settings-container" :class="{ show: show }">
    <div class="mask" @click="show = !show"></div>

    <div class="settings-panel">
      <h2 class="title">系统配置</h2>
      <el-divider content-position="center">主题</el-divider>
      <div class="settings-item text-center">
        <ThemePicker @change="changeTheme" />
      </div>
      <el-divider content-position="center">布局</el-divider>
      <div class="settings-item">
        <el-radio-group v-model="mode">
          <el-radio label="left">左边菜单</el-radio>
          <el-radio label="top">顶部菜单</el-radio>
        </el-radio-group>
      </div>
      <el-divider content-position="center">菜单设置</el-divider>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18">手风琴模式</el-col>
        <el-col :span="6">
          <el-switch v-model="uniqueOpened" :disabled="layout.mode === 'top'"></el-switch>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">菜单文字颜色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="menuTextColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">菜单选中文字颜色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="menuActiveTextColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">菜单背景色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="menuBackgroundColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">菜单 hover 背景色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="menuHoverBackgroundColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">子菜单背景色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="subMenuBackgroundColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18" class="line-height-40">子菜单 hover 背景色</el-col>
        <el-col :span="6">
          <el-color-picker
            v-model="subMenuHoverBackgroundColor"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          ></el-color-picker>
        </el-col>
      </el-row>
      <el-divider content-position="center">界面功能</el-divider>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18">显示侧边栏 LOGO</el-col>
        <el-col :span="6">
          <el-switch v-model="isShowLogo" :disabled="layout.mode === 'top'"></el-switch>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18">固定头部</el-col>
        <el-col :span="6">
          <el-switch v-model="isFixedHeader"></el-switch>
        </el-col>
      </el-row>
      <el-row class="settings-item" :gutter="10">
        <el-col :span="18">显示底部</el-col>
        <el-col :span="6">
          <el-switch v-model="isShowFooter"></el-switch>
        </el-col>
      </el-row>

      <span v-if="layout.isShowSettingsBtn" class="settings-btn" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ThemePicker from '@/components/ThemePicker';

  export default {
    name: 'AppSettings',
    components: { ThemePicker },
    data() {
      return {
        show: false, // 显示系统配置面板
      };
    },
    computed: {
      ...mapGetters(['layout', 'sidebar']),
      mode: {
        get() {
          return this.layout.mode;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'layout',
            key: 'mode',
            value: val,
          });
        },
      },
      uniqueOpened: {
        get() {
          return this.sidebar.uniqueOpened;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'uniqueOpened',
            value: val,
          });
        },
      },
      menuTextColor: {
        get() {
          return this.sidebar.menuTextColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'menuTextColor',
            value: val,
          });
        },
      },
      menuActiveTextColor: {
        get() {
          return this.sidebar.menuActiveTextColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'menuActiveTextColor',
            value: val,
          });
        },
      },
      menuBackgroundColor: {
        get() {
          return this.sidebar.menuBackgroundColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'menuBackgroundColor',
            value: val,
          });
        },
      },
      menuHoverBackgroundColor: {
        get() {
          return this.sidebar.menuHoverBackgroundColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'menuHoverBackgroundColor',
            value: val,
          });
        },
      },
      subMenuBackgroundColor: {
        get() {
          return this.sidebar.subMenuBackgroundColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'subMenuBackgroundColor',
            value: val,
          });
        },
      },
      subMenuHoverBackgroundColor: {
        get() {
          return this.sidebar.subMenuHoverBackgroundColor;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'sidebar',
            key: 'subMenuHoverBackgroundColor',
            value: val,
          });
        },
      },
      isShowLogo: {
        get() {
          return this.layout.isShowLogo;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'layout',
            key: 'isShowLogo',
            value: val,
          });
        },
      },
      isFixedHeader: {
        get() {
          return this.layout.isFixedHeader;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'layout',
            key: 'isFixedHeader',
            value: val,
          });
        },
      },
      isShowFooter: {
        get() {
          return this.layout.isShowFooter;
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            type: 'layout',
            key: 'isShowFooter',
            value: val,
          });
        },
      },
    },
    methods: {
      /**
       * @description 切换主题
       * @param {string} color 主题色
       */
      changeTheme(color) {
        this.$store.dispatch('app/changeSetting', {
          type: 'layout',
          key: 'theme',
          value: color,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .settings-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    &.show {
      height: 100%;

      .settings-panel {
        transform: translate(0);
        box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%),
          0 6px 30px 5px rgb(0 0 0 / 12%);
      }
    }
  }

  .settings-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: 20px;
    width: $settingPanelWidth;
    height: 100vh;
    background: #fff;
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);

    .title {
      text-align: center;
      font-size: 20px;
    }

    .settings-btn {
      position: absolute;
      top: 30%;
      left: -48px;
      width: 48px;
      height: 48px;
      border-radius: 6px 0 0 6px;
      background-color: v-bind('layout.theme');
      color: #fff;
      text-align: center;
      font-size: 24px;
      line-height: 48px;
      cursor: pointer;
    }
  }

  .settings-item {
    margin-top: 10px;
  }
</style>
