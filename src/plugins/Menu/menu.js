export default {
  name: 'Menu',
  props: {
    event: Event,
    vNode: Object
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
    const docH = document.documentElement.clientHeight
    const elm = this.vNode.elm
    const elmW = elm.offsetWidth
    const elmH = elm.offsetHeight
    const top = elm.getBoundingClientRect().top
    const left = elm.getBoundingClientRect().left
    const menuLeft = left + elmW / 2
    let direc = ''
    if (top >= docH / 5) {
      direc = 'top'
    } else {
      direc = 'bottom'
    }
    const maskLayer = (<div class="menu-mask"></div>)
    let menu = direc === 'top'
      ? (
        <div style={{left: menuLeft + 'px'}} class="menu menu-top"></div>
      )
      : (
        <div style={{left: menuLeft + 'px'}} class="menu menu-bottom"></div>
      )
    return menu
  }
}