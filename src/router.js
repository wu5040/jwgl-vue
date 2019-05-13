import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/course',
      name: 'course',
      component: () => import('./views/Course.vue')
    },
    {
      path: '/transcript',
      name: 'transcript',
      component: () => import('./views/Transcript.vue')
    },
    {
      path: '/tcourse',
      name: 'tcourse',
      component: () => import('./views/TCourse.vue')
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import('./views/Grade.vue')
    },
    {
      path: '/fastinput',
      name: 'fastinput',
      component: () => import('./views/FastInput.vue')
    },
    {
      path: '/fastdelete',
      name: 'fastdelete',
      component: () => import('./views/FastDelete.vue')
    },
    {
      path: '/cmanage',
      name: 'cmanage',
      component: () => import('./views/Cmanage.vue')
    },
    {
      path: '/tmanage',
      name: 'tmanage',
      component: () => import('./views/Tmanage.vue')
    },
    {
      path: '/smanage',
      name: 'smanage',
      component: () => import('./views/Smanage.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
