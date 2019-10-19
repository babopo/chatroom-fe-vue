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
                user: this.username
                // 保存一下路由的参数，因为子路由会用到
            }
        },
        components: {
            headBar,
        }
    }
</script>

<style lang="stylus">

</style>



