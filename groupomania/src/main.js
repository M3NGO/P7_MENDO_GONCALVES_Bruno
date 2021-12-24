import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import VueMoment from 'vue-moment'
import axios from 'axios'//ajout axios a vuex pour call API
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'


// Load Locales ('en' comes loaded by default)
require('moment/locale/fr');

// Choose Locale
moment.locale('fr');

Vue.use(VueMoment, {moment});
// Vue.use(axios) //ajout axios a vuex pour call API
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

Vue.config.productionTip = false
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err)
//   console.log(info)
//   console.log(vm)
//   // gérer le cas d'erreur `info` est une information spécifique
//   // à Vue sur l'erreur, par exemple dans quel hook du cycle de vie
//   // l'erreur a été trouvée. Disponible uniquement en 2.2.0+
// }

new Vue({
  router,
  store,
  vuetify,
  VueMoment,
  render: h => h(App)
}).$mount('body')
