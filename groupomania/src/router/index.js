import Vue from 'vue'
import VueRouter from 'vue-router'
import Profil from '@/views/Profil.vue';
import Wall from '@/views/Wall.vue'
import Login from '@/components/Login.vue'
import MonActivite from '@/views/MonActivite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/inscription',
  //   name: 'Signup',
  //   component: Signup
  // },

  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/activite',
    name: 'MonActivite',
    component: MonActivite
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
