// 开发阶段配置
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    // index.html → main.js
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的 html
      template: 'index.html', // 来源的 html
      inject: true, // 是否开启注入
      chunks: ['app'] //需要引入的Chunk，不配置就会引入所有页面的资源,引用的名称就是你在 webpack.base.conf.js 入口定义的名字
    }),

    // hello.htm → hello.js
    new HtmlWebpackPlugin({
      filename: 'hello.html', // 生成的 html
      template: 'hello.html', // 来源的 html
      inject: true, // 是否开启注入
      chunks: ['hello'] //需要引入的Chunk，不配置就会引入所有页面的资源,引用的名称就是你在 webpack.base.conf.js 入口定义的名字
    }),

    new FriendlyErrorsPlugin()
  ]
})
