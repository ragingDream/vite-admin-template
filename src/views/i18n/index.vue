<template>
  <el-card class="box-card">
    <template #header>
      <svg-icon name="international" />
      <span class="ml-4">{{ $t('message.title') }}</span>
    </template>
    <el-radio-group v-model="lang" size="small">
      <el-radio label="zh" border> 简体中文 </el-radio>
      <el-radio label="en" border> English </el-radio>
    </el-radio-group>
    <div class="mt-4">
      <el-alert :title="$t('message.note')" :closable="false" type="info" effect="dark"> </el-alert>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'I18n',
    computed: {
      lang: {
        get() {
          return this.$store.state.app.language;
        },
        set(lang) {
          this.$i18n.locale = lang;
          this.$store.dispatch('app/setLanguage', lang);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .box-card {
    width: 600px;
    max-width: 100%;
    margin: 20px auto;
  }
</style>
