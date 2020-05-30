/*
 * @Author: your name
 * @Date: 2020-05-27 17:33:41
 * @LastEditTime: 2020-05-27 18:20:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /a3-component/build/colums.js
 */
let webpackconfig = require('./webpack.colums.js')
const webpack = require('webpack')
const FILE_INFO = require('./select')
FILE_INFO.getFile().then(res => {
  console.log('res:', res)
  let filename = res.file.split('.')[0]
  console.log('filename:', filename)
  let columsUrl = `${res.folder}/${res.file}`
  console.log('columsUrl:', columsUrl)
  webpack(webpackconfig({ filename, columsUrl }), (err, state) => {
    if (err || state.hasErrors()) {
      console.log(err)
      console.log(
        state.toString({
          colors: true
        })
      )
      process.exit(7)
    }
  })
})

// webpack(webpackconfig(Filename), (err, state) => {
//   if (err || state.hasErrors()) {
//     console.log(err)
//     console.log(
//       state.toString({
//         colors: true
//       })
//     )
//     process.exit(7)
//   }
// })
