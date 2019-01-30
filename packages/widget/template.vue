<template lang="html">
  <div>
    配置
    <indep-widget href="http://www.baidu.com" icon="fa fa-user" title="title" infor="infor" describe="describe"></indep-widget>
    分发
    <indep-widget type="success" href="http://www.baidu.com" icon="fa fa-user" title="title" infor="infor" describe="describe">
      <template slot="title">综合用户</template>
      <template slot="infor">2000</template>
      <template slot="describe">NEW BOOK</template>
    </indep-widget>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
