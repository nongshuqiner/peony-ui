<template lang="html">
  <div class="peony-summary-list" :class="[{'peony-summary-space': showSpace}, 'peony-summary-size-' + size]">
    <slot size="size"></slot>
  </div>
</template>

<script>
export default {
  name: 'PeonySummary',
  props: {
    size: { type: String, default: 'default' }, // large / medium / default / small / mini
    showSpace: {type: Boolean, default: true} // 是否有padding间隔
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    addItems (item) { // 添加某一项
      // console.log(this.$slots.default)
      const index = this.$slots.default.filter(item => {
        return item.elm.nodeType === 1 && /\bpeony-summary-item\b/.test(item.elm.className)
      }).indexOf(item.$vnode)
      // console.log(index)
      item.index = index.toString()
      this.items.splice(index, 0, item)
    }
  },
  watch: {
    items () {
      this.items.forEach(item => {
        item.width = 'calc(' + 100 / this.items.length + '% - 1px)'
      })
    }
  }
}
</script>

<style lang="scss">
.peony-summary-list {
  display: inline-block; width: 100%; overflow: hidden; white-space: nowrap; box-sizing: border-box;
  border-radius: 5px; position: relative;
  // box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  zoom: 1;
  &:before, &:after { content: ""; display: table; }
  &:after {clear: both;}
  .peony-summary-item {
    border-right: 1px solid #eaeaea; float: left;
    &:last-child { border-right: 0px; }
  }
}
.peony-summary-space { padding: 10px; }
.peony-summary-size-large.peony-summary-space { padding: 25px; }
.peony-summary-size-medium.peony-summary-space { padding: 20px; }
.peony-summary-size-default.peony-summary-space { padding: 15px; }
.peony-summary-size-large {
  .peony-summary-item {
    .peony-summary-item-desc { font-size: 28px; line-height: 32px; padding-bottom: 12px; }
    .peony-summary-item-title { font-size: 16px; }
  }
}
.peony-summary-size-medium {
  .peony-summary-item {
    .peony-summary-item-desc { font-size: 20px; line-height: 28px; padding-bottom: 10px; }
    .peony-summary-item-title { font-size: 15px; }
  }
}
.peony-summary-size-default {
  .peony-summary-item {
    .peony-summary-item-desc { font-size: 24px; line-height: 24px; padding-bottom: 8px; }
    .peony-summary-item-title { font-size: 14px; }
  }
}
.peony-summary-size-small {
  .peony-summary-item {
    .peony-summary-item-desc { font-size: 20px; line-height: 20px; padding-bottom: 6px; }
    .peony-summary-item-title { font-size: 13px; }
  }
}
.peony-summary-size-mini {
  .peony-summary-item {
    .peony-summary-item-desc { font-size: 16px; line-height: 16px; padding-bottom: 4px; }
    .peony-summary-item-title { font-size: 12px; }
  }
}
</style>
