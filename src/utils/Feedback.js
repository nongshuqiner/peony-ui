// 获取数据类型
export function dataType (data) { // 获取数据类型
  return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 深拷贝
export function deepCopy (data) { // 深拷贝
  /* 参数：data-需要深拷贝的数据 */
  if (!data) { return data } // null, undefined values check
  var types = [ Number, String, Boolean ]
  var result
  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (data instanceof type) {
      result = type(data)
    }
  })
  if (typeof result === 'undefined') {
    if (Object.prototype.toString.call(data) === '[object Array]') {
      result = []
      data.forEach((child, index, array) => {
        result[index] = deepCopy(child)
      })
    } else if (typeof data === 'object') {
      // DOM
      if (data.nodeType && typeof data.cloneNode === 'function') {
        result = data.cloneNode(true)
      } else if (!data.prototype) { // check that this is a literal
        if (data instanceof Date) {
          result = new Date(data)
        } else {
          // it is an object literal
          result = {}
          for (var i in data) {
            result[i] = deepCopy(data[i])
          }
        }
      } else {
        // 取决于你在这里想要什么，只保留引用，或者创建新对象
        if (data.constructor) {
          result = new data.constructor()
        } else {
          result = data
        }
      }
    } else {
      result = data
    }
  }
  return result
}

// 获取url解析后的对象
export function getUrlQuery (url) {
  let querys = window.location.search.slice(1).split('&')
  let params = {}
  for (let i = 0; i < querys.length; i++) {
    let item = querys[i].split('=')
    params[item[0]] = item[1]
  }
  return params
}

export default {
  // 获取数据类型
  dataType,
  // 深拷贝
  deepCopy,
  // 获取url解析后的对象
  getUrlQuery
}
