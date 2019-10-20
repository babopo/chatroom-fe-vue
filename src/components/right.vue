<template>
    <el-card shadow="hover">
        <div slot="header" class='header'>
            <span>在线用户</span>
        </div>
        <div class="info" v-for="user in users" :key="user" @click="addTab(user)">
            <el-avatar class="avatar" size="small" :src="`https://api.adorable.io/avatars/100/${user}.png`" @error="errorHandle" :alt="user">
                <img :src="`https://api.adorable.io/avatars/100/${user}.png`" :alt="user"/>
            </el-avatar>
            <span class="userName">{{user}}</span>
        </div>
    </el-card>
</template>

<script>
// 展示在线用户，点击头像私聊，在左栏加入私聊标签
    export default {
        name: 'right',
        data() {
            return {
            
            };
        },
        computed: {
            users() {
                return this.$store.state.users
            }
        },
        methods: {
            errorHandle() {
                // 加载失败时启用备用图片
                return true
            },
            addTab(user) {
                this.$store.commit('add', user)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .info
        margin-bottom 8px
        cursor: pointer
    .avatar
        vertical-align middle
    .userName
        margin-left 10px
        vertical-align middle
    .header
        font-size 14px
</style>