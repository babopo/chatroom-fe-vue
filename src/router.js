import Vue from 'vue'
import Router from 'vue-router'

// 登陆页面组件
import home from './views/home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import index from './views/index.vue'
import about from './views/about.vue'

// 聊天室页面组件
import chatRoom from './views/chatRoom.vue'
import chat from './views/chatPage/chat.vue'
import settings from './views/chatPage/settings.vue'

import notFound from './views/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'login',
          component: login,
        },
        {
          path: 'register',
          component: register,
        },
        {
          path: 'index',
          component: index,
          alias: '/'
        }
      ]
    },
    {
      path: '/about',
      component: about,
    },
    {
      path: '/chat-room/:username',
      component: chatRoom,
      props: true,
      children: [
        {
          path: '/',
          component: chat,
        },
        {
          path: 'settings',
          component: settings,
        }
      ],
    },
    {
      path: '*',
      component: notFound,
    }
  ]
})
