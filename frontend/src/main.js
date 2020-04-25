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

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 判断是否有token，若存在，每个http header加上token
      // console.log('token exist');
      // xhr.setRequestHeader("token", store.state.token); 
      config.headers.token = store.state.token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response)
    if (error) {
      // 清除token 如果不是/
      store.commit('logout')
      router.currentRoute.path !== '/' &&
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.path }
        })
    }
    // 注意这里是返回了整条信息！！！
    return Promise.reject(error.response)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
