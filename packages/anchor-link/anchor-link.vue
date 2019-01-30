<template>
  <div :class="anchorLinkClasses">
    <a :class="linkTitleClasses" :href="href" :data-scroll-offset="scrollOffset" :data-anchor-href="href" @click.prevent="goAnchor" :title="title">{{ title }}</a>
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
      return [prefix, this.anchorCom.currentLink === this.href ? `${prefix}-active` : '']
    },
    linkTitleClasses () {
      return [ `${prefix}-title` ]
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

<style lang="scss" scoped>
.peony-anchor-link {
  padding: 8px 0 8px 16px; line-height: 1;
  .peony-anchor-link-title {
    display: block; position: relative;
    transition: all .3s; color: #515a6e; margin-bottom: 8px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    &:only-child {
      margin-bottom: 0;
    }
  }
}

.peony-anchor-link-active > .peony-anchor-link-title {
  color: #2d8cf0;
}
.peony-anchor-link .peony-anchor-link {
  padding-top: 4px; padding-bottom: 4px;
}
</style>
