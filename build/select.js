/*
 * @Author: your name
 * @Date: 2020-05-27 16:33:52
 * @LastEditTime: 2020-05-30 15:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /a3-component/select.js
 */
const inquirer = require('inquirer')
var fs = require('fs')
var path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
let conf = {}
let files = fs.readdirSync(resolve('../src/customColums'))
conf = {
  type: 'list',
  name: 'data',
  message: '请选择自定义列的文件夹',
  choices: files.map(item => ({
    name: item,
    value: item
  }))
}
// 选择自定义列的文件夹
const choicesfolder = () => {
  return new Promise((reslove, reject) => {
    inquirer.prompt(conf).then(select => {
      reslove(select.data)
    })
  })
}
// 选择自定义列打包的file
const choicesfile = url => {
  return new Promise((res, rejcet) => {
    let files = fs.readdirSync(resolve(`../src/customColums/${url}`))
    console.log(files)
    let list = {
      type: 'list',
      name: 'data',
      message: '请选择要打包自定义列的文件',
      choices: files.map(item => ({
        name: item,
        value: item
      }))
    }
    inquirer.prompt(list).then(select => {
      res({
        folder: url,
        file: select.data
      })
    })
  })

  // choicesfolder(url => {

  // })
}
async function getFile() {
  const url = await choicesfolder()
  const obj = await choicesfile(url)
  return new Promise((resolve, rejcet) => {
    resolve(obj)
  })
}
module.exports = {
  getFile
}
