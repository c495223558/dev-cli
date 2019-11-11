/**
 * 单独打包某个插件
 * 
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = (filename) => {
  return merge(common(), {
    entry: () => {
      return {
        [filename]: '../entry/index.js'
      }
    },
    mode: 'production',
    // devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          FILE_NAME: JSON.stringify(filename)
        }
      })
    ]
  });
}