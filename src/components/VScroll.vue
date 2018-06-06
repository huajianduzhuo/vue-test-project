<template>
  <div class="vscroll-wrapper" ref="VScrollWrapper">
    <div class="vscroll-content">
      <div class="vscroll-pulldown">下拉刷新</div>
      <div class="vscroll-loading" v-if="status === 'loading'" v-loading="status === 'loading'"></div>
      <slot></slot>
    </div>
    <div class="vscroll-pullup" v-if="status !== 'loading'">上拉加载更多</div>
  </div>
</template>

<script>
import NoData from './NoData'
import RequestFail from './RequestFail'
import BScroll from 'better-scroll'
export default {
  props: {
    customOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    refreshCb: {
      type: Function
    },
    loadMoreCb: {
      type: Function
    },
    status: {
      type: String,
      default: 'loading'
    }
  },
  components: {
    NoData,
    RequestFail
  },
  data () {
    return {
      scroller: null,
      initOption: {
        click: true,
        scrollbar: true,
        pullDownRefresh: {
          threshold: 50,
          stop: 50
        },
        pullUpLoad: {
          threshold: -50
        },
        probeType: 1
      }
    }
  },
  computed: {
    option () {
      let customOption = typeof this.customOption === 'object' && this.customOption !== null ? this.customOption : {}
      return Object.assign(this.initOption, customOption)
    }
  },
  mounted () {
    let { option } = this
    this.scroller = new BScroll(this.$refs['VScrollWrapper'], option)
    if (option.pullDownRefresh) {
      let refreshCb = this.refreshCb
      if (typeof refreshCb !== 'function') {
        console.error('pullingDownRefresh callback function is required')
        return
      }
      this.scroller.on('pullingDown', () => {
        refreshCb()
          .then(() => {
            this.scroller.finishPullDown()
          })
      })
    }
    if (option.pullUpLoad) {
      let loadMoreCb = this.loadMoreCb
      if (typeof loadMoreCb !== 'function') {
        console.error('pullUpLoad callback function is required')
        return
      }
      this.scroller.on('pullingUp', () => {
        loadMoreCb()
          .then(() => {
            this.scroller.finishPullUp()
          })
      })
    }
    if (option.pullDownRefresh || option.pullUpLoad) {
      this.scroller.on('scroll', () => {
        console.log('scroll')
      })
      this.scroller.on('scrollStart', () => {
        console.log('scrollStart')
      })
      this.scroller.on('scrollEnd', () => {
        console.log('scrollEnd')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.vscroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.vscroll-content {
  position: relative;
  width: 100%;
}
.vscroll-loading {
  height: 50px;
}
.vscroll-pulldown {
  position: absolute;
  height: 50px;
  width: 100%;
  left: 0;
  top: -50px;
  line-height: 50px;
}
.vscroll-pullup {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  left: 0;
  bottom: -50px;
}
</style>