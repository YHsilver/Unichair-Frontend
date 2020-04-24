import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

//axios 配置
var axios = require('axios')
// Axios挂载到prototype，全局可以使用this.$axios访问
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"

let ROOT;
if (process.env.NODE_ENV === 'development') {
  ROOT = "/api";                        //开发环境下的代理地址，解决本地跨域
} else {
  ROOT = 'http://114.115.246.37:80';    //生产环境下的地址
}
axios.defaults.baseURL = ROOT;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
