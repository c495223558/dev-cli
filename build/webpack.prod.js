/**
 * 单独打包某个插件
 * 
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const argv = process.argv;
let public;
module.exports = (filename) => {
  public = common();
  if(argv[4] === '_phone') {
    public.module.rules.forEach(val => {
      let temp = val.test + '';
      if(temp.indexOf('.css') !== -1 || temp.indexOf('.scss') !== -1 || temp.indexOf('.less') !== -1) {
        val.use.push({loader: "postcss-loader"})
      }
    })
  }
  return merge(public, {
    entry: () => {
      return {
        [filename]: '../entry/index.js'
      }
    },
    output:{
      libraryTarget: 'amd'
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