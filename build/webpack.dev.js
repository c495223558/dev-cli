const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const path =require('path')
const argv = process.argv;
let public;
module.exports = (filename) => {
  // 当运行的是移动端的时候添加postcss的配置
  public = common();
  if(argv[4] === '_phone') {
    public.module.rules.forEach(val => {
      let temp = val.test + '';
      if(temp.indexOf('.css') !== -1 || temp.indexOf('.scss') !== -1 || temp.indexOf('.less') !== -1) {
        val.use.push({loader: "postcss-loader"})
      }
    })
  }
  return merge(public,  {
    mode: 'development',
    entry: () => {
      if(argv[4] === '_phone'){
        return {
          entry: '../entry/app.js'
        }
      }
      return {
       entry: '../entry/dev.js'
      }
    },
    devtool: 'source-map',
    devServer: {
      contentBase: "/",
      publicPath:"/"
    },
    plugins:[
      new webpack.DefinePlugin({
        'process.env': {
          FILE_NAME: JSON.stringify(filename),
          BASE_URL:"'/'"
        }
      }),
      new HtmlWebpackPlugin({
        title: '管理输出',
        template: '../public/index.html'
      }),
      new copyWebpackPlugin([{
        from: path.join(__dirname,'../public'),
        to:path.join(__dirname,'../dist')
      }])
    ]
  });
}