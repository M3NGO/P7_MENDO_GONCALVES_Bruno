import { createRouter, createWebHashHistory } from 'vue-router'
import Profil from '@/views/Profil.vue';
import Wall from '@/views/Wall.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
