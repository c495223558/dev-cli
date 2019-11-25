let App = require(`../src/computents/${process.env.FILE_NAME}.vue`).default
if (typeof window !== 'undefined'&& window.Vue) {
  if(window.mamCustombtns)
  window.mamCustombtns={}
  window.mamCustombtns[App.name]= App
 }else{
  console.error('环境异常')
 }