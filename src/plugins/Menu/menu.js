export default {
  name: 'Menu',
  props: {
    event: Event,
    vNode: Object,
    isOnTop: Boolean,
    menuLeft: Number,
    menuTop: Number
  },
  methods: {
    closeMenu () {
      document.body.style.overflow = ''
      this.$destroy()
    }
  },
  mounted () {
    document.body.style.overflow = 'hidden'
  },
  render (h) {
    console.log(this)
    const {isOnTop, menuLeft, menuTop} = this
    let menu = isOnTop
      ? (
        <div style="{{left: menuLeft + 'px', top: menuTop + 'px'}}" class="menu menu-top">复制</div>
      )
      : (
        <div style="{{left: menuLeft + 'px', top: menuTop + 'px'}}" class="menu menu-bottom">复制</div>
      )
    return (
      <div class="menu-wrap">
        <div class="menu-mask"></div>
        {menu}
      </div>
    )
  }
}