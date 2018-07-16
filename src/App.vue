<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.16rem;
  color: #ffffff;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('./assets/deng.jpg') repeat-x;
  background-size: contain;
  z-index: -1;
  filter: blur(3px);
}
a {
  color: #cccccc;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
ul {
  list-style: none;
}
input {
  border: none;
  outline: none;
  height: 0.3rem;
  border-radius: 10px;
  padding-left: 10px;
}
button {
  border: none;
  background: #1aa4d1;
  border-radius: 10px;
  padding: 0.1rem 0.15rem;
  font-size: 0.13rem;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.14px;
}
.longtap-active, .menu-active {
  background-color: rgba(194, 196, 196, 0.411) !important;
}
</style>
