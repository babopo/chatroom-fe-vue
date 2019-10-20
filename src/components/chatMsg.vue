<template>
    <div>
        <!-- <p v-for="msg in msgs" :key="msg.timeStamp">{{msg.user + ' ' + new Date(msg.timeStamp).toString() + ' ' + msg.content}}</p> -->
        <el-row class="row" v-for="msg in msgs" :key="msg.timeStamp">
            <el-avatar class="block" size="small" :src="`https://api.adorable.io/avatars/100/${msg.user}.png`"></el-avatar>
            <div class="block">
                <p class="info">
                    <span><b>{{msg.user === currentUser ? `你(${msg.user})` : msg.user}}</b>{{' ' + new Date(msg.timeStamp).toLocaleTimeString()}}</span>
                </p>
                <span class="message">{{msg.content}}</span>
            </div>
        </el-row>
    </div>
</template>

<script>
    import api from '@/api.js'
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
</style>