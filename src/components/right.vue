<template>
    <el-card shadow="hover">
        <div slot="header" class='header'>
            <span>在线用户</span>
        </div>
        <div class="info" v-for="user in users" :key="user.name" @click="addTab(user.name)">
            <el-tooltip :content="user.name" placement="top">
                <el-avatar class="avatar" size="small" :src="`https://api.adorable.io/avatars/100/${user.name}.png`" @error="errorHandle" :alt="user.name">
                    <img :src="`https://api.adorable.io/avatars/100/${user.name}.png`" :alt="user.name"/>
                </el-avatar>
            </el-tooltip>
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
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .info
        display inline-block
        margin 8px
        cursor: pointer
    .avatar
        vertical-align middle
    .userName
        margin-left 10px
        vertical-align middle
    .header
        font-size 1rem
</style>