let App = require(`../src/component/${process.env.FILE_NAME}.vue`).default
console.log('%c%s', 'color:red', 'App')
new Vue({
  el: '#customize',
  store,
  render: h => h(App)
})
