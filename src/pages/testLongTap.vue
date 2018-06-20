<template>
  <div class="wrap">
    <div>
      <div class="item" v-for="(item, index) in list" @click="handleClick" v-longtap="{handler: longtapCB, time: 1000, disX: 10}" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['岑岑', '灿灿', '卫庄', '盖聂', '岑岑', '灿灿', '卫庄', '盖聂', '岑岑', '灿灿', '卫庄', '盖聂', '岑岑', '灿灿', '卫庄', '盖聂', '岑岑', '灿灿', '卫庄', '盖聂']
    }
  },
  methods: {
    longtapCB (event, el, vNode) {
      console.log(event)
      console.log('--------')
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
</style>