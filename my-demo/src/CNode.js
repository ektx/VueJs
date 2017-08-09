// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './CNode.vue'
import router from './router/cnode'

Vue.config.productionTip = false


/* eslint-disable no-new */
let myApp = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
