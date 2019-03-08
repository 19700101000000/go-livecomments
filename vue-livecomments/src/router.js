import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index.vue'
import Live from './pages/Live.vue'
import Comment from './pages/Comment.vue'

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: "/live", component: Live },
    { path: "/comment/:id", component: Comment },
  ],
})
