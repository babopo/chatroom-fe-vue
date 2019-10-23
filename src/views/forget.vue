<template>
    <div>
        <el-form :model="Forget" status-icon :rules="rules" ref="Forget" label-width="100px" class="form">
            <el-form-item label="选择方式" prop="val" required>
                <el-input v-model="Forget.val" class="select">
                    <el-select v-model="Forget.method" slot="prepend" placeholder="请选择">
                        <el-option label="用户名" value="username"></el-option>
                        <el-option label="邮箱" value="email"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass" required>
                <el-input type="password" v-model="Forget.pass" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass" required>
                <el-input type="password" v-model="Forget.checkPass" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('Forget')">找回</el-button>
                <el-button @click="resetForm('Forget')">重置</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 用户重置密码需要打开的页面
    import api from '@/api.js'
    export default {
        data() {
            const checkSpecificKey = (str) => {
                const dist = '`~!@#$%^&*()_+{}[]:";\'\\|<>,.?/~·！@#￥%……&*（）-——_=：；”“‘’《》，。？ '
                for(const key of dist) {
                    if(str.includes(key)) {
                        return false
                    }
                }
                return true
            }
            const validateVal = (rule, value, callback) => {
                if(this.Forget.method === "username") {
                    if(!value.trim()) {
                        callback(new Error("用户名不能为空"))
                    } else if(!checkSpecificKey(value)) {
                        callback(new Error('用户名不能包含特殊字符'))
                    }
                    callback()
                } else if(this.Forget.method === "email") {
                    if(!value.trim()) {
                        callback(new Error("邮箱不能为空"))
                    } else if(value.indexOf("@") === -1) {
                        callback(new Error("请输入正确的邮箱"))
                    }
                    callback()
                } else {
                    callback(new Error('请选择找回方式'))
                }
            }
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.Forget.checkPass !== '') {
                        this.$refs.Forget.validateField('checkPass')
                    }
                    callback()
                }
            }
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.Forget.pass) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                Forget: {
                    method: '',
                    val: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    // val: [{validator: validateVal, trigger: 'blur'}],
                    pass: [{validator: validatePass, trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}],
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if(valid) {
                        const res = await api.post('forget', this.gatherData())
                        if(res.data.code === 0) {
                            this.$notify({
                                title: '找回失败',
                                message: res.data.msg,
                                type: 'error',
                                duration: 2000,
                            })
                        } else {
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success',
                                duration: 2000,
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            back() {
                this.$router.go(-1)
            },
            gatherData() {
                const data = new FormData();
                data.append('method', this.Forget.method)
                data.append('val', this.Forget.val)
                return data
            },
        },
    }
</script>

<style lang="stylus">
    .el-select .el-input
        width 120px

    .select.el-input-group
        display flex
        .el-input-group__prepend
            background-color #fff
            flex 2
            height 40px
            line-height 40px
        .el-input__inner
            // 选择框还有两个像素的边框高度
            height 42px 
            flex 5
    .form
        // 表单的样式
        width 450px
        margin 100px auto

    @media (max-width 700px)
        .form
            width 350px
</style>