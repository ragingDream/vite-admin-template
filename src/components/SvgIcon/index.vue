<template>
  <span
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
    :style="styleExternalIcon"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  import { isExternal } from '@/utils/validate';

  export default {
    name: 'SvgIcon',
    props: {
      name: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: '',
      },
    },
    computed: {
      isExternal() {
        return isExternal(this.iconClass);
      },
      iconName() {
        return `#icon-${this.name}`;
      },
      svgClass() {
        return ['svg-icon', this.className ? this.className : ''];
      },
      styleExternalIcon() {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .svg-icon {
    display: inline-block;
    overflow: hidden;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
  }
</style>
