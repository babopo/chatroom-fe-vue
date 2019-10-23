import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

// websocket连接
Vue.use(new VueSocketIO({
  connection: "http://localhost",
  vuex: {
    store,
    mutationPrefix: 'SOCKET_',
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
