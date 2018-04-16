<template>
  <div class="test-tab-container">
    <tab-container
      ref="tabContainer"
      :headers="['tab1', 'tab2']">
      <tab-item :index="0">
        <tab1></tab1>
      </tab-item>
      <tab-item :index="1">
        <tab2></tab2>
      </tab-item>
    </tab-container>
  </div>
</template>

<script>
import {Tab1, Tab2, Tab3} from './'
export default {
  components: {
    Tab1,
    Tab2,
    Tab3
  }
}
</script>

<style scoped>
.test-tab-container {
  width: 100%;
  height: 100%;
}
</style>