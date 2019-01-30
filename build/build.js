'use strict'
// "build": "node build/build.js"
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora') // 优雅的终端微调器
const rm = require('rimraf') // 用来删除文件与文件夹
const path = require('path') // 处理路径 path.join:连接路径；path.resolve([from ...], to):将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径；
const chalk = require('chalk') // 控制台字符样式
const webpack = require('webpack')
const config = require('../config') // 引入配置相关
const webpackConfig = require('./webpack.build.min') // 引入打包环境

const terminal = ora('构建生产环境...') // 优雅的终端微调器
terminal.start() // 开启终端微调效果

// rm 根路径下的资源文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 打包环境的配置进行打包
  webpack(webpackConfig, (err, stats) => {
    terminal.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  错误: 构建失败.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.(提示：构建文件是要在HTTP服务器上运行的.)\n' +
      '  Opening index.html over file:// won\'t work.(打开 index.html 无法在 file:// 上工作)\n'
    ))
  })
})
