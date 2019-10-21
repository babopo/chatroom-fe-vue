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
            connect() {
                console.log(1)
            }
        },
        mounted() {
            this.$socket.emit('join', this.username)
        }
    };
</script>

<style lang="stylus">

</style>



