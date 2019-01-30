import Vue from 'vue'
import VueRouter from 'vue-router'
// import routers from './routers'
import routers from './router.config.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routers
})

// let loadingInstance = null
// 路由-全局前置守卫: 页面加载开始
router.beforeEach((to, from, next) => {
  // console.log('beforeEach:', to, from)
  // loadingInstance = Loading.service({ fullscreen: true })
  next() // 跳转
})

// 路由-全局后置钩子: 设置title、页面加载结束、滚动到顶部、
router.afterEach((to, from) => {
  // console.log('afterEach', to, from)
  window.document.title = to.name
  // if (loadingInstance) {
  //   loadingInstance.close()
  // }
  window.setTimeout(function () {
    window.scrollTo(0, 0)
  }, 100)
})

export default router
