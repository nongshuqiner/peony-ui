<template lang="html">
  <!-- 窗口小部件 -->
  <div class="peony-widget" :class="'is-type-' + type" :style="allHeightStyle">
    <!-- 符号 -->
    <div class="peony-widget__symbol peony-adaptbox-container">
      <i class="peony-adaptbox" :class="icon" :style="iconStyle"></i>
    </div>
    <!-- 内容 -->
    <div class="peony-widget__content" :style="widgetContentStyle">
      <!-- 标题 -->
      <h4 class="content-title" v-if="$slots.title || title" :class="['title-style-' + type]">
        <slot name="title" v-if="$slots.title !== undefined"></slot>
        <template v-else> {{title}} </template>
      </h4>
      <!-- 主体 -->
      <div class="content-body">
        <!-- 信息 -->
        <div class="content-body__info">
          <slot name="infor" v-if="$slots.infor !== undefined"></slot>
          <template v-else> {{infor}} </template>
        </div>
        <!-- 描述 -->
        <p v-if="$slots.describe || describe" class="content-body__describe">
          <slot name="describe" v-if="$slots.describe !== undefined"></slot>
          <template v-else> {{describe}} </template>
        </p>
      </div>
      <!-- 查看更多 -->
      <a class="content-more" v-if="href !== undefined" :href="href" :target="target">更多>></a>
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
