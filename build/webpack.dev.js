const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
console.log(__dirname)
module.exports = (filename) => {
  return merge(common(),  {
    mode: 'development',
    entry: () => {
      return {
       entry: '../entry/dev.js'
      }
    },
    devtool: 'source-map',
    devServer: {
      contentBase: "./dist",
    },
    plugins:[
       new HtmlWebpackPlugin({
         title: '管理输出',
         template: '../src/index.html'
       }),
       new webpack.DefinePlugin({
        'process.env': {
          FILE_NAME: JSON.stringify(filename)
        }
      })
    ]
  });
}