import copy from 'copy-to-clipboard'

export default {
  name: 'Menu',
  data () {
    return {
      event: null,
      vNode: null,
      isOnTop: true,
      menuLeft: 0,
      menuTop: 0
    }
  },
  methods: {
    closeMenu () {
      document.body.style.overflow = ''
      document.body.removeChild(this.$el)
      this.addActiveClass(false)
      this.$destroy()
    },
    copyEl () {
      copy(this.vNode.elm.textContent)
      this.closeMenu()
    },
    addActiveClass(opt) {
      const el = this.vNode.elm
      let cns = el.className.split(' ')
      let index = cns.indexOf('menu-active')
      if (opt) {
        if (index === -1) {
          cns.push('menu-active')
          el.className = cns.join(' ')
        }
      } else {
        if (index > -1) {
          cns.splice(index, 1)
          el.className = cns.join(' ')
        }
      }
    }
  },
  mounted () {
    this.addActiveClass(true)
    document.body.style.overflow = 'hidden'
  },
  render (h) {
    const {isOnTop, menuLeft, menuTop} = this
    return (
      <div class="menu-wrap">
        <div class="menu-mask" onClick={this.closeMenu}></div>
        <div style={`left: ${menuLeft}px;top: ${menuTop}px`} class={{menu: true, 'menu-top': isOnTop, 'menu-bottom': !isOnTop}}>
          <div class="menu-item" onClick={this.copyEl}>复制</div>
        </div>
      </div>
    )
  }
}