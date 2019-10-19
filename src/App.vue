<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',

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