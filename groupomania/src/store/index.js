import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'//ajout axios a vuex pour call API

//import store
import getPosts from './modules/getAllPosts'
import login from './modules/login'



Vue.use(Vuex)
Vue.use(axios) //ajout axios a vuex pour call API

export default new Vuex.Store({
  modules: {
    getPosts,
    login,
  }
})
