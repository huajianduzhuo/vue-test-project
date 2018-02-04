<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
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
  background: #000000;
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
a {
  color: #cccccc;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
ul {
  list-style: none;
}
</style>
