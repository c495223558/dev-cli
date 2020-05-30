/*
 * @Author: your name
 * @Date: 2020-05-27 17:19:55
 * @LastEditTime: 2020-05-27 18:16:22
 * @LastEditors: Please set LastEditors
 * @Description:自定义列的打包配置
 * @FilePath: /a3-component/build/customColums.js
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = ({ filename, columsUrl }) => {
  return merge(common(), {
    entry: () => {
      return {
        [filename]: '../entry/colums.js'
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
          FILE_NAME: JSON.stringify(filename),
          COLUMS_URL: JSON.stringify(columsUrl)
        }
      })
    ]
  })
}
