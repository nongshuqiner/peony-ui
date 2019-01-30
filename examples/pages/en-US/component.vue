<template lang="html">
  <div class="page-container page-component">
    <div class="page-component__nav">
      <sidebar-menu :list="navsData[lang]" :base="`/${ lang }/component`"></sidebar-menu>
    </div>
    <div class="page-component__content">
      <router-view class="content"></router-view>
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
import SidebarMenu from 'examples/src/components/sidebar-menu.vue'
import FooterNav from 'examples/src/components/footer-nav.vue'
import navsData from '../../src/router/nav.config.js'

export default {
  components: { SidebarMenu, FooterNav },
  data() {
    return {
      lang: this.$route.meta.lang,
      navsData,
      hover: false,
      showBackToTop: false,
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null
    }
  },
  created () {
    console.log(this, this.$route)
  }
}
</script>

<style lang="scss" scoped>
.page-component {
  box-sizing: border-box;
  height: 100%;

  &.page-container {
    padding: 0;
  }

  .page-component__nav {
    width: 240px;
    position: fixed;
    top: 0;
    bottom: 0;
    // bottom: 140px;
    margin-top: 80px;
    transition: padding-top .3s;

    .el-scrollbar__wrap {
      height: 100%;
    }

    &.is-extended {
      padding-top: 0;
    }
  }

  .sidebar-menu {
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 0;

    & > ul {
      padding-bottom: 50px;
    }
  }

  .page-component__content {
    padding-left: 270px;
    padding-bottom: 100px;
    box-sizing: border-box;
  }

  .content {
    padding-top: 50px;
  }
}
</style>
