// 判断类型:如果你要判断的是基本数据类型或JavaScript内置对象，使用toString； 如果要判断的时自定义类型，请使用instanceof
export function judgeBaseType (judge, type) {
  // console.log(judge, type)
  let arr = ['object', 'null', 'undefined', 'array', 'number', 'string', 'boolean']
  if (arr.indexOf(type) === -1) {
    console.log('请传入正确的type类型')
    return
  }
  if (({}).toString.call(judge).match(/\s([a-zA-Z]+)/)[1].toLowerCase() === type) {
    return true
  }
  return false
}

// 判断是否是有意义的数据: 有意义则返回true
export function isMeaningfulData (data) {
  if (data !== null && data !== undefined && data !== '') {
    return true
  } else {
    return false
  }
}

// 判断对象是否为空
export function judgeIsNullObject (object) { // 判断对象是否为空
  if (!object) { return true }
  // 第一种方法
  for (var i in object) { // 如果不为空，则会执行到这一步，返回false
    return false
  }
  return true // 如果为空,返回true
  // 第二种方法
  // return Object.keys(object).length === 0
  // 第三种方法
  // return JSON.stringify(data) === '{}'
}

// 是否是可迭代对象
export function isIterable (obj) { // 是否是可迭代对象
  // checks for null and undefined
  if (obj === undefined || obj === null) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

// 是否是对象
export function isObject (data) { // 是否是对象
  return Object.prototype.toString.call(data) === '[object Object]'
}

// 判断文件允许格式是否正确
export function judgeFileFormat (strValue, allowFormat) { // 判断文件允许格式是否正确
  /* strValue：需要判断的filename(字符串)；allowFormat：允许的格式(数组) */
  if (strValue.constructor === String) { // 判断字符串形式
    if (strValue.indexOf('.') === -1) {
      return false
    }
    if (allowFormat.lenght === 0) { return false }
    let arrSplit = strValue.split('.')
    // 如果在allowFormat中找到了匹配的值则return-true，不然没有找到则返回false
    for (var item = 0; item < allowFormat.length; item++) {
      if (arrSplit[arrSplit.length - 1].toLowerCase() === allowFormat[item].toLowerCase()) {
        return true
      }
    }
    return false
  } else {
    return false
  }
}

// 判断对象的值是不是Date即日期类型
export function judgeIsDate (objValue) {
  if (objValue instanceof Date) { // 如果是，则会执行到这一步，返回true
    return true
  }
  return false // 如果不是,返回false
}

// 自定义正则表达式验证
export function customRegExp (Regexp, value) {
  /*
    说明：customRegExp进行自定义正则表达式验证，参数：Regexp(必填)-正则表达式,value(必填)-要验证的内容
  */
  if (new RegExp(Regexp).test(value)) {
    return true
  }
  return false
}

// 判断是否符合YYYY-MM-DD模式的，如果是则返回true
export function validatorDateYYTM (dateObjValue) {
  if (new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/).test(dateObjValue)) {
    return true
  }
  return false // 如果不是,返回false
}

// 判断是否为闰年
export function isLeapYear () {
  // 闰年能被4整除且不能被100整除，或能被400整除
  return (this.getYear() % 4 === 0 && ((this.getYear() % 100 !== 0) || (this.getYear() % 400 === 0)))
}

// 判断是否为英文的，如果是则返回true
export function isEnglish (value) {
  if (new RegExp(/^[a-zA-Z]+$/).test(value)) {
    return true
  }
  return false // 如果不是,返回false
}

// 判断是否为中文的，如果是则返回true
export function isChinese (value) {
  if (new RegExp(/^[\u4e00-\u9fa5]+$/).test(value)) {
    return true
  }
  return false // 如果不是,返回false
}

// 判断数组中是否存在 value
export function arrayOneof (value, validList) {
  if (validList.indexOf(value) !== -1) {
    return true
  }
  return false
}

// 判断字符串是不是url-http://www.jb51.net/article/96151.htm
export function judgeIsUrl (str) {
  /* eslint-disable operator-linebreak */
  /* eslint-disable quotes */
  /* eslint-disable no-useless-escape */
  var urlRegexStr = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  var urlRegex = new RegExp(urlRegexStr, 'g')
  return urlRegex.test(str)
}

// 判断是否为isBase64的，如果是则返回true
export function isBase64 (value) { // 判断是否为base64
  if (new RegExp(/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i).test(value)) {
    return true
  }
  return false // 如果不是,返回false
}

// 判断数组中包含的元素是不是全部是对象
export function isArrayIncludeObject (array) {
  if (Object.prototype.toString.call(array) !== '[object Array]') {
    return false
  }
  return array.every(a => {
    return ({}).toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase() === 'object'
  })
}

// list中的type是否存在
export function isListIntoType (list, type) {
  if (Object.prototype.toString.call(list) !== '[object Array]') {
    try { throw new Error('isListIntoType 接受的是一个数组,但是却得到一个' + typeof filterArray) } catch (e) {
      console.error(e)
      return false
    }
  }
  if (!type) {
    console.error('isListIntoType 接受的type不存在')
    return false
  }
  return !!list.find(item => item.type === type)
}

// 判断对象中的值是否都为真
export function objectInAllValueTrue (object) {
  for (var key in object) {
    if (!isMeaningfulData(object[key])) { // 如果有一个值没有意义则返回false
      return false
    }
  }
  return true
}

export default {
  // 判断类型
  judgeBaseType,
  // 判断是否是有意义的数据: 有意义则返回true
  isMeaningfulData,
  // 判断对象是否为空
  judgeIsNullObject,
  // 是否是可迭代对象
  isIterable,
  // 是否是对象
  isObject,
  // 判断文件允许格式是否正确
  judgeFileFormat,
  // 判断对象的值是不是Date即日期类型
  judgeIsDate,
  // 自定义正则表达式验证
  customRegExp,
  // 判断是否符合YYYY-MM-DD模式的，如果是则返回true
  validatorDateYYTM,
  // 判断是否为闰年
  isLeapYear,
  // 判断是否为英文的，如果是则返回true
  isEnglish,
  // 判断是否为中文的，如果是则返回true
  isChinese,
  // 判断数组中是否存在 value
  arrayOneof,
  // 判断字符串是不是url-http://www.jb51.net/article/96151.htm
  judgeIsUrl,
  // 判断是否为isBase64的，如果是则返回true
  isBase64,
  // 判断数组中包含的元素是不是全部是对象
  isArrayIncludeObject,
  // list中的type是否存在
  isListIntoType,
  // 判断对象中的值是否都为真
  objectInAllValueTrue
}
