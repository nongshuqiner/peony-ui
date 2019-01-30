import { deepCopy } from './Feedback.js'

// 根据context向下查找组件 Find components downward
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

export const sharpMatcherRegx = /#([^#]+)$/

// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export function extend (to, from) { // 拓展
  for (let key in from) {
    to[key] = from[key]
  }
  return to
}

export function getValueByPath (object, prop) { // 按路径获取值
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    if (!current) break

    if (i === paths.length - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

// 对象空值过滤函数
export const filterNull = object => {
  if (!object) { return {} }
  if (Object.prototype.toString.call(object) === '[object String]') { // 对象-递归
    object = JSON.parse(object)
  }
  for (var key in object) {
    if (object[key] === null) {
      delete object[key]
    }
    if (Object.prototype.toString.call(object[key]) === '[object String]') { // 字符串去除两边空格
      object[key] = object[key].trim()
    } else if (Object.prototype.toString.call(object[key]) === '[object Object]') { // 对象-递归
      object[key] = filterNull(object[key])
    } else if (Object.prototype.toString.call(object[key]) === '[object Array]') {
      object[key] = arrayFilterNull(object[key])
    }
  }
  return object
}

// 数组空值过滤
export const arrayFilterNull = array => {
  if (array.length === 0) { return [] }
  for (var i = 0; i < array.length; i++) {
    if (Object.prototype.toString.call(array[i]) === '[object String]') { // 字符串去除两边空格
      array[i] = array[i].trim()
    } else if (Object.prototype.toString.call(array[i]) === '[object Array]') {
      array[i] = arrayFilterNull(array[i])
    } else if (Object.prototype.toString.call(array[i]) === '[object Object]') { // 对象-递归
      array[i] = filterNull(array[i])
    }
  }
  return array.filter(item => item !== null)
}

// 删除对象多余的属性
export const delObjSurplusAttr = (data, condition) => {
  /*
    参数：object是对象，condition是数组
  */
  // if (object.constructor !== Object) { return }
  // if (condition.constructor !== Array) { return }
  if (!condition) { return data }
  var object = deepCopy(data)
  for (var i = 0; i < condition.length; i++) {
    delete object[condition[i]]
  }
  return object
}

// 去除空格
export const removeSpace = str => {
  /* str */
  if (str.constructor !== String) { return }
  var strArr = str.split(' ')
  var newStr = ''
  for (let i = 0; i < strArr.length; i++) {
    newStr = newStr + strArr[i]
  }
  return newStr
}

// byte转换
export const byteConvert = byteSize => {
  if (byteSize === 0) return '0 B'
  var KB = 1024
  var byteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var power = Math.floor(Math.log(byteSize) / Math.log(KB)) // log() 方法可返回一个数的自然对数
  // console.log(Math.log(byteSize), Math.log(KB))
  // console.log(power)
  // console.log((byteSize / Math.pow(KB, power)).toPrecision(4) + ' ' + byteUnit[power])
  // Math.pow(x, y)-x 的 y 次幂
  return (byteSize / Math.pow(KB, power)).toPrecision(4) + ' ' + byteUnit[power] // toPrecision() 方法可在对象的值超出指定位数时将其转换为指数计数法
  // 另一种方法------------------------------------------------
  // var convert = byteSize
  // for (var i = 0; i < byteUnit.length; i++) {
  //   if (convert > KB) {
  //     convert = convert / KB
  //     console.log(convert)
  //   } else {
  //     convert = Math.floor((convert * 100)) / 100
  //     console.log(convert)
  //     return convert + ' ' + byteUnit[i]
  //   }
  // }
}

// 转换时间格式为:YYYY-MM-DD
export const switchDateYYTM = dateValue => {
  if (!dateValue) { return '-' }
  // 把Date对象的值转换为YYYY-MM-DD日期类型
  var date = new Date(dateValue)
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month < 10) { month = '0' + month }
  if (strDate < 10) { strDate = '0' + strDate }
  var currentdate = date.getFullYear() + '-' + month + '-' + strDate
  return currentdate
}
// 转换时间格式为:YYYY-MM-DD hh:mm:ss
export const switchDateYYTMhms = dateValue => {
  if (!dateValue) { return '-' }
  // 把Date对象的值转换为YYYY-MM-DD hh:mm:ss日期类型
  var date = new Date(dateValue)
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var seconds = date.getSeconds()
  var minutes = date.getMinutes()
  var hours = date.getHours()
  if (month < 10) { month = '0' + month }
  if (strDate < 10) { strDate = '0' + strDate }
  if (seconds < 10) { seconds = '0' + seconds }
  if (minutes < 10) { minutes = '0' + minutes }
  if (hours < 10) { hours = '0' + hours }
  var currentdate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds
  return currentdate
}

// 间隔时间戳转换为时分秒
export const intervalTimeStampYYTMhms = timeStamp => {
  if (timeStamp === 0) return '0s'
  var days = parseInt(timeStamp / (1000 * 60 * 60 * 24))
  var hours = parseInt((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((timeStamp % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = (timeStamp % (1000 * 60)) / 1000

  return (days === 0 ? '' : days + '天') +
    (hours === 0 ? '' : hours + ' 小时 ') +
    (minutes === 0 ? '' : minutes + ' 分钟 ') +
    (seconds === 0 ? '' : seconds + ' 秒 ')
}
export const getTimeInfo = dateValue => { // 获取时间信息-返回对象
  if (!dateValue) { return {} }
  var date = new Date(dateValue)
  var month = date.getMonth() + 1 // 月份
  var day = date.getDate() // 日期
  if (month < 10) { month = '0' + month }
  if (day < 10) { day = '0' + day }
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  var dateInfo = {
    year: date.getFullYear(), // 年
    month: month,
    day: day,
    hours: date.getHours(), // 时
    minutes: minutes,
    seconds: seconds,
    week: weekArray[date.getDay()]
  }
  return dateInfo
}

// 从字符串中解析出url
export const strAnalyseURL = str => {
  // "这是一个字符串 https://www.baidu.com/ http://www.baidu.com/?fdsajlkfd/#dfdaslfd/fdsaf 里面有这个网址 http://fanyi.baidu.com"
  let urlRegex = /(http|https|ftp|rtsp|mms):\/\/\S*/g
  let matchArray = []
  let isUrl = str.search(urlRegex) !== -1 // 是否存在url
  let execArray
  let lastIndex = 0
  // console.log(isUrl)
  while ((execArray = urlRegex.exec(str)) !== null) {
    // let matchLength = execArray[0].length
    // let endIndex = Number(execArray.index) + matchLength
    let lastContent = str.slice(lastIndex, execArray.index)
    matchArray.push({ init_index: execArray.index, end_index: urlRegex.lastIndex, url: execArray[0], last_content: lastContent })
    lastIndex = urlRegex.lastIndex
  }
  let cullStr = str.replace(/\s*(http|https|ftp|rtsp|mms):\/\/\S*/g, req => {
    /* eslint-disable no-return-assign */
    return req = ''
  }) // 剔除后的字符串
  return {
    macth: matchArray, // 匹配的解析结果
    cull: cullStr, // 裁剪后的字符串
    init: str, // 初始字符串
    is_url: isUrl // 是否存在url
  }
}

// startDate-开始时间, endDate-结束时间, effectNum-影响数(用来做为判断天数是否超出此数字)
export const getDateDifferInfor = (startDate, endDate, effectNum) => {
  var startTime = new Date(startDate).getTime() // 开始时间时间戳
  var endTime = new Date(endDate).getTime() // 结束时间时间戳
  let intervalTimeStamp = Math.abs(startTime - endTime) // 间隔时间戳

  let daysTimeStampMeta = 1000 * 60 * 60 * 24 // 一天的时间戳元位
  let hoursTimeStampMeta = 1000 * 60 * 60 // 一小时的时间戳元位
  let effectNumStampMeta = effectNum * daysTimeStampMeta

  let intervalDays = Math.floor(intervalTimeStamp / daysTimeStampMeta) // 获取间隔天数
  // 获取间隔小时:'2017-12-04 09:49:12', '2017-12-22 08:00:12', 20:interval_hour:22.183333333333334
  let intervalHour = Math.round((intervalTimeStamp - intervalDays * daysTimeStampMeta) / hoursTimeStampMeta)

  let overstepDays = 0 // 超出effectNum影响数的天数，超出部分是正数，未超出部分是负数，可通过 0< 和 >0 来区分
  let overstepHour = 0 // 超出天数之下的超出小时
  let surplusDays = 0 // 剩余天数
  let surplusHour = 0 // 剩余小时
  // if (effectNum) {
  //   overstepDays = Number(intervalDays - effectNum).toFixed() // 差几个小时的间隔天数：19.916666666666668 - 影响数20天，间隔天数为0
  //   // overstepDays = Number(((intervalTimeStamp / daysTimeStampMeta) - effectNum).toFixed()) // 差几个小时的间隔天数：19.916666666666668 - 影响数20天，间隔天数为0
  //   overstepHour = intervalHour === 0 ? 0 : 24 - intervalHour
  // }
  if (intervalTimeStamp > effectNumStampMeta) {
    overstepDays = intervalDays - effectNum
    overstepHour = Math.round((intervalTimeStamp - effectNumStampMeta - overstepDays * daysTimeStampMeta) / hoursTimeStampMeta)
  } else {
    surplusDays = Math.floor((effectNumStampMeta - intervalTimeStamp) / daysTimeStampMeta)
    surplusHour = 24 - intervalHour
  }
  return {
    interval_days: intervalDays, // 间隔天数
    interval_hour: intervalHour, // 间隔小时
    overstep_days: overstepDays, // 超出effectNum影响数的天数
    overstep_hour: overstepHour, // 超出天数之下的超出小时
    surplus_days: surplusDays, // 剩余天数
    surplus_hour: surplusHour // 剩余小时
  }
  // 测试数据
  // getDateDifferInfor('2017-12-04 09:49:12', new Date(), 20)
  // getDateDifferInfor('2017-12-04 09:49:12', '2017-12-22 08:00:12', 20)
}

// 获取随机整数不定数组，前一个和后一个不同
export const getRandomIntIndefiniteArray = (min, max, length) => {
  // 调用getRandomIntIndefiniteArray(0, 9, 10)
  if (!(min < max)) {
    return new Error('max一定要大于min')
  }
  function getRandomInt (last, min, max) {
    let randomNum = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
    // console.log(last, randomNum)
    if (randomNum !== last) {
      return randomNum
    } else {
      return getRandomInt(last, min, max)
    }
  }
  var a = []
  for (var i = 0; i < length; i++) {
    let rannum = getRandomInt(a.length ? a[a.length - 1] : max, min, max)
    a.push(rannum)
  }
  return a
}

export const getDaysTimestamp = (days) => { // 获取天数的时间戳
  return 1000 * 60 * 60 * 24 * days
}

export const getDaysAfterTimestamp = (time, days) => { // 获取当前时间多少天数之后的时间戳
  return (new Date(time).getTime()) + getDaysTimestamp(days)
}

// base64转换为Blob
export const bs64toBlob = (bs64Data, contentType, sliceSize) => {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = window.atob(bs64Data) // WindowOrWorkerGlobalScope.atob() 对用base-64编码过的字符串进行解码，基本兼容所有浏览器
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export default {
  // 根据context向下查找组件 Find components downward
  findComponentsDownward,
  // 判断参数是否是其中之一
  oneOf,
  // 拓展
  extend,
  // 按路径获取值
  getValueByPath,
  // 对象空值过滤函数
  filterNull,
  // 数组空值过滤
  arrayFilterNull,
  // 删除对象多余的属性
  delObjSurplusAttr,
  // 去除空格
  removeSpace,
  // byte转换
  byteConvert,
  // 转换时间格式为:YYYY-MM-DD
  switchDateYYTM,
  // 转换时间格式为:YYYY-MM-DD hh:mm:ss
  switchDateYYTMhms,
  // 间隔时间戳转换为时分秒
  intervalTimeStampYYTMhms,
  // 获取时间信息-返回对象
  getTimeInfo,
  // 从字符串中解析出url
  strAnalyseURL,
  // startDate-开始时间, endDate-结束时间, effectNum-影响数(用来做为判断天数是否超出此数字)
  getDateDifferInfor,
  // 获取随机整数不定数组，前一个和后一个不同
  getRandomIntIndefiniteArray,
  // 获取天数的时间戳
  getDaysTimestamp,
  // 获取当前时间多少天数之后的时间戳
  getDaysAfterTimestamp,
  // base64转换为Blob
  bs64toBlob
}
