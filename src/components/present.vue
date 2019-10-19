<template>
    <el-tabs v-model="editableTabsValue" tab-position="left" type="border-card" closable @edit="handleTabsEdit">
        <el-tab-pane
            :key="item.name"
            v-for="item in editableTabs"
            :label="item.title"
            :name="item.name"
        >
            <chatMsg></chatMsg>
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
                editableTabsValue: '2',
                editableTabs: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
                }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
                }],
                tabIndex: 2
            };
        },
        methods: {
            handleTabsEdit(targetName, action) {
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                activeName = nextTab.name;
                                }
                            }
                        });
                    }
                
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                }
            }
        },
        components: { chatMsg },
    }
</script>

<style lang="stylus" scoped>

</style>