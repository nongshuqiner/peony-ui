<template>
  <component :is="wrapperComponent" :offset-top="offsetTop" :offset-bottom="offsetBottom" @on-change="handleAffixStateChange">
    <div :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <div :class="`${prefix}`">
        <div :class="`${prefix}-ink`">
          <span v-show="showInk" :class="`${prefix}-ink-ball`" :style="{top: `${inkTop}px`}"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script>
import { on, off, scrollTop } from '@/utils/Dom.js'
import { findComponentsDownward, sharpMatcherRegx } from '@/utils/index.js'
export default {
  name: 'PeonyAnchor',
  provide () { // 依赖注入: 允许我们指定我们想要提供给后代组件的数据/方法
    return {
      anchorCom: this
    }
  },
  props: {
    affix: { type: Boolean, default: true }, // 是否固定模式
    offsetTop: { type: Number, default: 0 }, // 距离窗口顶部达到指定偏移量后触发
    offsetBottom: Number, // 距离窗口底部达到指定偏移量后触发
    bounds: { type: Number, default: 5 }, // 锚点区域边界 container: [String, HTMLElement] HTMLElement 在 SSR 下不支持
    container: null, // 滚动的容器 类型: String-document.querySelector(this.container) Object-dom
    showInk: { type: Boolean, default: false }, // 是否显示小圆点
    scrollOffset: { type: Number, default: 0 } // 点击滚动的额外距离
  },
  data () {
    return {
      prefix: 'peony-anchor',
      isAffixed: false, // current affixed state
      inkTop: 0, // 显示小圆点的top
      animating: false, // 是否 scrollTop 动画
      currentLink: '', // 当前锚点link 例如:/#/mian /#/mian#app current show link =>  #href -> currentLink = #href
      currentId: '', // 当前linkid 无# current show title id =>  #href -> currentId = href
      scrollContainer: null, // 滚动的容器
      scrollElement: null, // 滚动的容器el
      titlesOffsetArr: [], // 每个锚点位置的盒子需要滚动的 ScrollTop
      wrapperTop: 0, // 容器的offsetTop
      upperFirstTitle: true
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.removeListener() // 清除监听事件
  },
  computed: {
    wrapperComponent () { // 返回盒子的组件
      return this.affix ? 'peony-affix' : 'div'
    },
    wrapperStyle () {
      return { maxHeight: this.offsetTop ? `calc(100vh - ${this.offsetTop}px)` : '100vh' }
    },
    containerIsWindow () { // 容器是否为window
      return this.scrollContainer === window
    }
  },
  watch: {
    '$route' () { // 监听路由的hash值的变化并作出相应处理
      this.handleHashChange()
      this.$nextTick(() => {
        this.handleScrollTo()
      })
    },
    container () { // 监听盒子的变化
      this.init()
    },
    currentLink (newHref, oldHref) {
      this.$emit('on-change', newHref, oldHref)
    }
  },
  methods: {
    init () { // 初始化
      this.handleHashChange() // 处理hash值变化
      this.$nextTick(() => {
        this.removeListener() // 清除监听事件
        this.getScrollContainer() // 获取滚动的容器
        this.wrapperTop = this.containerIsWindow ? 0 : this.scrollElement.offsetTop // 容器的offsetTop
        this.handleScrollTo() // 处理滚动条滚动
        this.handleSetInkTop() // 设置显示小圆点的top
        this.updateTitleOffset() // 更新每个锚点位置的盒子需要滚动的 ScrollTop
        this.upperFirstTitle = this.scrollElement.scrollTop < this.titlesOffsetArr[0].offset
        on(this.scrollContainer, 'scroll', this.handleScroll)
        on(window, 'hashchange', this.handleHashChange)
      })
    },
    handleHashChange () { // 处理hash值变化
      const url = window.location.href
      const sharpLinkMatch = sharpMatcherRegx.exec(url)
      if (!sharpLinkMatch) { return }
      // console.log('处理hash值', sharpLinkMatch)
      this.currentLink = sharpLinkMatch[0] // 未点击任何锚点时，是路由 例子: #/main #app
      this.currentId = sharpLinkMatch[1] // 未点击任何锚点时，是路由去除# 例子: /main app
    },
    getScrollContainer () { // 获取滚动的容器
      this.scrollContainer = this.container ? (typeof this.container === 'string' ? document.querySelector(this.container) : this.container) : window
      this.scrollElement = this.container ? this.scrollContainer : (document.documentElement || document.body)
    },
    handleScrollTo () { // 处理当前锚点的滚动条滚动
      const anchor = document.getElementById(this.currentId) // 获取当前锚点 未点击任何锚点时，是null
      // console.log(anchor)
      const currentLinkElementA = document.querySelector(`a[data-anchor-href="${this.currentLink}"]`) // 获取当前锚点所在的a标签 未点击任何锚点时，是null 如果data-anchor-href重复只有第一个有效
      // console.log(currentLinkElementA)
      let offset = this.scrollOffset
      if (currentLinkElementA) {
        offset = parseFloat(currentLinkElementA.getAttribute('data-scroll-offset'))
      }

      if (!anchor) { return }
      const needScrollTop = anchor.offsetTop - this.wrapperTop - offset // 当前锚点的offsetTop - 滚动容器的offsetTop - AnchorLink点击滚动的额外距离
      // console.log(needScrollTop, '当前锚点的offsetTop:' + anchor.offsetTop, '滚动容器的offsetTop:' + this.wrapperTop, 'AnchorLink点击滚动的额外距离:' + offset)
      this.animating = true
      scrollTop(this.scrollContainer, this.scrollElement.scrollTop, needScrollTop, 600, () => {
        this.animating = false
      }) // scrollTop animation
      this.handleSetInkTop() // 设置显示小圆点的top
    },
    handleSetInkTop () { // 设置显示小圆点的top
      const currentLinkElementA = document.querySelector(`a[data-anchor-href="${this.currentLink}"]`)
      if (!currentLinkElementA) { return }
      const elementATop = currentLinkElementA.offsetTop
      const top = (elementATop < 0 ? this.offsetTop : elementATop)
      this.inkTop = top
    },
    updateTitleOffset () { // 更新每个锚点位置的盒子需要滚动的 ScrollTop
      const links = findComponentsDownward(this, 'PeonyAnchorLink').map(link => {
        return link.href
      }) // 找到所有子组件的href属性
      const idArr = links.map(link => {
        return link.split('#')[1]
      }) // 找到所有子组件的锚点链接id
      // console.log(links, idArr)
      let offsetArr = []
      idArr.forEach(id => {
        const titleEle = document.getElementById(id) // 获取锚点位置的盒子
        if (titleEle) {
          offsetArr.push({
            link: `#${id}`,
            offset: titleEle.offsetTop - this.scrollElement.offsetTop
          })
        }
      }) // 获取每个锚点位置的盒子需要滚动的 ScrollTop
      // console.log(offsetArr)
      this.titlesOffsetArr = offsetArr
    },
    // scroll event start-------------------------------------------------------
    handleScroll (e) { // 处理滚动容器滚动时
      this.upperFirstTitle = e.target.scrollTop < this.titlesOffsetArr[0].offset
      if (this.animating) { return }
      this.updateTitleOffset() //
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || e.target.scrollTop
      // console.log(scrollTop)
      this.getCurrentScrollAtTitleId(scrollTop)
    },
    getCurrentScrollAtTitleId (scrollTop) { // 获取当前滚动位置在哪一个锚点上
      let i = -1
      let len = this.titlesOffsetArr.length
      let titleItem = { link: '#', offset: 0 }
      scrollTop += this.bounds
      while (++i < len) {
        let currentEle = this.titlesOffsetArr[i]
        let nextEle = this.titlesOffsetArr[i + 1]
        if (scrollTop >= currentEle.offset && scrollTop < ((nextEle && nextEle.offset) || Infinity)) {
          titleItem = this.titlesOffsetArr[i]
          break
        }
      }
      // console.log(titleItem)
      this.currentLink = titleItem.link
      this.handleSetInkTop() // 设置显示小圆点的top
    },
    removeListener () { // 清除监听事件
      off(this.scrollContainer, 'scroll', this.handleScroll)
      off(window, 'hashchange', this.handleHashChange)
    },
    // scroll event end---------------------------------------------------------
    // Affix
    handleAffixStateChange (state) { // 处理affix组件状态变化时
      this.isAffixed = this.affix && state
    }
  }
}
</script>
