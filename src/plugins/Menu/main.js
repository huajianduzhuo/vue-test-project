import Vue from 'vue'
import Menu from './menu'
const MenuContructor = Vue.extend(Menu)

const Main = function (event, vNode) {
  event = event || window.event
  if (typeof vNode === 'object' && Object.prototype.hasOwnProperty.call(vNode, 'componentOptions')) {
    // 具有触发显示菜单的元素
    const el = vNode.elm
    const elRect = el.getBoundingClientRect()
    const docH = document.documentElement.clientHeight
    const isOnTop = elRect.top >= docH / 5
    const menuLeft = elRect.left + el.offsetWidth / 2
    const menuTop = isOnTop ? elRect.top : elRect.top + el.offsetHeight
    const vm = new MenuContructor({event, vNode, isOnTop, menuLeft, menuTop}).$mount()
    document.body.appendChild(vm.$el)
  }
}

export default Main