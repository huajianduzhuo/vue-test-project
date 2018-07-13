import Main from './main.js'
import './default-menu.css'

Main.install = function (Vue, option) {
  Vue.prototype.$menu = Main
}

export default Main