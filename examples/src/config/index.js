export default {
  projectName: 'PeonyUI', // 项目名称
  title: 'Peony文档',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '/',
    pro: '/' // 生产环境前缀
  },
  /**
   * @description 是否使用国际化，默认为false
   * 如果不使用，则需要在路由中给需要在菜单中展示的路由设置 meta: {title: 'xxx'} 用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description action-上传的地址
   */
  uploadUrl: '/posts',
  /**
   * @description 文件存入地址
   */
  getFileUrl: '/photos'
}

// render (h) {
//   return (
//     <div
//       // normal attributes or component props.
//       id="foo"
//       // DOM properties are prefixed with `domProps`
//       domPropsInnerHTML="bar"
//       // event listeners are prefixed with `on` or `nativeOn`
//       onClick={this.clickHandler}
//       nativeOnClick={this.nativeClickHandler}
//       // other special top-level properties
//       class={{ foo: true, bar: false }}
//       style={{ color: 'red', fontSize: '14px' }}
//       key="key"
//       ref="ref"
//       // assign the `ref` is used on elements/components with v-for
//       refInFor
//       slot="slot">
//     </div>
//   )
// }
