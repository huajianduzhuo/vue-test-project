<template>
  <div class="test-vs-wrap">
    <topnav>
      <div>VSroll</div>
    </topnav>
    <div class="flex1">
      <v-scroll :refreshCb="refresh" :loadMoreCb="fetch" :status="status">
        <div class="item" v-for="(item, index) in list" :key="index">
          {{index + 1}} -- {{item}}
        </div>
      </v-scroll>
    </div>
  </div>
</template>

<script>
import Topnav from '../components/Topnav'
import VScroll from '../components/VScroll'
export default {
  components: {
    Topnav,
    VScroll
  },
  data () {
    return {
      list: [],
      status: 'loading'
    }
  },
  methods: {
    fetch () {
      return new Promise(resolve => {
        setTimeout(() => {
          let newlist = new Array(20)
          newlist.fill('卫庄')
          this.list = this.list.concat(newlist)
          this.status = 'success'
          resolve()
        }, 3000)
      })
    },
    refresh () {
      return new Promise(resolve => {
        setTimeout(() => {
          let newlist = new Array(20)
          newlist.fill('盖聂')
          this.list = newlist.concat(this.list)
          this.status = 'success'
          resolve()
        }, 3000)
      })
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style scoped>
.test-vs-wrap {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.flex1 {
  box-sizing: border-box;
  height: 100%;
  padding-top: 0.44rem;
}
.item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #999999;
  background: #333;
}
</style>