import Vue from 'vue'
import VueRouter from 'vue-router'
import Participate from '../views/Participate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/participate'
  },
  {
    path: '/participate',
    name: 'participate',
    component: Participate
  }
]

const router = new VueRouter({
  routes
})

export default router
