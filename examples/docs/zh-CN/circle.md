
## Circle 圆形环

### 概述

图表类组件。一般有两种用途：
* 显示某项任务进度的百分比；
* 统计某些指标的占比。

### Usage(使用)

``` html
<template lang="html">
  <peony-circle :size="120" :stroke-width="6" :trail-width="6" :percent="percent" :stroke-color="strokeColor" :trail-color="trailColor">
    <span style="color:#36D1DC">{{ percent }}%</span>
  </peony-circle>
</template>

<script>
export default {
  data () {
    return {
      percent: 20,
      strokeColor: ['#36D1DC', '#5B86E5'],
      trailColor: '#ececec'
    }
  }
}
</script>
```

### Attributes(属性)

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| percent  | 进度百分比    | Number   | 0-100 | 0 |
| size  | 圆环的宽高大小    | Number   | - | - |
| strokeLinecap  | 定义不同类型的开放路径的终结    | String   | butt\round\square | butt |
| strokeWidth  | 圆形环的线条宽度    | Number   | - | 1 |
| strokeColor  | 线条颜色，数组时表示渐变    | Array, String   | - | #3FC7FA |
| anticlockwise  | 是否按逆时针方向展示百分比    | Boolean   | true\false | false |

### Events

none

### slot

| 名称      | 说明    |
|---------- |-------- |
| none  | 自定义显示中间内容，内容默认垂直居中    |
