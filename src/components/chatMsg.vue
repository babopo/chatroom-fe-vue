<template>
    <div>
        <!-- <p v-for="msg in msgs" :key="msg.timeStamp">{{msg.user + ' ' + new Date(msg.timeStamp).toString() + ' ' + msg.content}}</p> -->
        <el-row class="row" v-for="msg in msgs" :key="msg.timeStamp">
            <avatar :user="msg.user"></avatar>
            <div class="block">
                <p class="info">
                    <span><b>{{msg.user === currentUser ? `你(${msg.user})` : msg.user}}</b>{{' ' + new Date(msg.timeStamp).toLocaleTimeString()}}</span>
                </p>
                <bubble :msg="msg.content"/>
            </div>
        </el-row>
    </div>
</template>

<script>
    import bubble from '@/components/bubble.vue'
    import avatar from '@/components/avatar.vue'
    export default {
        name: 'chatMsg',
        props: ['room'],
        data() {
            return {
            
            };
        },
        computed: {
            msgs() {
                return this.$store.state.msgsAll.find(item => item.room === this.room).msgs
            },
            currentUser() {
                return this.$store.state.currentUser
            },
        },
        components: {
            bubble,
            avatar
        },
        updated() {
            const msgBox = document.querySelector('.el-tabs__content')
            msgBox.scrollTop = msgBox.scrollHeight - msgBox.clientHeight
        },
    }
</script>

<style lang="stylus" scoped>
    .row 
        margin 10px 0
    .block
        display inline-block
        vertical-align middle
        margin 0 5px
    .info
        margin 0
        font-size .8rem
</style>