<template>
  <div :class="anchorLinkClasses">
    <a
      :class="linkTitleClasses"
      :href="href"
      :title="title"
      :data-scroll-offset="scrollOffset"
      :data-anchor-href="href"
      @click.prevent="goAnchor"
    >{{ title }}</a>
    <slot></slot>
  </div>
</template>
<script>
const prefix = 'peony-anchor-link'
export default {
  name: 'PeonyAnchorLink',
  inject: ['anchorCom'], // inject 选项来接收指定的依赖注入
  props: {
    href: String,
    title: String,
    scrollOffset: { type: Number, default () { return this.anchorCom.scrollOffset } }
  },
  mounted () {
    this.$nextTick(() => {
      this.anchorCom.init()
    })
  },
  computed: {
    anchorLinkClasses () {
      return [prefix, this.anchorCom.currentLink === this.href ? 'is-active' : '']
    },
    linkTitleClasses () {
      return [ `${prefix}__title` ]
    }
  },
  methods: {
    goAnchor () { // 前往相应的锚点
      this.currentLink = this.href
      this.anchorCom.handleHashChange()
      this.anchorCom.handleScrollTo()
      this.anchorCom.$emit('on-select', this.href)
      const isRoute = this.$router
      if (isRoute) {
        this.$router.push(this.href)
      } else {
        window.location.href = this.href
      }
    }
  }
}
</script>
