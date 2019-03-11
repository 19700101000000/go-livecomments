import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgColor: 'white',
    color: 'black',
    timer: {
      time: 5 * 60 * 1000,
      count: 0,
      active: false,
    },
    livekey: null/* *string */,
  },
  mutations: {
    setColor(state, c/*string*/) {
      state.color = c
    },
    setBgColor(state, c/*string*/) {
      state.bgColor = c
    },
    setTime(state, t/*number*/) {
      state.timer.time = t
    },
    countTimer(state, ms/*number*/) {
      state.timer.count += ms
      if (state.timer.count >= state.timer.time) {
        state.timer.count = state.timer.time
      }
    },
    activeTimer(state, active/*bool*/) {
      state.timer.active = active
    },
    stopTimer(state) {
      state.timer.active = false
      state.timer.count  = 0
    },
    livekey(state, key/*string*/) {
      state.livekey = key
    },
  },
})
