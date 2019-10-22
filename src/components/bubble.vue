<template>
    <div class="container">
        <div class="bubBody">
            {{msg}}
        </div>
    </div>
</template>

<script>
// 聊天框气泡
    export default {
        name: 'bubble',
        props: ['msg'],
    }
</script>


<style lang="stylus" scoped>

    .bubBody
        float left
        border-radius 10px
        background-color #dfe4ed
        padding 8px 10px 
        text-align center
        position relative
        &::before
            content ''
            position absolute
            box-sizing border-box
            margin 0
            padding 0
            border 7px solid
            border-color transparent #dfe4ed transparent transparent
            left -14px            
</style>
