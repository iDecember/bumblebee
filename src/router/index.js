import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Welcome from '../pages/Welcome.vue'
import Users from '../pages/user/Users.vue'
import show from '../pages/show.vue'
import qs from 'qs'
import {
  cmp
} from 'semver'
/* import login from './pags/login.vue' */
/* const index = () => import('../pages/index.vue') */
const login = () => import('../pages/login.vue')



Vue.use(Router)
Vue.use(qs)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [{
        path: '/Welcome',
        component: Welcome
      }, {
        path: '/shopInfo',
        component: Users
      } 
      ]
    },
    {
      path: '/show',
      component: show
    }
    /* {
      path: '/home',
      name: 'home',
      component: index,
      redirect: '/shopInfo',
      children: [
        {
          path: '/shopInfo',
          name: 'shopInfo',
          component: shopInfo
        },
        {
          path: '/mtHistory',
          name: 'mtHistory',
          component: mtHistory
        }]
    } */

  ]
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
