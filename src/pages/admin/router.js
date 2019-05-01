import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/home.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/edit.vue')
    }

  ]
})