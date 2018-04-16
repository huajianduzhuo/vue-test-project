<template>
  <swiper-slide class="tab-swiper-item">
    <div v-if="!showFlag" class="tab-swiper-lazy-item"></div>
    <slot v-else></slot>
  </swiper-slide>
</template>

<script>
export default {
  name: 'tabItem',
  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    index: {
      required: true
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  computed: {
    currentIndex () {
      return (this.$parent.swiper && this.$parent.swiper.activeIndex) ? this.$parent.swiper.activeIndex : 0
    }
  },
  mounted () {
    if (!this.lazy) this.showFlag = true
  }
}
</script>

<style scoped>
.tab-swiper-item {
  position: relative;
  height: 100%;
  width: 100%;
}
.tab-swiper-lazy-item {
  height: 100%;
  width: 100%;
  background: inherit;
}
</style>