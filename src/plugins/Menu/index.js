import Main from './main.js'

Main.install = function (Vue, option) {
  Vue.prototype.$menu = Main
}

export default Main