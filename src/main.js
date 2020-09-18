import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// this file initializes your Vue application and signifies which HTML element 
// in the index.html file your app should be attached to. 