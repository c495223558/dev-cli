// 定义参数配置
const argv = require('yargs').argv

// 获取环境变量
const env = argv.env
process.stdout.write('运行的环境是' + env +'\n')

// require制指定的环境配置文件
const envConfigFile = '../config/' + env + '.env.js'
process.stdout.write('运行的环境配置文件是' + envConfigFile +'\n')

// 将require的配置文件原封不动的export暴露出去
module.exports = require(envConfigFile)