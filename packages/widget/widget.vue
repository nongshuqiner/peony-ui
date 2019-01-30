<template lang="html">
  <!-- 窗口小部件 -->
  <div class="widget" :class="'widget-type-' + type" :style="allHeightStyle">
    <!-- 符号 -->
    <div class="widget-symbol adapt-box">
      <i class="widget-symbol-icon" :class="icon" :style="iconStyle"></i>
    </div>
    <!-- 内容 -->
    <div class="widget-content" :style="widgetContentStyle">
      <!-- 标题 -->
      <h4 class="widget-title" v-if="$slots.title || title" :class="['title-style-' + type]">
        <slot name="title" v-if="$slots.title !== undefined"></slot>
        <template v-else> {{title}} </template>
      </h4>
      <!-- 主体 -->
      <div class="widgets-body">
        <!-- 信息 -->
        <div class="widgets-infor">
          <slot name="infor" v-if="$slots.infor !== undefined"></slot>
          <template v-else> {{infor}} </template>
        </div>
        <!-- 描述 -->
        <p v-if="$slots.describe || describe" class="widgets-describe">
          <slot name="describe" v-if="$slots.describe !== undefined"></slot>
          <template v-else> {{describe}} </template>
        </p>
      </div>
      <!-- 查看更多 -->
      <a class="widget-more" v-if="href !== undefined" :href="href" :target="target">更多>></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allHeight: {type: Number, default: 120, validator (value) { return value >= 120 && value <= 180 }}, // 整体高度
    type: { type: String, default: 'primary' }, // primary-主要 info-蓝色 gray-灰色 success-绿色 warning-警告 danger-失败
    icon: {type: String, required: true}, // 图标
    title: String, // 标题
    infor: String, // 信息
    describe: String, // 描述
    target: { type: String, default: '_blank' }, // target
    href: String // 是否有更多
  },
  computed: {
    allHeightStyle () {
      let style = {}
      if (this.allHeight) {
        style.height = this.allHeight + 'px'
      }
      return style
    },
    iconStyle () {
      let style = {}
      if (this.allHeight) {
        style.height = (this.allHeight * 0.56) + 'px'
        style.width = (this.allHeight * 0.56) + 'px'
        style.fontSize = (this.allHeight * 0.5) + 'px'
      }
      return style
    },
    widgetContentStyle () {
      let style = {}
      if (!this.$slots.title && !this.title) {
        if (this.href) {
          style.paddingTop = '5px'
        }
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.widget {
  display: block; margin-bottom: 20px; background-color: #fff; border-radius: 5px; position: relative;
  min-height: 120px; max-height: 180px; width: 100%; box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  zoom: 1;
  &:before, &:after { content: ""; display: table; }
  &:after {clear: both;}
  .widget-symbol {
    height: 100%; width: 40%; float: left; border-radius: 5px 0px 0px 5px; position: relative;
    display: inline-block; text-align: center; box-sizing: border-box;
    // padding: 25px 15px;
    .widget-symbol-icon {
      display: inline-block; color: #fff;
    }
  }
  .widget-content {
    height: 100%; width: 60%; float: left; border-radius: 5px 0px 0px 5px; position: relative;
    display: inline-block; text-align: center; box-sizing: border-box;
    padding-top: 20px;
    .widget-title {
      position: absolute; top: 0; left: 0;
      width: 100%; line-height: 32px; text-align: left;
      padding-left: 5%; box-sizing: border-box; font-size: 16px; font-weight: 500;
    }
    .widgets-body {
      display: block; width: 100%; height: 100%; position: relative; padding: 10px 0; box-sizing: border-box;
      .widgets-infor {
        position: absolute; top: 10%; left: 0; right: 0;
        color: #c6cad6; font-weight: 300; font-size: 28px; line-height: 36px;
      }
      .widgets-describe {
        position: absolute; top: 50%; left: 0; right: 0;
        font-size: 12px; line-height: 24px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
    }
    .widget-more {
      position: absolute; bottom: 4px; left: 50%; width: 50%; min-width: 100px; max-width: 320px; display: block;
      line-height: 20px; text-align: center; font-size: 12px; color: #fff; border-radius: 10px;
      transform: translateX(-50%); -webkit-transform: translateX(-50%); font-weight: 600; display: none;
      &:hover { opacity: 0.9; }
    }
    &:hover {
      .widget-more { display: block; }
    }
  }
}
.widget-type-primary {
  .widget-symbol {background: #409EFF;}
  .widget-more {background: #409EFF;}
}
.widget-type-info {
  .widget-symbol {background: #2dc3e8;}
  .widget-more {background: #2dc3e8;}
}
.widget-type-gray {
  .widget-symbol {background: #C0C4CC;}
  .widget-more {background: #C0C4CC;}
}
.widget-type-success {
  .widget-symbol {background: #67C23A;}
  .widget-more {background: #67C23A;}
}
.widget-type-warning {
  .widget-symbol {background: #E6A23C;}
  .widget-more {background: #E6A23C;}
}
.widget-type-danger {
  .widget-symbol {background: #F56C6C;}
  .widget-more {background: #F56C6C;}
}
// 适应盒子
.adapt-box {
  text-align: center;
  &:before { content: "";display: inline-block;height: 100%; vertical-align: middle;width: 0; }
  & > * { display: inline-block; max-width: 100%; max-height: 100%; vertical-align: middle; }
}
</style>
