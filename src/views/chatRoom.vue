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
            // 触发两个提示
            this.$notify({
                title: '提示1',
                message: '左侧标签栏切换当前聊天页',
                duration: 2000,
            })
            setTimeout(() => {
                this.$notify({
                    title: '提示2',
                    message: '右侧标签栏点击头像打开私聊',
                    duration: 2000,
                })
            }, 1000)
        },
        beforeDestroy () {
            // 组件销毁时假装断开连接
            this.$socket.emit('leave', this.username)
        }
    };
</script>

<style lang="stylus">

</style>



