<template lang="html">
  <div class="main-header">
    <div class="main-header-wrapper">
      <div class="container">
        <!-- logo -->
        <h1>
          <router-link :to="`/${ lang }`">
            <img :src="logo" alt="peony-logo" class="nav-logo">
          </router-link>
        </h1>
        <!-- nav -->
        <ul class="nav clearfix">
          <!-- <li class="nav-item">
            <router-link active-class="active" :to="`/${ lang }/guide`">
              {{ langConfig.guide }}
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link active-class="active" :to="`/${ lang }/component`">
              {{ langConfig.components }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" :to="`/${ lang }/resource`" exact>
              {{ langConfig.resource }}
            </router-link>
          </li>
          <!-- gap -->
          <li class="nav-item"> <div class="nav-gap"></div> </li>
          <!-- 版本选择器 -->
          <!-- <li class="nav-item nav-versions" v-show="isComponentPage">
            <el-dropdown
              trigger="click"
              class="nav-dropdown"
              :class="{ 'is-active': verDropdownVisible }">
              <span>
                {{ version }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="nav-dropdown-list"
                @input="handleVerDropdownToggle">
                <el-dropdown-item
                  v-for="item in Object.keys(versions)"
                  :key="item"
                  @click.native="switchVersion(item)">
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->
          <!-- 语言选择器 -->
          <li class="nav-item lang-item">中文</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logo from 'examples/assets/logo.png'
import componentLang from '../i18n/component.json'

export default {
  data () {
    return {
      logo
    }
  },
  computed: {
    lang () {
      return 'zh-CN'
      // return this.$route.path.split('/')[1] || 'zh-CN'
    },
    langConfig () {
      return componentLang.filter(config => config.lang === this.lang)[0]['header']
    },
    isComponentPage () {
      return /^component/.test(this.$route.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  .container {
    height: 80px;
    // logo
    h1 {
      display: inline-block;
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;
      a {
        color: #333;
        text-decoration: none;
        display: block;
      }
      span {
        display: inline-block;
        font-size: 12px;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
      .nav-logo {
        width: 150px;
        height: 40px;
        vertical-align: sub;
      }
    }
    // nav
    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;
    }
    .nav-item {
      position: relative;
      margin: 0;
      float: left;
      list-style: none;
      font-size: 16px;
      cursor: pointer;

      &.lang-item,
      &:last-child {
        cursor: default;
        margin-left: 34px;
        span { opacity: .8; }
        // .nav-lang {
        //   display: inline-block;
        //   cursor: pointer;
        //   height: 100%;
        //   color: #888;
        //   &:hover {
        //     color: #409EFF;
        //   }
        //   &.active {
        //     font-weight: bold;
        //     color: #409EFF;
        //   }
        // }
      }
      a {
        text-decoration: none;
        color: #888;
        display: block;
        padding: 0 22px;

        &.active,
        &:hover {
          color: #333;
        }

        &.active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 15px;
          left: calc(50% - 7px);
          width: 14px;
          height: 4px;
          background: #409EFF;
        }
      }
    }
    .nav-gap {
      position: relative;
      width: 1px;
      height: 80px;
      padding: 0 20px;

      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 16px;
        background: #ebebeb;
      }
    }
  }
}
@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }
      a {
        padding: 0 5px;
      }
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        vertical-align: top;
      }
      &.lang-item {
        height: 100%;
        .nav-lang {
          display: flex;
          align-items: center;
          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
