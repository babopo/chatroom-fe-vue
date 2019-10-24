<template>
    <el-card shadow="hover">
        <div slot="header" class='header'>
            <span>在线用户</span>
        </div>
        <div class="info" v-for="user in users" :key="user.name" @click="addTab(user.name)">
            <el-tooltip :content="user.name" placement="top">
                <avatar :user="user.name"></avatar>
            </el-tooltip>
        </div>
    </el-card>
</template>

<script>
// 展示在线用户，点击头像私聊，在左栏加入私聊标签
    import avatar from '@/components/avatar.vue'
    export default {
        name: 'right',
        components: { avatar },
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