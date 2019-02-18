<template lang="html">
  <div style="height: 2000px;">
    <peony-affix :offset-top="50" @on-change="change">
      <span type="primary">Fixed at the top 50px from the top</span>
    </peony-affix>
    <div style="height: 1500px;"></div>
    <peony-affix :offset-bottom="20">
      <el-button type="primary">Fix at the bottom 20px</el-button>
    </peony-affix>
  </div>
</template>

<script>
export default {
  methods: {
    change (status) {
      console.log(status)
    }
  }
}
</script>

<style lang="css">
</style>
