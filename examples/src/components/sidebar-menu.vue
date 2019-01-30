<template lang="html">
  <div class="sidebar-menu">
    <ul>
      <li class="nav-item" v-for="(item, key) in list" :key="key">
        <!-- 类别 -->
        <a v-if="!item.path && !item.href">{{item.name}}</a>
        <!-- 第三方跳转 -->
        <a v-if="item.href" :href="item.href" target="_blank">{{item.name}}</a>
        <!-- 无分组 -->
        <router-link v-if="item.path" active-class="active" :to="base + item.path" exact>{{item.title || item.name}}</router-link>
        <!-- children -->
        <ul class="pure-menu-list sub-nav" v-if="item.children">
          <li class="nav-item" v-for="(navItem, key) in item.children" :key="key">
            <router-link class="" active-class="active" :to="base + navItem.path"
              exact v-text="navItem.title || navItem.name"
            ></router-link>
          </li>
        </ul>
        <!-- 分组 -->
        <template v-if="item.groups">
          <div class="nav-group" v-for="(group, key) in item.groups" :key="key" >
            <div class="nav-group__title">{{group.groupName}}</div>
            <ul class="pure-menu-list">
              <li class="nav-item" v-for="(navItem, key) in group.list"
                v-if="!navItem.disabled" :key="key"
              >
                <router-link active-class="active" :to="base + navItem.path" exact>{{navItem.title}}</router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import compoLang from '../i18n/component.json'

export default {
  props: {
    list: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
    console.log(this.list)
  },
  computed: {
    lang () {
      return this.$route.meta.lang
    },
    langConfig () {
      return compoLang.filter(config => config.lang === this.lang)[0]['nav']
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  transition: opacity .3s;
  overflow-x: hidden;
  overflow-y: scroll;
  li { list-style: none; }
  // 顶层ul\分组ul\children ul
  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  // 顶层ul
  & > ul > .nav-item > a { margin-top: 15px; }
  & > ul > .nav-item:nth-child(-n + 4) > a { margin-top: 0; }
  // 导航子项
  .nav-item {
    a {
      position: relative;
      display: block;
      height: 40px;
      line-height: 40px;
      padding: 0;
      margin: 0;
      font-size: 16px;
      color: #333;
      text-decoration: none;
      transition: .15s ease-out;
      font-weight: bold;
      &.active {
        color: #409EFF;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #444;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        &:hover,
        &.active {
          color: #409EFF;
        }
      }
    }

    // &.sponsors {
    //   & > .sub-nav {
    //     margin-top: -10px;
    //   }
    //   & > a {
    //     color: #777;
    //     font-weight: 300;
    //     font-size: 14px;
    //   }
    //   .nav-item {
    //     display: inline-block;
    //     a {
    //       height: auto;
    //       display: inline-block;
    //       vertical-align: middle;
    //       margin: 8px 12px 12px 0;
    //       img {
    //         width: 42px;
    //       }
    //     }
    //     &:first-child a img {
    //       width: 36px;
    //     }
    //   }
    // }
  }
  // 分组的标题
  .nav-group__title {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }
  // #code-sponsor-widget {
  //   margin: 0 0 0 -20px;
  // }
}
</style>
