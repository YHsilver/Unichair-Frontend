import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
]

const router = new VueRouter({
  routes
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAdminAuth)) {
    if ((!this.$store.state.userDetails) || (this.$store.state.userDetails.username !== "admin")) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (!this.$store.state.token) {
      next({
        path: '/user',
        query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
      })
    } else if (this.$store.state.userDetails.username === "admin") {
      next({
        path: '/admin',
        query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
      })
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
