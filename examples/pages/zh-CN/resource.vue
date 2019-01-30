<template lang="html">
  <div class="page-container page-resource">
    <h3>资源</h3>
    <p>设计资源正在整理和完善中...</p>
    <p>敬请期待.</p>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
.page-resource {
  padding-top: 55px;
  box-sizing: border-box;
  h3 {
    line-height: 1;
    font-size: 28px;
    margin: 20px 0 21px;
  }
  p {
    line-height: 1;
    font-size: 14px;
    color: #5e6d82;
    margin-bottom: 12px;
  }
}
</style>
