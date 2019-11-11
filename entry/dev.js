import Vue from 'vue'
// import app from 
// console.log(app)
const app= require(`../src/computents/${process.env.FILE_NAME}.vue`).default
new Vue({
  render: h => h(app)
}).$mount("#view");