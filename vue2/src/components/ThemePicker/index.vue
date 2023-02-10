<template>
  <el-color-picker
    v-model="theme"
    :predefine="predefineTheme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
  import { mapGetters } from 'vuex';
  import chalkCSS from '~/element-ui/lib/theme-chalk/index.css';
  const ORIGINAL_THEME = '#409EFF'; // default color

  export default {
    data() {
      return {
        theme: '',
      };
    },
    computed: {
      ...mapGetters(['layout', 'sidebar']),
      chalk() {
        return chalkCSS.replace(/@font-face{[^}]+}/, '');
      },
      defaultTheme() {
        return this.layout.theme;
      },
      predefineTheme() {
        return this.layout.predefineTheme;
      },
    },
    watch: {
      defaultTheme: {
        handler: function (val) {
          this.theme = val;
        },
        immediate: true,
      },
      theme(val) {
        const oldVal = this.theme || ORIGINAL_THEME;

        if (typeof val !== 'string') return;

        const themeCluster = this.getThemeCluster(val.replace('#', ''));
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
        const getHandler = (variable, id) => {
          return () => {
            const originalThemeCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));
            const newStyle = this.updateStyle(this[variable], originalThemeCluster, themeCluster);
            let styleTag = document.getElementById(id);

            if (!styleTag) {
              styleTag = document.createElement('style');
              styleTag.setAttribute('id', id);
              document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
          };
        };

        const chalkHandler = getHandler('chalk', 'chalk-style');
        const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
          const text = style.innerText;
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
        });

        chalkHandler();
        styles.forEach((style) => {
          const { innerText } = style;

          if (typeof innerText !== 'string') return;
          style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
        });

        this.$emit('change', val);
      },
    },
    methods: {
      /**
       * @description 获取主题集群
       * @param {string} theme 主题色
       */
      getThemeCluster(theme) {
        const hexColorHandler = (color) => {
          const red = parseInt(color.slice(0, 2), 16);
          const green = parseInt(color.slice(0, 2), 16);
          const blue = parseInt(color.slice(0, 2), 16);

          return {
            red,
            green,
            blue,
          };
        };
        const tintColor = (color, tint) => {
          let { red, green, blue } = hexColorHandler(color);

          if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(',');
          } else {
            red += Math.round(tint * (255 - red));
            green += Math.round(tint * (255 - green));
            blue += Math.round(tint * (255 - blue));
            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);

            return `#${red}${green}${blue}`;
          }
        };
        const shadeColor = (color, shade) => {
          let { red, green, blue } = hexColorHandler(color);

          red = Math.round((1 - shade) * red);
          green = Math.round((1 - shade) * green);
          blue = Math.round((1 - shade) * blue);
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        };
        const clusters = [theme];

        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
        }

        clusters.push(shadeColor(theme, 0.1));
        return clusters;
      },
      /**
       * @description 更新样式
       * @param {string} style 样式
       * @param {string} oldCluster 旧主题色
       * @param {string} newCluster 新主题色
       */
      updateStyle(style, oldCluster, newCluster) {
        let newStyle = style;

        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
        });
        return newStyle;
      },
    },
  };
</script>

<style lang="scss">
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>
