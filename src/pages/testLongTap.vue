<template>
  <div class="wrap">
    <div>
      <div class="item" v-for="(item, index) in list" @click="handleClick" v-longtap:[index]="{handler: longtapCB, time: 1000, disX: 10}" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    longtapCB (event, index, vNode) {
      console.log(vNode)
      console.log('--------')
      this.$menu(event, vNode.elm, {
        menuDirection: 'horizontal',
        data: {index: vNode.key, name: this.list[index]},
        items: {copy: true},
        customItems: [{
          menuName: '详情',
          handler: this.showInfo
        }]
      })
    },
    showInfo (data) {
      this.$message({message: data.index + ', ' + data.name, duration: 1000})
    },
    handleClick (event) {
      console.log('click')
      console.log('--------')
      this.$menu(event, event.target, {})
    }
  },
  mounted () {
    setTimeout(() => {
      this.list = ['aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd']
    }, 1000)
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
</style>