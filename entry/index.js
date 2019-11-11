 let App = require(`../src/computents/${process.env.FILE_NAME}.vue`).default
new Vue({
    el: '#view',
    store,
    render: h => h(App)
})

