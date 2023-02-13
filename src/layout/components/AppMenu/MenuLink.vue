<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
  import { isExternal } from '@/utils/validate';

  export default {
    name: 'MenuLink',
    props: {
      item: {
        type: Object,
        default: () => {},
      },
      to: {
        type: String,
        required: true,
      },
    },
    computed: {
      isExternal() {
        return isExternal(this.to);
      },
      type() {
        if (this.isExternal) {
          return 'a';
        }
        return 'router-link';
      },
    },
    methods: {
      /**
       * @description 链接跳转
       * @param {String} to 跳转地址
       */
      linkProps(to) {
        if (this.isExternal) {
          return {
            href: to,
            target: '_blank',
            rel: 'noopener',
          };
        }

        return {
          to: to,
        };
      },
    },
  };
</script>
