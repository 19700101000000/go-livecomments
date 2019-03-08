import Vue from 'vue'
import VueWebsocket from 'vue-websocket'

// TODO
Vue.use(VueWebsocket, 'ws://localhost:8080/ws', {
  reconnection: true,
})

