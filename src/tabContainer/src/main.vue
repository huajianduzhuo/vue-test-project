<template>
  <div class="tab-swiper-container">
    <swiper :options="swiperOptionNav" class="tab-swiper-nav-wrapper" ref="swiperNav">
      <swiper-slide 
        class="tab-container-nav-slide"
        v-for="(title, index) in headers" 
        :key="index">
        <div
          class="tab-swiper-nav-item"
          :class="navClass"
          :style="{paddingRight: (index === headers.length - 1 ? 0 : `${navInterval}px`)}">
          {{title}}
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      :options="swiperOptionTabItem"
      class="tab-swiper-tabs"
      ref="swiperTabs">
      <slot></slot>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'tabContainer',
  props: {
    headers: {
      type: Array,
      required: true
    },
    navInterval: {
      type: Number,
      default: 30
    },
    navClass: {
      type: String
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      swiperOptionTabItem: {
        noSwiping: true,
        touchAngl: 5,
        iOSEdgeSwipeDetection: true,
        watchSlidesProgress: true,
        resistanceRatio: 0
      },
      swiperOptionNav: {
        centeredSlides: false,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  computed: {
    selectedTab () {
      if (this.$refs.swiperNav && this.$refs.swiperNav.swiper) {
        return this.$refs.swiperNav.swiper.activeIndex
      }
      return 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTabs = this.$refs.swiperTabs.swiper
      const swiperNav = this.$refs.swiperNav.swiper
      swiperTabs.controller.control = swiperNav
      swiperNav.controller.control = swiperTabs
    })
  }
}
</script>

<style scoped>
.tab-swiper-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.tab-swiper-nav-wrapper {
  width: 100%;
  height: 44px;
  color: #999999;
}
.tab-container-nav-slide {
  display: flex;
  align-items: center;
  width: auto;
}
.tab-swiper-nav-wrapper .swiper-slide-active {
  color: #ffffff;
}
.tab-swiper-nav-item {
  display: flex;
  align-items: center;
}
.tab-swiper-tabs {
  width: 100%;
  flex: 1;
}
</style>
<style>
.tab-swiper-container .tab-swiper-nav-wrapper .swiper-wrapper {
  display: flex;
  justify-content: center;
}
</style>
