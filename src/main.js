import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from "./common/api.service";

Vue.config.productionTip = false

ApiService.init();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
