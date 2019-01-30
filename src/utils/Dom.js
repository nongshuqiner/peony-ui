import Vue from 'vue'

// getStyle
const SPECIAL_CHARS_REGEXP = /([:-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
export const camelCase = name => {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// 获取element元素样式的值
export const getStyle = (element, styleName) => {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '') // Window.getComputedStyle() 方法给出应用活动样式表后的元素的所有CSS属性的值，并解析这些值可能包含的任何基本计算。
    // 返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
    // 从getComputedStyle返回的对象是只读的，可以用于检查元素的样式，elt.style对象应用于在特定元素上设置样式
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

// 判断某个元素是否包含某个class
export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 给某个元素添加class
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return false
  } else {
    let allClass = el.className.split(' ')
    allClass.push(className)
    el.className = allClass.join(' ')
  }
}
// 给某个元素添加多个class,classNames:String/Array
export const addMultiClass = (el, classNames) => { // 给某个元素添加多个class,classNames:String/Array
  if (!el || !classNames) return
  var classes = classNames

  if (Object.prototype.toString.call(classNames) === '[object Array]') {
    classes = classNames
  } else if (Object.prototype.toString.call(classNames) === '[object String]') {
    classes = (classNames || '').split(' ')
  }

  for (var i = 0; i < classes.length; i++) {
    if (!classes[i]) continue
    addClass(el, classes[i])
  }
}
// 给某个元素删除某个class
export const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
    return false
  } else {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, '')
  }
}
// 给某个元素删除多个class,classNames:String/Array
export const removeMultiClass = (el, classNames) => { // 给某个元素删除多个class,classNames:String/Array
  if (!el || !classNames) return
  var classes = classNames

  if (Object.prototype.toString.call(classNames) === '[object Array]') {
    classes = classNames
  } else if (Object.prototype.toString.call(classNames) === '[object String]') {
    classes = (classNames || '').split(' ')
  }

  for (var i = 0; i < classes.length; i++) {
    if (!classes[i]) continue
    removeClass(el, classes[i])
  }
}

// 获取响应的鼠标按钮码
export const getMouseButtonCode = data => {
  // 'all' 或 -1：响应所有鼠标按键;'left' 或 0：响应鼠标左键；'middle' 或 1：响应鼠标滚轮（中键）；'right' 或 2：响应鼠标右键；不存在的码返回404
  let convert = { 'all': -1, 'left': 0, 'middle': 1, 'right': 2 }
  let code = [-1, 0, 1, 2]
  if (Object.prototype.toString.call(data) === '[object Number]') {
    return (code.indexOf(data) !== -1) ? data : 404
  } else if (Object.prototype.toString.call(data) === '[object String]') {
    return convert[data] ? convert[data] : 404
  } else {
    return 404
  }
}

// 获取子元素数量
export const getChildCount = el => {
  var childCount = 0
  // 如果支持childElementCount属性
  if ('childElementCount' in el) {
    childCount = el.childElementCount
  } else {
    // 如果支持children属性,IE6/7/8
    //  译者注:没有判断nodeType是否为1,可能包含注释节点.
    if (el.children) {
      childCount = el.children.length
    } else { // 如果都不支持,Firefox 3.5之前版本
      var child = el.firstChild
      while (child) {
        if (child.nodeType === 1 /* Node.ELEMENT_NODE */) { // 如果是 ELEMENT_NODE 类型，才算是子元素
          childCount++
        }
        child = child.nextSibling // Node.nextSibling 是一个只读属性，返回其父节点的 childNodes 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 null。
      }
    }
  }
  return childCount
}

// 移除一个元素节点的所有子节点，返回移除的所有子元素
export const removeAllChild = parentEle => {
  var rmEleAll = []
  while (parentEle.firstChild) {
    var rm = parentEle.removeChild(parentEle.firstChild)
    rmEleAll.push(rm)
  }
  return rmEleAll
}

// 向指定位置添加一个 元素层
export const insertTagNameLayer = (parentEle, tagName) => {
  var childAll = removeAllChild(parentEle)
  var div = insertFirstChild(parentEle, tagName)
  for (var i = 0; i < childAll.length; i++) {
    div.appendChild(childAll[i])
  }
  return div
}

// 在第一个子元素的前面插入一个 div 盒子
export const insertDivFirstChild = parentEle => {
  var div = insertFirstChild(parentEle, 'div')
  return div
}

// 在第一个子元素的前面插入一个元素
export const insertFirstChild = (parentEle, tagName) => {
  var theFirstChild = parentEle.firstChild
  var newElement = document.createElement(tagName)
  parentEle.insertBefore(newElement, theFirstChild)
  return parentEle.firstChild
}

// 在获取子元素最大的宽度
export const getChildOffsetWidth = parentEle => {
  let a = allChild(parentEle)
  return a.map(child => child.offsetWidth).sort((a, b) => b - a)[0]
}

// 在获取所有 Node.ELEMENT_NODE 的子元素
export const allChild = parentEle => {
  let a = []
  let childNodes = parentEle.childNodes
  for (var i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType === 1) {
      a.push(childNodes[i])
    }
  }
  // Array.from(parentEle.childNodes).filter(d => d.nodeType === 1)
  return a
}

// 获取页面元素中最大的z-index
export const getPageElMaxZIndex = () => {
  let numArray = Array.from(document.querySelectorAll('body *')).map(el => Number(getStyle(el, 'z-index'))).filter(z => !Number.isNaN(z))
  return Math.max.apply(
    null,
    numArray.length ? numArray : [0]
  )
}

// 获取子元素中最大的z-index
export const getChildNodeElMaxZIndex = parentEle => {
  let numArray = Array.from(allChild(parentEle)).map(el => Number(getStyle(el, 'z-index'))).filter(z => !Number.isNaN(z))
  return Math.max.apply(
    null,
    numArray.length ? numArray : [0]
  )
}

// 获取当前窗口可见的宽度和高度
export const getCurrWindowClient = () => {
  if (window.innerHeight !== undefined) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (document.compatMode === 'CSS1Compat') {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}

// 移除事件兼容处理
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

// 监听事件兼容处理
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

// 获取兄弟节点
export const getSiblingNodes = function (element) {
  var siblings = []
  var sibling = element.parentNode.firstChild
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType !== 1 || sibling === element) { continue }
    siblings.push(sibling)
  }
  return siblings
}

// 获取下一个兄弟节点
export const getNextSiblingNode = function (element) {
  do {
    element = element.nextSibling
  } while (element && element.nodeType !== 1)
  return element
  // var e = element.nextSibling
  // while(e && e.nodeType !== 1) {
  //   e = e.nextSibling
  // }
  // return e
}

// 移除当前dom节点
export const removeCurrNode = function (element) {
  element.parentNode.removeChild(element)
}

// 设置css
export const setCss = function (element, style) {
  for (var key in style) {
    element.style[key] = style[key]
  }
}

// 动画
export const animate = function (element, style, speed) {
  element.style.transition = 'all ' + speed
  Object.keys(style).forEach((key) => {
    element.style[key] = style[key]
  })
}

// scrollBar-获取滚动条的 width
/* eslint-disable no-unused-vars */
const outerStyle = {position: 'absolute', top: '-9999px', left: 0, width: '200px', height: '200px', overflow: 'hidden', visibility: 'hidden', pointerEvents: 'none'}
const isServer = Vue.prototype.$isServer // 判断当前 Vue 实例是否运行于服务器
let cached // 缓存
export const getScrollBarSize = function (fresh) {
  // 如果 document 不在，则证明不在浏览器环境，直接返回，兼容 node server render。
  if (isServer || typeof document === 'undefined' || typeof window === 'undefined') return 0
  if (fresh || cached === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style
    Object.keys(outerStyle).forEach((scrollProp) => {
      if (Object.prototype.hasOwnProperty.call(outerStyle, scrollProp)) {
        outerStyle[scrollProp] = outerStyle[scrollProp]
      }
    })
    // outerStyle.position = 'absolute'
    // outerStyle.top = 0
    // outerStyle.left = 0
    // outerStyle.pointerEvents = 'none'
    // outerStyle.visibility = 'hidden'
    // outerStyle.width = '200px'
    // outerStyle.height = '150px'
    // outerStyle.overflow = 'hidden'
    outer.appendChild(inner)
    document.body.appendChild(outer)
    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }
    document.body.removeChild(outer)

    cached = widthContained - widthScroll
  }
  return cached
}

// 判断元素出现滚动条方法
export const hasScrolled = function (el, direction = 'vertical') { // direction:vertical-垂直滚轮、horizontal-水平滚轮
  if (direction === 'vertical') {
    return el.scrollHeight > el.clientHeight
  } else if (direction === 'horizontal') {
    return el.scrollWidth > el.clientWidth
  }
}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

// 距离页面顶部的高度
export const pageScrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop

export default {
  camelCase,
  // 获取element元素样式的值
  getStyle,
  // 判断某个元素是否包含某个class
  hasClass,
  // 给某个元素添加class
  addClass,
  // 给某个元素添加多个class,classNames:String/Array
  addMultiClass,
  // 给某个元素删除某个class
  removeClass,
  // 给某个元素删除多个class,classNames:String/Array
  removeMultiClass,
  // 获取响应的鼠标按钮码
  getMouseButtonCode,
  // 获取子元素数量
  getChildCount,
  // 移除一个元素节点的所有子节点，返回移除的所有子元素
  removeAllChild,
  // 向指定位置添加一个 元素层
  insertTagNameLayer,
  // 在第一个子元素的前面插入一个 div 盒子
  insertDivFirstChild,
  // 在第一个子元素的前面插入一个元素
  insertFirstChild,
  // 在获取子元素最大的宽度
  getChildOffsetWidth,
  // 在获取所有 Node.ELEMENT_NODE 的子元素
  allChild,
  // 获取页面元素中最大的z-index
  getPageElMaxZIndex,
  // 获取子元素中最大的z-index
  getChildNodeElMaxZIndex,
  // 获取当前窗口可见的宽度和高度
  getCurrWindowClient,
  // 移除事件兼容处理
  off,
  // 监听事件兼容处理
  on,
  // 获取兄弟节点
  getSiblingNodes,
  // 获取下一个兄弟节点
  getNextSiblingNode,
  // 移除当前dom节点
  removeCurrNode,
  // 设置css
  setCss,
  // 动画
  animate,
  // scrollBar-获取滚动条的 width
  getScrollBarSize,
  // 判断元素出现滚动条方法
  hasScrolled,
  // scrollTop animation
  scrollTop,
  // 距离页面顶部的高度
  pageScrollTop
}
