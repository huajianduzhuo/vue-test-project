import Vue from 'vue'
import Router from 'vue-router'
import TabAnimate from '@/pages/TabAnimate.vue'
import Upload from '@/pages/upload.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'TabAnimate',
      component: TabAnimate,
      children: [
        {
          path: '/item/:item',
          name: 'Item',
          component: () => import('../pages/tab1Detail.vue')
        }
      ]
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
