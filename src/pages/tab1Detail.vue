<template>
  <div class="detail">
    <swiper class="flex1" :options="option" ref="mySwiper">
      <swiper-slide>
        <div class="bg" ref="firstSlide"></div>
      </swiper-slide>
      <swiper-slide class="bgccc">
        This is {{$route.params.item}}
      </swiper-slide>
      <swiper-slide class="bgccc" id="scroll-wrapper">
          <ul>
            <li class="list-item" v-for="(item, index) in list" :key="index">
              <router-link :to="`/item/${item}`">{{ item }}</router-link>
              <img src="https://gw.alicdn.com/tfs/TB1IYdCnBHH8KJjy0FbXXcqlpXa-900-500.jpg" alt="">
            </li>
            <li class="list-item">加载中···</li>
          </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {SwiperMixin} from '../components/mixins/swiper-mixin'
export default {
  mixins: [SwiperMixin],
  data () {
    return {
      bscroller: null,
      activeBar: false,
      list: ['cencen', 'cancan', 'qiye', 'weizhuang', 'genie', 'hanfei', 'cencen', 'cancan', 'qiye', 'weizhuang', 'genie', 'hanfei', 'cencen', 'cancan', 'qiye', 'weizhuang', 'genie', 'hanfei'],
      swiperOption: {
        initialSlide: 1,
        allowSlidePrev: true
      }
    }
  },
  methods: {
    refresh () {
      let self = this
      setTimeout(() => {
        self.list.splice(self.list.length, 0, '岑岑', '灿灿', '卫庄')
      }, 1500)
    }
  },
  mounted () {
    let self = this
    this.swiper.on('slidePrevTransitionEnd', () => {
      self.swiper.activeIndex === 0 && self.$router.back()
    })
    this.swiper.on('transitionStart', () => {
      if (self.swiper.activeIndex === 0) {
        self.$refs.firstSlide.style.transition = 'opacity .3s'
        self.$refs.firstSlide.style.opacity = 0
      }
      if (self.swiper.activeIndex === 1) {
        self.$refs.firstSlide.style.transition = 'opacity .3s'
        self.$refs.firstSlide.style.opacity = 0.8
      }
    })
    this.swiper.on('touchStart', () => {
      self.$refs.firstSlide.style.transition = 'opacity 0s'
    })
    this.swiper.on('touchMove', () => {
      self.$refs.firstSlide.style.opacity = 0.8 * self.swiper.slides[0].progress
    })
    this.$nextTick(() => {
      this.bscroller = new BScroll('#scroll-wrapper')
      this.bscroller.on('scrollEnd', () => {
        if (this.bscroller.y <= this.bscroller.maxScrollY) {
          this.refresh()
        }
      })
    })
  }
}
</script>

<style scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex1 {
  flex: 1;
  height: 100%;
  line-height: 100%;
}
.bgccc {
  background: #353434;
}
.bg {
  height: 100%;
  background: rgb(0, 0, 0);
  opacity: .8;
}
.list-item {
  line-height: 0.5rem;
  border-bottom: 3px solid #111;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-item img {
  height: 1.5rem;
  background: salmon;
}
</style>
