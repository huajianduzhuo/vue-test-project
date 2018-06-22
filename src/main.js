// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueUpload from 'vue-upload-component'
import ElementUI from 'element-ui'
import Datatable from 'vue2-datatable-component'
import Scrollbar from './plugins/scrollbar'
import debounce from 'lodash.debounce'

import LongTap from './plugins/LongTap'
import Menu from './plugins/Menu'
// import Scroller from './components/Scroller'
import './config/rem'
import 'swiper/dist/css/swiper.css'
import './common/style.css'
// import './common/scrollbar.css'

Vue.config.productionTip = false
Vue.component('swiper', swiper)
Vue.component('swiper-slide', swiperSlide)
Vue.component('file-upload', VueUpload)
Vue.use(ElementUI)
Vue.use(Datatable)
Vue.use(Scrollbar)
Vue.use(LongTap)
Vue.use(Menu)

Vue.prototype._debounce = debounce

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

window.ononline = (w, event) => {
  vm.$message({message: '网络连上了', duration: 1500})
}
window.onoffline = (w, event) => {
  vm.$message({message: '网络断开了', duration: 1500})
}
