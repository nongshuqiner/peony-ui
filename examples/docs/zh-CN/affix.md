# Affix 图钉

## 概述

>使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。

## 代码示例

### 基础用法

简单使用，当元素不可见时，直接固定在最顶端

``` html
<template>
  <peony-affix>
    <span type="primary">Fixed at the top</span>
  </peony-affix>
</template>
```

### 偏移

当滚动到一定距离时再固定。

``` html
<template>
  <peony-affix :offset-top="50">
    <span type="primary">Fixed at the top 50px from the top</span>
  </peony-affix>
</template>
```

## API

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |

### Events

none

### slot

| 名称      | 说明    |
|---------- |-------- |
| none  | 自定义显示中间内容，内容默认垂直居中    |
