import Vue from 'vue'
import Router from 'vue-router'
import TabAnimate from '@/pages/TabAnimate.vue'
import Upload from '@/pages/upload.vue'
import Data from '@/pages/Data.vue'
import TestElement from '@/pages/TestElement.vue'
import TestHandsontable from '@/pages/testHandsontable.vue'
import RewriteScrollbar from '@/pages/rewriteScrollbar.vue'
import MyTable from '@/pages/mytable.vue'
import SVG from '@/pages/svg.vue'

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
      children: [
        {
          path: '/child',
          name: 'Child'
        }
      ],
      component: Upload
    },
    {
      path: '/datalist',
      name: 'Data',
      component: Data
    },
    {
      path: '/testt',
      name: 'TestElement',
      component: TestElement
    },
    {
      path: '/testht',
      name: 'TestHandsontable',
      component: TestHandsontable
    },
    {
      path: '/scrollbar',
      name: 'RewriteScrollbar',
      component: RewriteScrollbar
    },
    {
      path: '/mytable',
      name: 'MyTable',
      component: MyTable
    },
    {
      path: '/svg',
      name: 'SVG',
      component: SVG
    },
    {
      path: '/testTabContainer',
      name: 'testTabContainer',
      component: () => import('../pages/testTabContainer')
    },
    {
      path: '/drag',
      name: 'testDrag',
      component: () => import('../pages/testDrag')
    },
    {
      path: '/getJuejin',
      name: 'getJueJinData',
      component: () => import('../pages/getJueJinData.vue')
    }
  ]
})
