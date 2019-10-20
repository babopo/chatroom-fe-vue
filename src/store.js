import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: ['test', 'harry', 'sb'],
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
          {
            user: 'sb',
            timeStamp: 123345,
            content: 'heihei',
          },
          {
            user: 'harry',
            timeStamp: 125467563,
            content: 'haha',
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
            content: 'hello admin',
          },
        ]
      },
      {
        title: 'harry',
        room: '3',
        msgs: [
          {
            user: 'harry',
            timeStamp: 123,
            content: 'hello nmb',
          }
        ]
      },
    ],
    currentTab: '1',
    currentUser: 'admin',
  },
  getters: {
    // 获取最后一个标签页的id
    lastRoom(state) {
      return state.msgsAll[state.msgsAll.length - 1].room
    },
    // 根据roomId获取聊天对象用户名
    chatName(state, room) {
      return state.msgsAll.find(it => it.room === room).title
    } 
  },
  mutations: {
    remove(state, room) {
      // 删除指定的标签页
      state.msgsAll = state.msgsAll.filter(item => item.room !== room)
    },
    add(state, user) {
      //根据用户名添加标签页
      const added = state.msgsAll.find(item => item.title === user)
      if(!added) {
        state.msgsAll.push({
          title: user,
          room: +state.msgsAll[state.msgsAll.length - 1].room + 1 + '',
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
    //以下为测试用
    send(state, msg) {
      const currentRoom = state.msgsAll.find(it => it.room === state.currentTab).msgs
      currentRoom.push({
        user: state.currentUser,
        timeStamp: Date.now(),
        content: msg
      })
    },
  },
  actions: {

  }
})
