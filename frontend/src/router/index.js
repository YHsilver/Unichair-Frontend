import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      requireAuth: true,// 需要登录权限
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requireAdminAuth: true,// 需要登录权限
    },
    component: () => import('../views/Admin.vue')
  },
]

const router = new VueRouter({
  routes
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAdminAuth)) {
    if (!store.state.token) {
      next({
        path: '/',
        query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
      })
    } else if (store.state.userDetails.username !== "admin") {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.token) {
      next({
        path: '/',
        query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
      })
    }
    else {
      next();
    }
  } else {
    next()
  }
})

export default router
