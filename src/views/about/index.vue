<template>
  <div>
    <div class="page-header">
      <div class="title">关于</div>
      <div class="content">
        <el-link
          type="primary"
          href="https://github.com/ragingDream/vite-admin-template/tree/vue2"
          target="_blank"
        >
          {{ name }}
        </el-link>
        是基于
        <el-link
          type="primary"
          href="https://github.com/PanJiaChen/vue-element-admin"
          target="_blank"
        >
          vue-element-admin
        </el-link>
        改造的一个后台前端解决方案。它使用 vue2.7、vite3 和 element-ui 实现，内置了 i18n
        国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。
      </div>
    </div>
    <el-card class="mt15">
      <template #header> 项目信息 </template>
      <el-descriptions border size="small" :column="2">
        <el-descriptions-item label="版本">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="最后编译时间">
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Github">
          <el-link
            type="primary"
            href="https://github.com/ragingDream/vite-admin-template/tree/vue2"
            target="_blank"
          >
            Github
          </el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="mt15">
      <template #header> 生产环境依赖 </template>
      <el-descriptions border size="medium" :column="3">
        <el-descriptions-item v-for="item in schema" :key="item.field" :label="item.field">
          {{ item.label }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="mt15">
      <template #header> 开发环境依赖 </template>
      <el-descriptions border size="medium" :column="3">
        <el-descriptions-item v-for="item in devSchema" :key="item.field" :label="item.field">
          {{ item.label }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
  const {
    lastBuildTime,
    pkg: { name, version, dependencies, devDependencies },
  } = __APP_INFO__;

  export default {
    name: 'About',
    data() {
      return {
        name,
        version,
        lastBuildTime,
      };
    },
    computed: {
      schema() {
        const schema = [];

        Object.keys(dependencies).forEach((key) => {
          schema.push({ field: key, label: dependencies[key] });
        });

        return schema;
      },
      devSchema() {
        const devSchema = [];

        Object.keys(devDependencies).forEach((key) => {
          devSchema.push({ field: key, label: devDependencies[key] });
        });

        return devSchema;
      },
    },
  };
</script>
