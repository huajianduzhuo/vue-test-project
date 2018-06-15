let longTapFlag = false // 是否触发了长按
let r = null // setTimeout 标志
let startX = 0, // touchstart 时手指的位置，用于 touchmove 时判断手指是否移动
    startY = 0

export default {
  inserted (el, binding, vNode) {
    let delayTime = 1200
    let value = binding.value
    /** 
     * 可通过传入对象字面量的方式，指定长按时间：v-longtap = "{time: 2000}"
     * 时间必须超过 500ms
     */
    if (value && value.time && Number.isInteger(value.time) && value.time >= 500) {
      delayTime = binding.value.time
    }
    /** 
     * 给元素绑定 touchstart 事件
     * 添加一个延迟函数，delayTime 后执行长按回调函数
     * 如果正存在一个长按事件，则本次不执行（最下面为 document 绑定 click 事件，用于取消一次已经触发的长按事件）
     * TODO
     *    可以指定 modifier：menu
     */
    el.addEventListener('touchstart', event => {
      if (longTapFlag) {
        return
      }
      let touch = event.changedTouches[0]
      startX = touch.clientX
      startY = touch.clientY
      // settimeout 函数
      r = setTimeout(() => {
        r = null
        longTapFlag = true
        /** 
         * 如果绑定的值是函数，则执行
         * v-longtap = "cb"
         * v-longtap = "{handler: cb}"
         * 不能是：v-longtap = "cb()"，这种形式绑定时就会执行 cb
         */
        if (typeof value === 'function') {
          value()
          return
        } else if (value && value.handler && typeof value.handler === 'function') {
          /** 
           * TODO
           * 调用不正确，this 指向错误
           */
          value.handler()
          return
        }
      }, delayTime)
      touch = null
    }, false)
    /** 
     * 给元素绑定 touchmove 事件
     * 若手指移动超过 10 像素，则不是长按事件，取消 timeout
     */
    el.addEventListener('touchmove', event => {
      let touch = event.changedTouches[0]
      let diffX = Math.abs(touch.clientX - startX)
      let diffY = Math.abs(touch.clientY - startY)
      if (diffX > 10 || diffY > 10) {
        if (r) {
          clearTimeout(r)
          r = null
        }
      }
      touch = null
    }, false)
    /** 
     * 给元素绑定 touchend 事件
     * 手指离开时，如果时间没有超过 delayTime，则不是长按事件，取消 timeout
     */
    el.addEventListener('touchend', event => {
      if (r) {
        clearTimeout(r)
        r = null
      }
    }, false)
  }
}

document.addEventListener('click', event => {
  longTapFlag = false
}, false)