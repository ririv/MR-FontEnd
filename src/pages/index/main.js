import Vue from 'vue'
import App from './App.vue'
import '../../plugins/element.js'
import router from './router'
import '../../assets/js/axiosConfig.js'
import lodash from 'lodash'
import '../../assets/css/transition.css'
import bus from '../../assets/js/eventBus.js'
import getHeight from '../../components/getHeight.vue'

Vue.prototype._ = lodash
Vue.config.productionTip = false

Vue.prototype.$bus = bus
Vue.component("getHeight",getHeight)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
