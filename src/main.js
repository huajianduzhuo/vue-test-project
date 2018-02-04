// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import Scroller from './components/Scroller'
import './config/rem'
import 'swiper/dist/css/swiper.css'
import './common/style.css'

Vue.config.productionTip = false
Vue.component('swiper', swiper)
Vue.component('swiper-slide', swiperSlide)
// Vue.component('scroller', Scroller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
