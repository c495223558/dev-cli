const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const path =require('path')
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