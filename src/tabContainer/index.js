import TabContainer from './src/main.vue'
import TabItem from './src/item.vue'

const install = function (Vue) {
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabItem.name, TabItem)
}

export default {install}
