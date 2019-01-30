// Affix 图钉
import Affix from '../packages/affix/index.js'
// Anchor锚点
import Anchor from '../packages/anchor/index.js'
// Anchor锚点 link
import AnchorLink from '../packages/anchor-link/index.js'
// 概要列表组件
import Summary from '../packages/summary/index.js'
// 概要子项组件
import SummaryItem from '../packages/summary-item/index.js'
// Circle 进度环
import Circle from '../packages/circle/index.js'
// 分隔线
import Divider from '../packages/divider/index.js'
// ...如果还有的话继续添加

// 样式
// import './common/scss/reset.css'

// 国际化
import locale from './locale/index.js'

const components = [
  Affix,
  Anchor,
  AnchorLink,
  Summary,
  SummaryItem,
  Circle,
  Divider
  // ...如果还有的话继续添加
]

const install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  // 指令
  // Vue.use(...directive)

  // 原型链挂载
  // Vue.prototype.$NS = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // }
  // Vue.prototype.$loading = {}
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  name: 'peony-ui',
  version: '1.0.0', // 版本
  // 国际化
  locale: locale.use,
  i18n: locale.i18n,
  // install
  install,
  // 组件
  Affix,
  Anchor,
  AnchorLink,
  Summary,
  SummaryItem,
  Circle,
  Divider
  // ...如果还有的话继续添加
}

// module.exports.default = module.exports;
