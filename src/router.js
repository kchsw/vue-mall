import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import Goods from './views/Goods'
import Category from './views/Category'
import Cart from './views/Cart'
import Main from './views/Main'
import Mine from './views/Mine'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'mine',
          name: 'mine',
          component: Mine
        }       
      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
