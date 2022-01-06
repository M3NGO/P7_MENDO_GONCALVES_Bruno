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

// protection des routes afin de ne laisser que les users authentifiés se connecter
router.beforeEach((to, from, next) => {
let token = localStorage.getItem('token')
  if (to.fullPath === '/wall') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '/activite') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '/profil') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '/utilisateurs') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '/utilisateurs-desinscrits') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '/moderation') {
    if (!token) {
      next('/');
    }
  }
  if (to.fullPath === '*') {
    if (token) {
      next('*');
    }
  }
  next();
});

export default router
