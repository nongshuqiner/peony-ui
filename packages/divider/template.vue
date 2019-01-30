<template lang="html">
  <div>
    内容1上
    <indep-divider></indep-divider>
    内容1下
    <br>
    内容2上
    <indep-divider title="title文字内容"></indep-divider>
    内容2下
    <br>
    内容1左
    <indep-divider type="vertical"></indep-divider>
    内容1右
    <br>
    内容2左
    <indep-divider type="vertical" title="title文字内容"></indep-divider>
    内容2右
    <br>
    内容上
    <indep-divider :hidden="true"></indep-divider>
    <indep-divider :hidden="true" title="title文字内容"></indep-divider>
    内容下
    <br>
    内容左
    <indep-divider :hidden="true" type="vertical"></indep-divider>
    <indep-divider :hidden="true" type="vertical" title="title文字内容"></indep-divider>
    内容右
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
