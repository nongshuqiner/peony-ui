<template>
  <div id="app" :class="{'is-components': isComponent}">
    <main-header></main-header>
    <div class="main">
      <router-view />
    </div>
    <main-footer v-if="!isComponent"></main-footer>
  </div>
</template>

<script>
import MainHeader from './components/main-header.vue'
import MainFooter from './components/main-footer.vue'

// const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN'
export default {
  name: 'App',
  components: { MainHeader, MainFooter },
  computed: {
    // lang () {
    //   return this.$route.path.split('/')[1] || 'zh-CN'
    // },
    isComponent () {
      return /^component-/.test(this.$route.name || '')
    }
  },
  watch: {
    // lang (val) {
    //   localize(val)
    // }
  }
}
</script>

<style lang="scss" scoped>
#app {width: 100%; height: 100%; }
</style>
