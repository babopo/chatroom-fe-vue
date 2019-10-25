<template>
    <div class="canvas-container">
        <leonsans v-if="twLoaded" showingText="404\nNot\nFound"></leonsans>
    </div>
</template>
<script>
    //动画字体需要的资源
    import leonsans from '@/components/leonsans.vue'
    export default {
        computed: {
            twLoaded() {
                return this.$store.state.twLoaded
            }
        },
        components: {leonsans}
    }
</script>

<style lang="stylus">
    .canvas-container
        width 100%    
</style>
