<template lang="html">
  <div style="height: 2000px;background: #fff;">
    <div id="parent" style="margin-top: 200px;">
      parent
      <div style="height: 200px;"></div>
      <div id="parent-huodong" style="height: 200px;">活动名称</div>
      <div id="parent-quyu" style="height: 400px;">
        活动区域
        <div style="height: 100px;"></div>
        <div id="parent-quyu1" style="height: 100px;">活动区域1</div>
        <div id="parent-quyu2" style="height: 100px;">活动区域2</div>
      </div>
    </div>
    <indep-anchor show-ink>
      <indep-anchor-link href="#app" title="app" />
      <indep-anchor-link href="#page" title="page" />
      <indep-anchor-link href="#parent" title="parent">
        <indep-anchor-link href="#parent-huodong" title="活动名称" />
        <indep-anchor-link href="#parent-quyu" title="活动区域">
          <indep-anchor-link href="#parent-quyu1" title="活动区域1" />
          <indep-anchor-link href="#parent-quyu2" title="活动区域2" />
        </indep-anchor-link>
      </indep-anchor-link>
    </indep-anchor>
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
