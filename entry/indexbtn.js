let App = require(`../src/computents/${process.env.FILE_NAME}.vue`).default
if (typeof window !== 'undefined'&& window.Vue) {
  if(!window.mamListCustombtns)
  window.mamListCustombtns={}
  window.mamListCustombtns[App.name]= App
 }else{
  console.error('环境异常')
 }