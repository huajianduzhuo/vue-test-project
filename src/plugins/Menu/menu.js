import copy from 'copy-to-clipboard'

export default {
  name: 'Menu',
  data () {
    return {
      event: null,
      vNode: null,
      isOnTop: true,
      menuLeft: 0,
      menuTop: 0,
      onunload: null
    }
  },
  methods: {
    closeMenu () {
      document.body.style.overflow = ''
      document.body.removeChild(this.$el)
      if (typeof this.onunload === 'function') {
        this.onunload()
      }
      this.$destroy()
    },
    copyEl () {
      copy(this.vNode.elm.textContent)
      this.closeMenu()
    }
  },
  mounted () {
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