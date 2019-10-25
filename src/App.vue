<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  beforeMount() {
    // 统一加载开场和404需要的动画资源
    const tm = document.createElement('script')
    tm.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"
    document.head.append(tm)
    tm.addEventListener('load', () => {
      this.$store.commit('loadTW')
    })
  }
}
</script>


<style lang="stylus">
  html,
  body 
    margin 0
    padding 0
    heigth 100%
    overflow hidden
  
  .bar
  // 导航栏
    height 60px
  .content
  // 子路由区域
    display flex
    height calc(100vh - 60px)
</style>