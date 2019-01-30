<template lang="html">
  <div class="footer-nav">
    <span v-if="leftNav" class="footer-nav-link footer-nav-left" @click="handleNavClick('prev')">
      <i class="fas fa-angle-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span v-if="rightNav" class="footer-nav-link footer-nav-right" @click="handleNavClick('next')">
      {{ rightNav.title || rightNav.name }}
      <i class="fas fa-angle-right"></i>
    </span>
  </div>
</template>

<script>
import navConfig from '../router/nav.config.js'

export default {
  data () {
    return {
      currentComponent: null,
      nav: [],
      currentIndex: -1,
      leftNav: null,
      rightNav: null
    }
  },
  created () {
    this.setNav()
    this.updateNav()
  },
  computed: {
    lang () {
      return this.$route.meta.lang
    }
  },
  watch: {
    '$route.path' () {
      this.setNav()
      this.updateNav()
    }
  },
  methods: {
    setNav () { // 获取导航顺序列表
      let nav = navConfig[this.lang]
      this.nav = [nav[0]].concat(nav[1].children)
      nav[2].groups.map(group => group.list).forEach(list => {
        this.nav = this.nav.concat(list)
      })
    },
    updateNav () { // 更新前后导航
      // 获取当前位置
      this.currentComponent = '/' + this.$route.path.split('/')[3]
      for (let i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentComponent) {
          this.currentIndex = i
          break
        }
      }
      // 根据当前位置计算前后导航
      this.leftNav = this.nav[this.currentIndex - 1]
      this.rightNav = this.nav[this.currentIndex + 1]
    },
    handleNavClick (direction) {
      this.$router.push(`/${ this.lang }/component${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-nav {
  padding: 40px 0;
  color: #333;
  font-size: 14px;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  i {
    transition: .3s;
    color: #999;
    vertical-align: baseline;
  }
}

.footer-nav-link {
  cursor: pointer;
  transition: .3s;
  &:hover {
    color: #409EFF;
    i {
      color: #409EFF;
    }
  }
}

.footer-nav-left {
  float: left;
  margin-left: -4px;
}

.footer-nav-right {
  float: right;
  margin-right: -4px;
}
</style>
