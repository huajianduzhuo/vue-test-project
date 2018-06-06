<template>
  <div class="nodata-wrapper">
    <div class="nodata-img"></div>
    <span class="nodata-info">暂无数据</span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nodata-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
}
.nodata-img {
  width: 0.58rem;
  height: 0.94rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('../assets/icon_default_nodata@2x.png');
}
@media (min-device-pixel-ratio: 3), (-webkit-min-device-pixel-ratio: 3) {
  .nodata-img {
    background-image: url('../assets/icon_default_nodata@3x.png');
  }
}
.nodata-info {
  margin-top: 0.2rem;
  font-family: PingFangSC-Medium;
  font-size: 0.15rem;
  color: #666666;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 0.21rem;
}
</style>