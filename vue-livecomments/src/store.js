import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgColor: 'white',
    timer: {
      time: 5 * 60 * 1000,
      count: 0,
    },
  },
  mutations: {
    setColor(state, c/*string*/) {
      state.bgColor = c
    },
    countTimer(state, ms) {
      state.timer.count += ms
      if (state.timer.count >= state.timer.time) {
        state.timer.count = state.timer.time
      }
    },
  },
})
