import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/home', redirect: '/', },
  {
    path: '/user',
    redirect: "/user/ConferenceSquare",
    name: 'User',
    meta: { requireAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/User'),
    children: [
      { path: "ConferenceSquare", name: 'ConferenceSquare', component: () => import("@/views/user/ConferenceSquare"), meta: { requireAuth: true } },
      { path: "NewApplication", name: 'NewApplication', component: () => import("@/views/user/NewApplication"), meta: { requireAuth: true } },
      { path: "MyApplication", name: 'MyApplication', component: () => import("@/views/user/MyApplication"), meta: { requireAuth: true } },
      { path: "MeParticipated", name: 'MeParticipated', component: () => import("@/views/user/MeParticipated"), meta: { requireAuth: true } },
      { path: "Messages", name: 'Messages', component: () => import("@/views/user/Messages"), meta: { requireAuth: true } },
      { path: "UserInfo", name: 'UserInfo', component: () => import("@/views/user/UserInfo"), meta: { requireAuth: true } },
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/Conferencelist',
    name: 'Admin',
    meta: { requireAdminAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../pages/Admin'),
    children: [
      { path: "Conferencelist", name: 'Conferencelist', component: () => import("@/views/admin/AuditConference"), meta: { requireAdminAuth: true } }
    ]
  },
  {
    path: "/404",
    name: "non-existing",
    component: () => import(/* webpackChunkName: "about" */ '../pages/NonExisting'),
  }, {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  },
  {
    // 会匹配所有路径
    path: '*',
    redirect: '/404',
  }
]

const router = new VueRouter({
  routes
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if ((to.matched.some(record => record.meta.requireAdminAuth) || to.matched.some(record => record.meta.requireAuth)) && !store.state.token) {
    next({
      path: '/',
      query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
    })
    if (document.getElementById("login")) document.getElementById("login").click()
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
          if (document.getElementById("login")) document.getElementById("login").click()
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
        if (!username || username === "admin") {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
          if (document.getElementById("login")) document.getElementById("login").click()
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
