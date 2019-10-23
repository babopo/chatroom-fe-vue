import Vue from 'vue'
import Router from 'vue-router'

// 账户相关页面组件
import home from './views/home.vue'
import login from './views/login.vue'
import forget from './views/forget.vue'
import passwordChanging from './views/passwordChanging.vue'
import register from './views/register.vue'
import index from './views/index.vue'
import about from './views/about.vue'

// 聊天室页面组件
import chatRoom from './views/chatRoom.vue'
import chat from './views/chatPage/chat.vue'
import settings from './views/chatPage/settings.vue'

import notFound from './views/404.vue'

// 导航守卫需要发送ajax
import api from '@/api.js'

Vue.use(Router)

const router = new Router({
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
      path: '/forget',
      component: forget,
    },
    {
      path: '/passwordChanging/:token',
      component: passwordChanging,
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

// 导航守卫
// 防止直接打开聊天室页
router.beforeEach( async (to, from, next) => {
  if(/chat-room/.test(to.fullPath)) {
    // 验证cookie
    const res = (await api.get('verify')).data
    if(res.code === 0 || to.params.username !== res.name) {
      // 验证失败跳转至404
      next('/404')
      // router.push('/404')
    } else {
      next()
    }
  } else {
    // 不能同一次逻辑中调两次next，因为next()表示确认跳转
    next()
  }
})

//已登陆过打开首页直接跳转至聊天室页
router.beforeEach( async (to, from, next) => {
  if(/home/.test(to.fullPath)) {
    // 验证cookie
    const res = (await api.get('verify')).data
    if(res.code === 1) {
      // 验证成功跳转至聊天室
      next(`/chat-room/${res.name}`)
    }
  }
  next()
})


export default router