import Vue from 'vue'
import VueRouter from 'vue-router'
import Profil from '@/views/Profil.vue';
import Wall from '@/views/Wall.vue'
import Login from '@/views/Login.vue'
import MonActivite from '@/views/MonActivite.vue'
import AllUsers from '@/views/AllUsers.vue'
import Moderation from '@/views/Moderation.vue'
import AllInactiveUsers from '@/views/AllInactiveUsers.vue'


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
  // section bleue pour les modérateurs
  {
    path: '/utilisateurs',
    name: 'AllUsers',
    component: AllUsers
  },
  {
    path: '/utilisateurs-desinscrits',
    name: 'AllInactiveUsers',
    component: AllInactiveUsers
  },
  {
    path: '/moderation',
    name: 'Moderation',
    component: Moderation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
