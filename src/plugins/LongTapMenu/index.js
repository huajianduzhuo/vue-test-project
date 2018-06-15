import LongTapMenu from './src/main'
import LongTap from './src/longTap'

LongTapMenu.install = function (Vue, option) {
  /** 
   * 添加 longtap 指令
   * 注意：绑定的值如果是函数，则不能直接调用，否则绑定指令时该回调直接执行
   *    不能是：v-longtap="callback()"，而应该是：v-longtap="callback"
   */
  Vue.directive('longtap', LongTap)
  /** 
   * TODO
   *    菜单
   *    1. 通过 longtap.menu
   */
}

export default LongTapMenu