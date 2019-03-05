import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index.vue'
import Live from './pages/Live.vue'

Vue.use(VueRouter)

export default new VueRouter ({
  routes: [
    { path: '/', component: Index },
    { path: "/live", component: Live },
  ],
})
