import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
Vue.config.productionTip = false

new Vue({
  router, //made changes here
  render: h => h(App),
}).$mount('#app')

// this file initializes your Vue application and signifies which HTML element 
// in the index.html file your app should be attached to. 


//Complete!!!

