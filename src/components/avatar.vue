<template>
    <el-avatar class="avatar" :size="size" :src="avatarPath" @error="errorHandle" :alt="user.name">
        <img :src="`https://api.adorable.io/avatars/100/${user}.png`" :alt="user"/>
    </el-avatar>
</template>

<script>
// 用来展示头像的组件，若能查询到头像则展示，否则展示默认头像
    import api from '@/api.js'
    export default {
        name: 'avatar',
        props: {
            user: String,
            size: {
                type: [String, Number],
                default: 'small'
            }
        },
        data() {
            return {
                avatarPath: ''
            }
        },
        async created() {
            // 数据结构没设计好，只能在组件创建的时候单独发ajax查询了
            const username = new FormData()
            username.append('username', this.user)
            this.avatarPath = (await api.post('avatar', username)).data    
        },
        methods: {
            errorHandle() {
                // 加载失败时启用备用图片
                return true
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .avatar
        vertical-align middle
        margin-right 5px
</style>

