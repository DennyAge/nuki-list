import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard';
import store from '@/store';

Vue.use(VueRouter)

const authGuard = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Auth/Registration')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/Shop.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/product/:id',
    props: true,
    name: 'product',
    component: () => import('../components/ProductDetails'),
    beforeEnter: authGuard
  },
  {
    path: '/promo',
    name: 'new-promo',
    component: () => import('../views/NewPromo'),
    beforeEnter: authGuard
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../views/Basket'),
    beforeEnter: authGuard
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../components/User/Orders'),
    beforeEnter: authGuard
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings'),
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
