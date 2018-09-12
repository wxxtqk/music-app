'use strict'
// 控制台输出颜色
const chalk = require('chalk')
// 是用来对特定的版本号做判断的
const semver = require('semver')
const packageConfig = require('../package.json')
// 用于执行unix命令
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node', // node模块名称
    currentVersion: semver.clean(process.version), // 把node版本信息格式化 如=v1.2.3 -> 1.2.3, 当前的node版本号
    versionRequirement: packageConfig.engines.node // 希望的node版号
  }
]
// 检查是否有npm，如果有就返回C:\PROGRAM FILES\NODEJS\NPM.CMD 返回绝对路径, 否则返回null
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
