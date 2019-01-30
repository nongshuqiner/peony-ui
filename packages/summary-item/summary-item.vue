<template lang="html">
  <a class="peony-summary-item" :class="['peony-summary-type-' + type]" :href="href" :target="target" :style="allWidthStyle">
    <p class="peony-summary-item-desc" v-if="$slots.describe || describe">
      <slot name="describe" v-if="$slots.describe !== undefined"></slot>
      <template v-else> {{describe}} </template>
    </p>
    <div class="peony-summary-item-title" v-if="$slots.title || title">
      <slot name="title" v-if="$slots.title !== undefined"></slot>
      <template v-else>{{title}}</template>
    </div>
  </a>
</template>

<script>
export default {
  name: 'PeonySummaryItem',
  props: {
    // size: { type: String, default: 'default' }, // large / medium / default / small
    type: { type: String, default: 'primary' }, // primary-主要 info-蓝色 gray-灰色 success-绿色 warning-警告 danger-失败
    title: String, // 标题
    describe: String, // 描述
    target: { type: String, default: '_blank' }, // target
    href: String // 是否有更多
  },
  data () {
    return {
      index: null,
      width: null
    }
  },
  mounted () {
    this.$parent.addItems(this)
  },
  computed: {
    allWidthStyle () {
      let style = {}
      if (this.width) {
        style.width = this.width
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.peony-summary-item {
  display: inline-block; text-align: center; padding: 10px 0; color: #818181; width: 33.33%;
  height: 100%; box-sizing: border-box;
  .peony-summary-item-desc {
    display: block; min-height: 24px;
    // font-size: 24px; padding-bottom: 8px;
  }
  .peony-summary-item-title {
    display: block;
    // font-size: 14px;
  }
}

.peony-summary-type-primary {
  .peony-summary-item-desc { color: #409EFF; }
}
.peony-summary-type-info {
  .peony-summary-item-desc { color: #2dc3e8; }
}
.peony-summary-type-gray {
  .peony-summary-item-desc { color: #C0C4CC; }
}
.peony-summary-type-success {
  .peony-summary-item-desc { color: #67C23A; }
}
.peony-summary-type-warning {
  .peony-summary-item-desc { color: #E6A23C; }
}
.peony-summary-type-danger {
  .peony-summary-item-desc { color: #F56C6C; }
}
</style>
