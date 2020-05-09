import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/user',
    redirect: "/user/ConferenceSquare",
    name: 'User',
    meta: { requireAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User'),
    children: [
      { path: "ConferenceSquare", name: 'ConferenceSquare', component: () => import("@/components/userComponents/ConferenceSquare"), meta: { requireAuth: true } },
      { path: "NewApplication", name: 'NewApplication', component: () => import("@/components/userComponents/NewApplication"), meta: { requireAuth: true } },
      { path: "MyApplication", name: 'MyApplication', component: () => import("@/components/userComponents/MyApplication"), meta: { requireAuth: true } },
      { path: "MyConference", name: 'MyConference', component: () => import("@/components/userComponents/MyConference"), meta: { requireAuth: true } },
      { path: "Messages", name: 'Messages', component: () => import("@/components/userComponents/Messages"), meta: { requireAuth: true } },
      { path: "UserInfo", name: 'UserInfo', component: () => import("@/components/userComponents/UserInfo"), meta: { requireAuth: true } },
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/Conferencelist',
    name: 'Admin',
    meta: { requireAdminAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin'),
    children: [
      { path: "Conferencelist", name: 'Conferencelist', component: () => import("@/components/adminComponents/Conferencelist"), meta: { requireAdminAuth: true } }
    ]
  },
]

const router = new VueRouter({
  routes
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAdminAuth) && to.matched.some(record => record.meta.requireAuth) && !store.state.token) {
    next({
      path: '/',
      query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
    })
    document.getElementById("login").click()
  }
  else if (to.matched.some(record => record.meta.requireAdminAuth)) {
    let axios = require('axios');
    axios.post('/token', { token: store.state.token }).then((resp) => {
      if (resp.status === 200) {
        let username = resp.data.username;
        if (username !== "admin") {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
          document.getElementById("login").click()
        } else {
          next()
        }
      } else {
        next()
      }
    })
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    let axios = require('axios');
    axios.post('/token', { token: store.state.token }).then((resp) => {
      if (resp.status === 200) {
        let username = resp.data.username;
        if (username === "admin") {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
          document.getElementById("login").click()
        } else {
          next()
        }
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
