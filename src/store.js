import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    msgsAll: [
      {
        title: '公共区域',
        room: '1',
        msgs: [
          {
            user: 'test',
            timeStamp: 123,
            content: 'hello world',
          },
        ]
      },
      {
        title: 'test',
        room: '2',
        msgs: [
          {
            user: 'test',
            timeStamp: 123,
            content: 'hello user',
          },
        ]
      },
    ],
    // 存储的实际上是当前聊天对象的id
    currentTab: '1',
    currentUser: '',
  },
  getters: {
    // 获取最后一个标签页的id
    lastRoom(state) {
      return state.msgsAll[state.msgsAll.length - 1].room
    },
    // 根据roomId获取聊天对象用户名
    chatName(state, room) {
      return state.msgsAll.find(it => it.room === room).title
    },
    getID(state, name) {
      // 根据用户名查找id
      return state.users.find(it => it.name === name).id
    },
  },
  mutations: {
    remove(state, room) {
      // 删除指定的标签页
      state.msgsAll = state.msgsAll.filter(item => item.room !== room)
    },
    add(state, name) {
      //根据用户名添加标签页
      const added = state.msgsAll.find(item => item.title === name)
      if(!added) {
        const user = state.users.find(it => it.name === name)
        state.msgsAll.push({
          title: user.name,
          room: user.id,
          msgs: [],
        })
      } 
    },
    setCurrentTab(state, curr) {
      state.currentTab = curr
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    send(state, msg) {
      //将本地发送的信息加入store
      const currentRoom = state.msgsAll.find(it => it.room === state.currentTab).msgs
      currentRoom.push({
        user: state.currentUser,
        timeStamp: Date.now(),
        content: msg,
      })
    },
    //websocket相关
    SOCKET_usersOL(state, users) {
      state.users = users.filter(it => it.name !== state.currentUser)
    },
    SOCKET_newer(state, user) {
      if(user !== state.currentUser) {
        state.users.push(user)
      }
    },
    SOCKET_privateChat(state, msg) {
      // 这个只能收到对方发的，自己发的应该在表单提交时直接插入
      const opened = state.msgsAll.find(it => it.title === msg.user)
      if(opened) {
        opened.msgs.push(msg)
      } else {
        // 要先创建房间
        // 先根据用户名找到用户id
        const id = state.users.find(it => it.name === msg.user).id
        state.msgsAll.push({
          title: msg.user,
          room: id,
          msgs: [msg]
        })
      }
    },
    SOCKET_openChat(state, msg) {
      // console.log(msg)
      state.msgsAll.find(it => it.room === '1').msgs.push(msg)
    }
  },
  actions: {
  }
})
