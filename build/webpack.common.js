const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const envConfig = require('./webpack.env.conf')
const webpack = require('webpack');
module.exports = function () {
  return {
    context: path.resolve(__dirname, '../enty'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@vue/babel-preset-jsx"]
          }
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      {
        test:/\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        // options: {
        //   limit: 8192
        // },
         exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader',
          // options: { importLoaders: 1 } // translates CSS into CommonJS
        }, {
          loader: 'less-loader', 
        }]
      }]
    },
    externals:[
      {
        vue: 'Vue',//  window.Vue  
        vant:'vant',
        axios:'axios',// value:window.axios  key:  import axios form 'axiso'
        vuex:'vuex',
        'element-ui':'Element'
      }
     ],
    resolve: {
      alias: {
        '@': path.join(__dirname, '../src')
      },
      enforceExtension: false,
      extensions: ['.js', '.json', '.vue'],
    },
    plugins: [
      // 请确保引入这个插件！
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': envConfig
      })
    ]
  }
}