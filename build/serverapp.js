const argv = process.argv
const Filename = argv[argv.length-1]
const chalk = require('chalk')
// 定义参数配置
if(argv.length!==6){
  console.log(chalk.red('打包命令中必须包含组件名称'))
  return
}
// node.js 开启热加载
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.dev');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config(Filename), options);
const compiler = webpack(config(Filename));
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});