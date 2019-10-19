<template>
    <div class="wrap">
        <div class="left">
            <present class="present"></present>
            <inputBox class="inputBox"></inputBox>
        </div>
        <right class="right"></right>
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

            }
        },
        components: { present, inputBox, right }
    }
</script>

<style lang="stylus">
    //因为父元素设定了flex
    .wrap
        width 100%
        display flex
    .left
        flex 3
        display inline-flex
        flex-direction: column
    .right
        flex 1
        background-color green
    .present
        flex 3
    .inputBox
        flex 1
        background-color blue
    
</style>



