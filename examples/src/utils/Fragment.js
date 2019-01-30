/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i
  let len = routers.length
  let homeRoute = {}
  for (i = 0; i < len; i++) {
    let item = routers[i]
    if (item.name === homeName) {
      homeRoute = item
      break
    } else if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name === homeName) {
        homeRoute = res
        break
      }
    }
  }
  return homeRoute
}

/**
 * @param {Array} 当前路由metched
 * @param {String} homeName
 * @returns {Array}
 */
export const getBreadCrumbList = (matched, homeName) => {
  if (matched.some(item => item.name === homeName)) { return [] }
  return matched.map(item => {
    return {
      name: item.name,
      meta: item.meta,
      path: item.path,
      props: item.props,
      regex: item.regex,
      redirect: item.redirect
    }
  }).filter(item => {
    return !item.meta.hideInBreadcrumb
  })
}
