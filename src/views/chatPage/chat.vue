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
    </div>
</template>

<script>
// 左右双栏布局，左栏上下双栏布局
import present from '@/components/present.vue'
import inputBox from '@/components/inputBox.vue'
import right from '@/components/right.vue'

    export default {
        data() {
            return {
                show: false
            }
        },
        components: { present, inputBox, right },
        mounted() {
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
        methods: {
            folder() {
                this.show = !this.show
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
</style>



