export default {
  state: {
    aName: '白宇'
  },
  mutations: {
    setName (state, name) {
      state.aName = name
      console.log('mutation', state)
    }
  },
  actions: {
    setName ({commit, state, rootState}, name) {
      console.log('action state', state)
      console.log('action rootState', rootState)
      commit('setName', name)
    }
  }
}
