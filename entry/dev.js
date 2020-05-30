import Vue from 'vue'
// import app from 
// console.log(app)
const app = require(`../src/component/${process.env.FILE_NAME}.vue`).default
new Vue({
  render: h => h(app)
}).$mount("#view");