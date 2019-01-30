'use strict'
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

baseWebpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
  })
)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      baseWebpackConfig.devServer.port = port

      baseWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${baseWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(baseWebpackConfig)
    }
  })
})
