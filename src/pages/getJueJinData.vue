<template>
  <div class="wrapper">
    <topnav class="header">掘金</topnav>
    <div class="content">
      <div class="user-list" v-if="!error" v-loading="loading">
        <div class="user-item" v-for="user in users" :key="user.uid">
          <div class="user-name">{{user.username}}</div>
          <div class="uaer-follow-count">{{user.followersCount}}</div>
        </div>
      </div>
      <request-fail v-if="error" :handleRefresh="fetch"></request-fail>
    </div>
  </div>
</template>

<script>
import { getJueJinData } from '../api/nodeData'
import Topnav from '../components/Topnav'
import RequestFail from '../components/RequestFail'
export default {
  data () {
    return {
      users: [],
      loading: true,
      error: false
    }
  },
  components: {
    Topnav,
    RequestFail
  },
  methods: {
    fetch () {
      this.loading = true
      this.error = false
      getJueJinData()
        .then(data => {
          this.users = data.data.users
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = true
          console.log(error)
        })
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  overflow: auto;
}
.header {
  position: fixed !important;
  top: 0;
  left: 0;
}
.content {
  box-sizing: border-box;
  padding-top: 0.44rem;
  height: 100%;
}
.user-list {
  min-height: 50px;
}
.user-item {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  &:nth-child(odd) {
    background-color: lightblue;
  }
  &:nth-child(even) {
    background-color: lightskyblue;
  }
}
.user-name {
  margin-right: 30px;
}
</style>
<style>
.el-loading-mask {
  background-color: transparent;
}
</style>
