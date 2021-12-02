import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'//ajout axios a vuex pour call API

//import store
import getPosts from './modules/getAllPosts'
import comments from './modules/comments'
import getUsers from './modules/getAllUsers'
import Auth from './modules/auth'
import getProfile from './modules/getProfile'




Vue.use(Vuex)
Vue.use(axios) //ajout axios a vuex pour call API

export default new Vuex.Store({
  modules: {
    getPosts,
    comments,
    getUsers,
    Auth,
    getProfile,

  }
})
