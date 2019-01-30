export default {
  // 国际化
  $_showRoutesI18n (item, vm) {
    return vm.$Config.useI18n ? vm.$t('peony.router.' + item.name) : ((item.meta && item.meta.title) || item.name)
  }
}
