<template>
  <div class="container">
    <Topnav :showBack='true' :showAdd='selectedTab === 1'>
      <div class="top-head" @click="switchTab(0)">
        <div class="top-title" :class="{'active-title': selectedTab === 0}">TAB1</div>
        <div class="active-bar" ref="activeBar"></div>
      </div>
      <div class="top-head" @click="switchTab(1)">
        <div class="top-title" :class="{'active-title': selectedTab === 1}">TAB2</div>
      </div>
      <div class="top-head" @click="switchTab(2)">
        <div class="top-title" :class="{'active-title': selectedTab === 2}">OTHER</div>
      </div>
    </Topnav>
    <swiper class="flex1" :options="option" ref="mySwiper">
      <swiper-slide>
        <Tab1></Tab1>
      </swiper-slide>
      <swiper-slide>
        <Tab2></Tab2>
      </swiper-slide>
      <swiper-slide>
        <tab3></tab3>
      </swiper-slide>
    </swiper>
    <router-view></router-view>
  </div>
</template>

<script>
import {Topnav} from '../components'
import {Tab1, Tab2, Tab3} from './'
import {SwiperMixin} from '../components/mixins/swiper-mixin'

export default {
  mixins: [SwiperMixin],
  data () {
    return {
      selectedTab: 0
    }
  },
  components: {
    Topnav,
    Tab1,
    Tab2,
    Tab3
  },
  methods: {
    switchTab (index) {
      if (this.selectedTab === index) {
        return
      }
      this.selectedTab = index
      this.swiper.slideTo(index, 300, false)
    }
  },
  mounted () {}
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.flex1 {
  position: relative;
  flex: 1;
  width: 100%;
}
.top-head {
  position: relative;
  padding: 0 0.15rem;
}
.top-title {
  font-family: PingFangSC-Medium;
  font-size: 0.17rem;
  color: #999999;
  letter-spacing: -0.15px;
  transition: color .3s;
}
.active-title {
  color: #ffffff;
}
.active-bar {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -0.14rem;
  width: 0.28rem;
  height: 0.03rem;
  background: #00adef;
  border-radius: 1px;
  transition: all 0.3s;
  transform-origin: left center 0px;
}
</style>
