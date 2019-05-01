import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ './views/home.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search.vue')
    }

  ]
})
