<template>
  <header class="top">
    <div class="content">
      <slot></slot>
    </div>
    <i class="top-left icon-back" v-if="showBack" @click="goback()"></i>
    <i class="top-right icon-add" v-if="showAdd" @click="newContact()"></i>
    <div class="top-left">
      <slot name="left"></slot>
    </div>
    <div class="top-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showBack: {
      type: Boolean,
      default: false
    },
    showAdd: {
      type: Boolean,
      default: false
    },
    showTop20: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goback () {
      if (this.$route.name === 'Dealership') {
        window.location.href = 'goback://'
      } else {
        this.$router.back()
      }
    },
    newContact () {
      if (this.$route.name === 'DealerDetail') {
        this.$router.push({
          name: 'ContactNew',
          params: {
            dealerId: this.$route.params.id
          }
        })
      } else {
        this.$router.push({
          name: 'ContactNew'
        })
      }
    }
  }
}
</script>

<style scoped>
.top {
  position: relative;
  width: 100%;
  height: 0.44rem;
  z-index: 100;
  background: #000000;
}
.fix20 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background: #000000;
  z-index: 100;
}
.content {
  height: 100%;
  line-height: 0.44rem;
  display: flex;
  justify-content: center;
}
.top-left {
  position: absolute;
  left: 0.15rem;
  top: 50%;
  transform: translateY(-50%);
}
.top-right {
  position: absolute;
  right: 0.15rem;
  top: 50%;
  transform: translateY(-50%);
}
.icon-back {
  width: 0.156rem;
  height: 0.142rem;
  background: url('../assets/icon_nav_back.png') no-repeat;
  background-size: 0.156rem 0.142rem;
}
.icon-add {
  width: 0.15rem;
  height: 0.15rem;
  background: url('../assets/icon_nav_add.png') no-repeat;
  background-size: 0.15rem 0.15rem;
}
</style>