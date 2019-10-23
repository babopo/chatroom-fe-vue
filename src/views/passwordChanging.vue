<template>
    <div></div>
</template>

<script>
// 用户重置密码需要打开的页面
    import api from '@/api.js'
    export default {
        async created() {
           const res = await api.post('passwordChanging', this.$route.params)
            this.$notify({
                title: '成功',
                message: res.data,
                type: 'success',
                duration: 2000,
            })
           this.$router.push('/')
        }
    }
</script>