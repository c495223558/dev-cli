const argv = process.argv
const Filename = argv[argv.length-1]
const chalk = require('chalk')
// 定义参数配置
if(argv.length!==5){
  console.log(chalk.red('打包命令中必须包含组件名称'))
  return
}
let webpackconfig = require('./webpack.prod') 
const webpack =require('webpack')
// 执行webpack 构建
webpack(webpackconfig(Filename),(err,state)=>{
  if(err||state.hasErrors()){
    console.log(err)
    console.log(state.toString({
      colors: true
    }))
  }
  //
})