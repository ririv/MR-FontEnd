import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../../plugins/element.js'
import "../../assets/js/axiosConfig.js"
import bus from '../../assets/js/eventBus.js'

Vue.config.productionTip = false
Vue.prototype.$bus = bus


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
