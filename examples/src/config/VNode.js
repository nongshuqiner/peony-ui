export default {
  asyncFactory: Function, // 异步组件工厂函数
  asyncMeta: Object, // 异步元信息
  children: Array, // [VNode, VNode ...]
  componentInstance: Component, // component instance
  componentOptions: Object, // VNodeComponentOptions {tag: String, propsData: {props}, listeners: {v-on}, children: [], Ctor: VueComponent}
  context: Object, // VueComponent 上下文
  data: Object, // VNodeData {attrs: {}, hook: {}, on: {}}
  elm: Node,
  fnContext: Component, // real context vm for functional nodes
  fnOptions: ComponentOptions, // for SSR caching
  fnScopeId: String, // functional scope id support
  isAsyncPlaceholder: Boolean,
  isComment: Boolean, // empty comment placeholder?
  isCloned: Boolean, // 是否是一个clone节点
  isOnce: Boolean, // 是否是一个v-once节点
  isRootInsert: Boolean, // necessary for enter transition check
  isStatic: Boolean, // 是否挂载静态节点
  key: String | Number,
  ns: String,
  parent: Object, // VNode
  raw: Boolean, // 是否包含原始HTML？（仅服务器）
  tag: String,
  text: String // <div>text<span></span></div>
}
// 常用 componentOptions data context children parent tag
