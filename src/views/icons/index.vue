<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Icons">
      <div class="grid">
        <div
          v-for="item of svgIcons"
          :key="item"
          @click="handleClipboard(generateSvgIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <template #content>
              {{ generateSvgIconCode(item) }}
            </template>
            <div class="icon-item">
              <svg-icon :name="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Element-UI Icons">
      <div class="grid">
        <div
          v-for="item of elementIcons"
          :key="item"
          @click="handleClipboard(generateElementIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <template #content>
              {{ generateElementIconCode(item) }}
            </template>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import clipboard from '@/utils/clipboard';
  import svgIcons from './svg-icons';
  import elementIcons from './element-icons';

  export default {
    name: 'Icons',
    data() {
      return {
        svgIcons,
        elementIcons,
      };
    },
    methods: {
      /**
       * @description 生成 Svg 图标代码
       * @param {string} symbol svg 图标名称
       */
      generateSvgIconCode(symbol) {
        return `<svg-icon name="${symbol}" />`;
      },
      /**
       * @description 生成 Element 图标代码
       * @param {string} symbol Element 图标名称
       */
      generateElementIconCode(symbol) {
        return `<i class="el-icon-${symbol}" />`;
      },
      /**
       * @description 复制剪贴板处理器
       * @param {string} text 复制文本
       * @param {object} event 事件对象
       */
      handleClipboard(text, event) {
        clipboard(text, event);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 60px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
</style>
