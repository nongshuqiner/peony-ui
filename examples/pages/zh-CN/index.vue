<template lang="html">
  <div class="page-container page-home">
    <div class="banner">
      <div class="banner-desc">
        <h1>Peony UI</h1>
        <p>基于 Vue 2.0 的PC端组件库</p>
        <p>目前正在尽力开发中，一个人慢是正常的...</p>
      </div>
    </div>
    <div class="blooming-gorgeous">
      <img :src="peony" alt="">
    </div>
    <p style="text-align: center;">总要写点什么不是么？我尽力编...</p>
    <section class="explain-item">
      <h3>为什么开发这样一个东西？</h3>
      <p>我是一个前端开发者，在使用诸如elemen、iview等第三方vue库时，总觉得它们还缺少一些东西；在使用时，我们需要定义一些其他的组件；于是，把本人常用的一些第三方组件做以打包发布，以期能节省您的时间，简化您的开发。</p>
    </section>
    <section class="explain-item">
      <h3>它能做什么？</h3>
      <p>我就不夸耀它了，比如：让设计者和开发者专注于更好的用户体验；让网站快速成型等等，其实很简单的目的，它只是用来对你所使用的主流框架做一个扩展；如果其中的功能被第三方的主流框架所实现，那么它也就完成了自己的历史宿命。</p>
    </section>
    <section class="explain-item">
      <h3>首页为何做的这么烂？</h3>
      <p>烂，是因为懒。</p>
    </section>
    <section class="explain-item">
      <h3>为何会起这样一个名字？</h3>
      <p>peony(芍药)？这五月花神，爱情之花；它既是一朵花，纯洁艳丽；又是一种药，镇痛安神。记得红楼梦里写过“醉眠芍药裀”的典故。故此命名之</p>
      <p>"有情芍药含春泪，无力蔷薇卧晓枝" --- 秦观</p>
      <p>另外，I'll do whatever I want</p>
      <p>期望它能帮助你事业功成，收获爱情与友情，奔跑吧！程序员们...</p>
    </section>
  </div>
</template>

<script>
import peony from 'examples/assets/peony.png'
export default {
  data () {
    return {
      peony
    }
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  .banner {
    text-align: center;
    .banner-desc {
      padding-top: 20px;
      h1 {
        font-size: 34px;
        margin: 0;
        line-height: 48px;
        color: #333;
      }
      p {
        font-size: 18px;
        line-height: 28px;
        color: #888;
        margin: 10px 0 5px;
      }
    }
  }
  .blooming-gorgeous {
    img {
      display: block;
      width: 320px;
      height: 320px;
      margin: 0 auto;
    }
  }
  .explain-item {
    text-align: center;
    margin-bottom: 32px;
    h3 {
      line-height: 36px;
      font-size: 24px;
      margin: 0;
      color: #555;
    }
    p {
      font-size: 14px;
      line-height: 18px;
      width: 80%;
      margin: 10px auto 5px;
    }
  }
}
</style>
