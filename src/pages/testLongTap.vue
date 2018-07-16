<template>
  <div class="wrap">
    <div>
      <div class="item" :class="{'active': activeIndex === index}" v-for="(item, index) in list" @click="handleClick" v-longtap="{handler: longtapCB, time: 1000, disX: 10}" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      list: ['aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd']
    }
  },
  methods: {
    longtapCB (event, el, vNode) {
      console.log(vNode)
      console.log('--------')
      this.activeIndex = vNode.key
      this.$menu(event, vNode, {onunload: this.onmenuunload})
    },
    onmenuunload () {
      this.activeIndex = ''
    },
    handleClick () {
      console.log('click')
      console.log('--------')
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  overflow: auto;
  background: #ffffff;
}
.item {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightpink;
  user-select: none;
  color: #000000;
  @include border-1px
}
.item.active {
  background-color: rgba(194, 196, 196, 0.411);
}
</style>