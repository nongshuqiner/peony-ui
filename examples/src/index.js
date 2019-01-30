// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/github.css'

// 样式
import './style/index.scss'

import router from './router/index.js'

// PeonyUI
import PeonyUI from '../../src/index.js'
import '../../packages/theme-style/src/index.scss'
Vue.use(PeonyUI)

// 配置碎片
import Config from './config'
Vue.prototype.$Config = Config

// 国际化
// import i18n from '@/locale/index.js'
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // i18n,
  router,
  components: { App },
  template: '<App/>'
})
