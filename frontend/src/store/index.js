import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || null,
    userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || null
  },
  mutations: {
    // 添加token
    login (state, data) {
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('userDetails', JSON.stringify(data.userDetails))
      state.userDetails = data.userDetails
      state.token = data.token
    },
    logout (state) {
      // 移除token
      localStorage.removeItem('token')
      localStorage.removeItem('userDetails')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userDetails')
      state.userDetails = null
      state.token = null
    }
  },
  actions: {
  },
  modules: {
  }
})
