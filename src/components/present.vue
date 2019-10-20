<template>
    <el-tabs v-model="currentTab" tab-position="left" type="border-card" @tab-remove="removeTab">
        <el-tab-pane
            :key="item.room"
            v-for="item in tabs"
            :label="item.title"
            :name="item.room"
            :closable="item.room === '1' ? false : true"
            lazy
        >
            <chatMsg :room="item.room"></chatMsg>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
// 展示聊天信息页，和标签切换
    import chatMsg from '@/components/chatMsg.vue'
    export default {
        name: 'present',
        data() {
            return {
                currentTab: '1'
            };
        },
        computed: {
            tabs()  {
                return this.$store.state.msgsAll
            }
        },
        watch: {
            currentTab: {
                // 变化时改变store中的对应值，因为输入框组件需要知道向哪个room发送信息
                handler: function(val) {
                    // 第一个参数为新值
                    this.$store.commit('setCurrentTab', val)
                },
                immediate: true
            }
        },
        methods: {
            removeTab(targetName) {
                this.$store.commit('remove', targetName)
                this.currentTab = this.$store.getters.lastRoom
                // 绑定当前显示的是最后一个标签页
            }
        },
        components: { chatMsg },
        mounted() {
            const msgBox = document.querySelector('.el-tabs__content')
            msgBox.scrollTop = msgBox.scrollHeight - msgBox.clientHeight
        },
    }
</script>

<style lang="stylus">
    .el-tabs--border-card>.el-tabs__content
        overflow auto
        height 100%
</style>