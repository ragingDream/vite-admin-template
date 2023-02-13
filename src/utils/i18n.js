/*
 * @Author: chenzl
 * @Date: 2023-02-08 17:34:02
 * @LastEditors: chenzl
 * @LastEditTime: 2023-02-08 17:34:10
 * @Description: Enter a description of the current file
 */
// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title);

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title);

    return translatedTitle;
  }
  return title;
}
