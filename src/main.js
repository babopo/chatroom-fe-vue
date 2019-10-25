import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'
import '@/assets/leon.js'
Vue.config.productionTip = false

// websocket连接
Vue.use(new VueSocketIO({
  connection: "http://chat-vue.limbotech.top:8000/",
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
