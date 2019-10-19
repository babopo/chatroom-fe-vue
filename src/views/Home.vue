<template>
  <div>
    <headBar 
      class="bar"
      :msg="[{
              name: '登陆',
              idx: '/home/login'
            },
            {
              name: '注册',
              idx: '/home/register'
            },
            {
              name: '关于',
              idx: '/about'
            },
            ]" />
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import headBar from '@/components/headBar.vue'

export default {
  name: 'home',
  components: {
    headBar,
  }
}
</script>

<style lang="stylus" scoped>
  .form
    // 表单的样式
    width 400px
    margin auto

  @media (max-width 700px)
    .form
      width 300px
</style>