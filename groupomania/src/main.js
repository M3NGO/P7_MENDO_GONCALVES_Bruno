import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import VueMoment from 'vue-moment'

// Load Locales ('en' comes loaded by default)
require('moment/locale/fr');

// Choose Locale
moment.locale('fr');

Vue.use(VueMoment, {moment});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueMoment,
  render: h => h(App)
}).$mount('body')
