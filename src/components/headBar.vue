<template>
    <el-menu
    mode="horizontal"
    background-color="#409eff"
    text-color="#fff"
    :router="true"
    active-text-color="#ffffff">
        <el-menu-item v-for="item of msg" :index="item.idx" :key="item.name">{{item.name}}</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'headBar',
        props: ['msg'],
        data() {
            return {
            
            };
        },
    }
</script>

<style lang="stylus" scoped>

</style>