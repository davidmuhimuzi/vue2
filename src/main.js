import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import vuetify from './plugins/vuetify';
import store from './store/store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: '713388184868-b20vc0p3uk4q4rhjhdvrqebrt0tlojtj.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false;
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');