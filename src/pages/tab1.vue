<template>
  <div class="wrap">
    <ul>
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <router-link :to="`/item/${item}`">{{ item }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['cencen', 'cancan', 'qiye', 'weizhuang', 'genie', 'hanfei']
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
}
.list-item {
  line-height: 0.5rem;
  background: #1f1f1f;
  @include border-1px;
}
</style>
