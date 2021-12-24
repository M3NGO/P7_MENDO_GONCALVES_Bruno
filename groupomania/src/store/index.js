import Vue from 'vue'
import Vuex from 'vuex'


//import store
import getPosts from './modules/getAllPosts'
import comments from './modules/comments'
import getUsers from './modules/getAllUsers'
import Auth from './modules/auth'
import getProfile from './modules/getProfile'
import moderation from './modules/moderation'
import likesDislikes from './modules/likesDislikes.js'



Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    getPosts,
    comments,
    getUsers,
    Auth,
    getProfile,
    moderation,
    likesDislikes,

  }
})
