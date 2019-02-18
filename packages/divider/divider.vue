<template lang="html">
  <!-- 分隔线 -->
  <div class="peony-divider" :class="[{
    'peony-divider-with-text': (title !== undefined || $slots.title !== undefined),
    'is-hidden': hidden}, 'is-type-' + type
  ]">
    <div class="peony-divider__wrap">
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
