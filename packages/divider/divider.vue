<template lang="html">
  <!-- 分隔线 -->
  <div class="peony-divider" :class="[{
    'peony-divider-with-text': (title !== undefined || $slots.title !== undefined),
    'peony-divider-hidden': hidden}, 'peony-divider-' + type
  ]">
    <div class="peony-divider-wrap">
      <span class="title" v-if="title || $slots.title">
        <slot v-if="$slots.title !== undefined" name="title"></slot>
        <template v-else>{{title}}</template>
      </span>
    </div>
  </div>
</template>

<script>
// 水平分隔线 垂直分隔条 title:分发\props
// 反转色 align:left\right\center 隐藏线:隐藏的分隔线来分隔内容而不用创建一条分隔线
export default {
  name: 'PeonyDivider',
  props: {
    title: String,
    hidden: {type: Boolean, default: false}, // 是否通过隐藏的分隔线来分隔内容
    type: {type: String, default: 'horizontal'} // 水平还是垂直类型:horizontal/vertical
  }
}
</script>

<style lang="scss" scoped>
// letter-spacing 字母间距
// text-transform 转换不同元素中的文本
// user-select 设置或检索是否允许用户选中文本
.peony-divider {
  .peony-divider-wrap {
    font-size: 16px; line-height: 1.5; font-weight: 500; color: rgba(0,0,0,.85); letter-spacing: .05em;
    background: #e8e8e8; box-sizing: border-box; margin: 0; padding: 0;
    // text-transform: uppercase;
    // user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;
  }
}
.peony-divider-hidden {
  .peony-divider-wrap {
    &:before, &:after { border: 0 !important; }
    opacity: 0 !important; background: transparent !important;
  }
}
.peony-divider-horizontal { // 水平
  display: block; margin: 16px 0;
  .peony-divider-wrap {
    height: 1px; width: 100%;
    .title {
      display: inline-block; padding: 0 24px;
    }
    &:before, &:after {
      border-top: 1px solid #e8e8e8; transform: translateY(50%); width: 50%;
    }
  }
}
.peony-divider-vertical { // 垂直
  display: inline-block; vertical-align: middle; margin: 0 8px;
  .peony-divider-wrap {
    width: 1px; height: 100%; min-height: 0.9em;
    writing-mode: tb-rl; writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl; // 文字垂直排版
    .title {
      display: inline-block; padding: 24px 0;
      display: inline; writing-mode: tb-rl; // 文字垂直排版
    }
    &:before, &:after {
      border-left: 1px solid #e8e8e8; transform: translateX(50%); height: 50%;
    }
  }
}
.peony-divider-with-text { // 文字内容
  .peony-divider-wrap {
    display: table; white-space: nowrap; height: auto; width: auto; text-align: center;
    background: transparent; position: relative;
    &:before, &:after {
      content: ''; display: table-cell; position: relative;
    }
  }
}
</style>
