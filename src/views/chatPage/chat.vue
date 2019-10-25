<template>
    <div class="all">
        <div class="wrap">
            <div class="left">
                <present class="present"></present>
                <inputBox class="inputBox"></inputBox>
            </div>
            <right class="right" v-show="show"></right>
        </div>
        <el-tooltip content="切换显示在线用户" placement="top">
            <el-button type="primary" :icon="show ? 'el-icon-arrow-right' : 'el-icon-arrow-left'" @click="folder" class="folder" circle/>
        </el-tooltip>
        <el-tooltip content="注销登陆" placement="top">
            <el-button type="danger" icon="el-icon-circle-close" @click="logout" class="logout" circle/>
        </el-tooltip>
    </div>
</template>

<script>
// 左右双栏布局，左栏上下双栏布局
import present from '@/components/present.vue'
import inputBox from '@/components/inputBox.vue'
import right from '@/components/right.vue'

import api from '@/api.js'

    export default {
        data() {
            return {
                show: false
            }
        },
        components: { present, inputBox, right },
        mounted() {

        },
        methods: {
            folder() {
                this.show = !this.show
            },
            logout() {
                api.get('logout')
                // this.$router.push('/')
                // 这里要强制刷新页面，否则登陆账号会保留上一个账号的消息记录
                window.location.href = '/'
            }
        },
    }
</script>

<style lang="stylus" scoped>
    //因为父元素设定了flex
    .wrap
        height 100%
        display flex
    .left
        flex 4
        display inline-flex
        flex-direction: column
    .right
        flex 1
    .present
        flex 3
    .inputBox
        flex 1
    .all
        position relative
        width 100%
    .folder
        position absolute
        z-index 100
        top 50%
        right 20px
        transform translateY(-50%)
        opacity .4
        &:hover
            opacity 1
    .logout
        position absolute
        z-index 100
        top 55%
        right 20px
        opacity .4
        &:hover
            opacity 1
</style>



