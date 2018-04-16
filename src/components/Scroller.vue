<template>
  <swiper :options="option" ref="scroller" class="h100">
    <swiper-slide class="text">
      <div class="pull-down" ref="edge" v-if="pullDownRefresh">
        <span class="icon-arrow-down2"></span>
        <div class="pull-down-info">下拉刷新</div>
      </div>
      <slot></slot>
      <div class="pull-up" v-if="pullUpLoadMore">
        加载更多
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  props: {
    swiperOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    pullUpLoadMore: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function
    },
    onInfinite: {
      type: Function
    }
  },
  data () {
    let self = this
    return {
      initOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        resistanceRatio: 0.85,
        freeModeMomentumRatio: 2,
        on: {
          touchStart () {
            if (self.docHeight === 0) {
              self.docHeight = document.documentElement.clientHeight
            }
          },
          touchMove () {
            if (!self.pullDownRefresh && !self.pullUpLoadMore) {
              return
            }
            if (self.edgeHeight === 0) {
              self.edgeHeight = self.$refs['edge'].offsetHeight
            }
            if (self.pullDownRefresh) {
              if (this.translate >= self.edgeHeight) {
                document.querySelector('.icon-arrow-down2').style.transform = 'rotate(180deg)'
                document.querySelector('.pull-down-info').innerHTML = '释放更新'
              } else {
                document.querySelector('.icon-arrow-down2').style.transform = 'rotate(0deg)'
                document.querySelector('.pull-down-info').innerHTML = '下拉刷新'
              }
            }
            if (self.pullUpLoadMore) {
              let contentHeight = document.querySelector('.text').offsetHeight
              if (Math.abs(this.translate) >= self.edgeHeight + contentHeight - self.docHeight) {
                document.querySelector('.pull-up').innerHTML = '加载中···'
              }
            }
          },
          touchEnd () {
            if (!self.pullDownRefresh && !self.pullUpLoadMore) {
              return
            }
            if (self.edgeHeight === 0) {
              self.edgeHeight = self.$refs['edge'].offsetHeight
            }
            if (self.pullDownRefresh && this.translate >= self.edgeHeight) {
              document.querySelector('.swiper-wrapper').style.transform = `translate3d(0px, ${self.edgeHeight}px, 0px)`
              // document.querySelector('.icon-arrow-down2').style.display = 'none'
              // document.querySelector('.pull-down-info').innerHTML = '加载中···'
            }
            if (self.pullUpLoadMore) {
              let contentHeight = document.querySelector('.text').offsetHeight
              if (Math.abs(this.translate) >= self.edgeHeight + contentHeight - self.docHeight) {
                document.querySelector('.pull-up').innerHTML = '加载中···'
              }
            }
          }
        }
      },
      pullDownInfo: '下拉刷新',
      pullUpInfo: '加载更多',
      edgeHeight: 0,
      docHeight: 0
    }
  },
  computed: {
    option () {
      if (typeof this.swiperOption === 'object') {
        return Object.assign(this.initOption, this.swiperOption)
      } else {
        return this.initOption
      }
    }
  }
}
</script>

<style scoped>
.h100 {
  height: 100%;
}
.text {
  height: auto;
}
.pull-down {
  position: absolute;
  width: 100%;
  height: .7rem;
  line-height: 0.3rem;
  top: -0.7rem;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
}
.icon-arrow-down2 {
  transition: transform .2s linear;
  font-size: 0.16rem;
}
.pull-up {
  position: absolute;
  width: 100%;
  height: .7rem;
  bottom: -0.7rem;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}
</style>
