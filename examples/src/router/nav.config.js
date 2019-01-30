/**
 * @description
 * name: 名称（必填）
 * path: 路径（必填）
 * groups: [{...}]
 *  groupName: { String } 分组名称
 *  list: Array [{...}] 列表
 *    path: 路径
 *    title: 标题
 */

export default {
  'zh-CN': [
    {
      "name": "更新日志",
      "href": "https://github.com/nongshuqiner"
    },
    {
      'name': '开发指南',
      'children': [
        {
          'path': '/installation',
          'name': '安装'
        },
        {
          'path': '/quickstart',
          'name': '快速上手'
        },
        {
          'path': '/i18n',
          'name': '国际化'
        },
        {
          'path': '/custom-theme',
          'name': '自定义主题'
        }
        // {
        //   'path': '/transition',
        //   'name': '内置过渡动画'
        // }
      ]
    },
    {
      'name': '组件',
      'groups': [
        {
          'groupName': '导航',
          'list': [
            {
              'path': '/affix',
              'title': 'Affix 图钉'
            },
            {
              'path': '/anchor',
              'title': 'Anchor 锚点'
            },
            {
              'path': '/nav-menu',
              'title': 'NavMenu 导航菜单'
            }
          ]
        },
        {
          'groupName': 'form',
          'list': [
            {
              'path': '/upload',
              'title': 'Upload 上传组件'
            }
          ]
        },
        {
          'groupName': '视图',
          'list': [
            {
              'path': '/avatar',
              'title': 'Avatar 头像'
            },
            {
              'path': '/conclusion-card',
              'title': 'Conclusion 断言卡片'
            },
            {
              'path': '/title-card',
              'title': 'TitleCard 标题卡片'
            },
            {
              'path': '/correspond',
              'title': 'Correspond 对应'
            },
            {
              'path': '/deflist',
              'title': 'Deflist 列表'
            },
            {
              'path': '/divider',
              'title': 'Divider 分隔线'
            },
            {
              'path': '/summary',
              'title': 'Summary 概要列表'
            },
            {
              'path': '/timeline',
              'title': 'Timeline 时间线'
            },
            {
              'path': '/title',
              'title': 'Title 标题'
            }
          ]
        },
        {
          'groupName': '图表',
          'list': [
            {
              'path': '/circle',
              'title': 'Circle 进度环'
            },
            {
              'path': '/similar-table',
              'title': 'SimilarTable 类表格组件'
            }
          ]
        },
        {
          'groupName': '其他',
          'list': [
            {
              'path': '/backtop',
              'title': 'Backtop 回到顶部'
            },
            {
              'path': '/draggable',
              'title': 'draggable 拖拽'
            },
            {
              'path': '/image-light',
              'title': 'ImageLight 照片灯箱'
            },
            {
              'path': '/loading-bar',
              'title': 'LoadingBar 加载条'
            },
            {
              'path': '/panels',
              'title': 'Panels 控制面板'
            },
            {
              'path': '/time',
              'title': 'Time 相对时间'
            },
            {
              'path': '/widget',
              'title': 'Widget 窗口小部件'
            }
          ]
        }
      ]
    }
  ]
  // 'en-US': []
}
