<template>
  <div class="request-failed-wrap" @click.prevent="handleRefresh">
    <div class="request-failed-info">加载失败，点击刷新</div>
  </div>
</template>

<script>
export default {
  props: {
    handleRefresh: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.request-failed-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #999999;
}
.request-failed-info {
  font-size: 25px;
  color: #ffffff;
  font-weight: bold;
  line-height: 1;
}
</style>