/**
 * 单独打包按钮组件
 * 
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = (filename) => {
  return merge(common(), {
    entry: () => {
      return {
        [filename]: '../entry/customer.js'
      }
    },
    output: {
      libraryTarget: 'umd'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          FILE_NAME: JSON.stringify(filename)
        }
      })
    ]
  });
}