<template>
    <div></div>
</template>

<script>
// 用户重置密码需要打开的页面
    import api from '@/api.js'
    export default {
        async created() {
           const res = await api.post('passwordChanging', this.$route.params)
           if(res.data.code === 1) {
               this.$notify({
                   title: '成功',
                   message: res.data.msg,
                   type: 'success',
                   duration: 2000,
               })
           } else {
                this.$notify({
                    title: '失败',
                    message: res.data.msg,
                    type: 'error',
                    duration: 2000,
                })
           }
           this.$router.push('/')
        }
    }
</script>