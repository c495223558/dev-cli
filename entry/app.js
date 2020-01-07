import Vue from 'vue'
import 'lib-flexible';
import Vant from 'vant';
Vue.use(Vant);

const App= require(`../src/computents/${process.env.FILE_NAME}.vue`).default
new Vue({
  render: h => h(App)
}).$mount('#view')