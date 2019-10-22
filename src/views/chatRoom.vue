<template>
    <div>
        <headBar 
            class="bar"
            :msg="[
                 {
                    name: '主页',
                    idx: `/chat-room/${username}`,
                },
                {
                    name: '设置',
                    idx: `/chat-room/${username}/settings`,
                }
            ]" />
            
        <main class="content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import headBar from '@/components/headBar'
    export default {
        props: ['username'],
        data() {
            return {

            }
        },
        components: {
            headBar,
        },
        sockets: {

        },
        mounted() {
            // 在这里设置当前用户，防止经过路由首页的直接跳转而使当前用户为空，也减少了登陆和注册页的重复代码
            this.$store.commit('setCurrentUser', this.username)
            this.$socket.emit('join', this.username)
        },
    };
</script>

<style lang="stylus">

</style>



