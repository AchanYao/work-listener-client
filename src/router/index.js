import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  base: '/service/',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/NotFound')
    },
    {
      path: '/apply',
      name: 'Apply',
      component: () => import('@/views/Apply')
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: () => import('@/views/Confirm')
    },
    {
      path: '/delete',
      name: 'DeleteMember',
      component: () => import('@/views/DeleteMember')
    },
    {
      path: '/classes',
      name: 'AllClasses',
      component: () => import('@/views/AllClasses')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
