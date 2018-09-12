'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
// loading插件,用于在cmd上显示打包加载的文件
const ora = require('ora')
// 类似于rm- rf命令行, 删除之前打包的文件，防止打包后文件越来越多
const rm = require('rimraf')
const path = require('path')
// 在cmd输出的文字带颜色
const chalk = require('chalk')
const webpack = require('webpack')
// 其中的配置文件
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
// 在cmd命令行输出提示的文字
const spinner = ora({
  color: 'green',
  text: '小may同学正在为您打包，耐心点儿,请不要关机，谢谢'
})
spinner.start()
// 调用rm方法，第一个参数的结果就是 绝对/工程名/dist/static，表示删除这个路径下面的所有文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
  if (err) throw err
  // 文件开始打包
  webpack(webpackConfig, (err, stats) => {
    // 停止loading,转圈圈动画
    spinner.stop()
    // 抛出异常
    if (err) throw err
    // 没有错误就执行下面的代码，process.stdout.write和console.log类似，输出对象
    process.stdout.write(stats.toString({
      colors: true, // 增加控制台颜色开关
      modules: false, // 不增加内置模块信息
      children: false, // 不增加子级信息
      chunks: false, // 允许较少的输出
      chunkModules: false // 不将内置模块的信息加到包信息
    }) + '\n\n')
    // 如果有错误模板 显示错误提示
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 打包完成
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
