import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  connection: "http://localhost",
  vuex: {
    store,
    mutationPrefix: 'SOCKET_',
    options: {
      path: '/chat-room/'
    },
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
