<template>
    <div class="set-container">
        <el-card class="av-container">
            <avatar :user="user" v-if="refresh" :size="size" @click="resetAV"></avatar>
            <el-upload
                class="upload"
                drag
                accept="image/*"
                with-credentials
                name='avatar'
                :show-file-list="false"
                :on-success="uploadSuccess"
                action="https://limbotech.top:8000/api/settings/upload">
                <i class="el-icon-upload2"></i>
            </el-upload>
            <p class='tips'>右侧拖拽或点击上传,图片将被自动裁剪至合适大小</p>
        </el-card>
        <el-form :model="Settings" status-icon :rules="rules" ref="Settings" label-width="90px" class="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user" disabled></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="Settings.pass" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="Settings.checkPass" :show-password="true"></el-input>
            </el-form-item>s
            <el-form-item label="新邮箱" prop="email">
                <el-input v-model="Settings.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('Settings')">更新</el-button>
                <el-button @click="resetForm('Settings')">重置输入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import avatar from '@/components/avatar.vue'
    import api from '@/api.js'
    export default {
        components: {
            avatar,
        },
        computed: {
            user() {
                return this.$store.state.currentUser
            }
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.Settings.checkPass !== '') {
                        this.$refs.Settings.validateField('checkPass')
                    }
                    callback()
                }
            }
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.Settings.pass) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            } 
            return {
                Settings: {
                    pass: '',
                    checkPass: '',
                    email: '',
                },
                rules: {
                    pass: [{validator: validatePass, trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}],
                    email: [{ type: 'email', message: "请输入正确的邮箱", trigger: ['blur', 'change'] }],
                },
                size: 100,
                refresh: true,
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if(valid) {
                        const res = await api.post('update', this.gatherData())
                        this.$notify({
                            title: '更新成功',
                            message: res.data.msg,
                            type: 'success',
                            duration: 2000,
                        })
                        this.resetForm(formName)
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            gatherData() {
                const data = new FormData()
                for(const item in this.Settings) {
                    if(this.Settings[item] !== '') {
                        data.append(item, this.Settings[item])
                    }
                }
                data.append('username', this.user)
                return data
            },
            uploadSuccess(res) {
                this.size = 100
                if(res.code) {
                    this.$notify({
                        type: 'success',
                        message: res.msg,
                        duration: 2000
                    })
                } else {
                    this.$notify({
                        type: 'error',
                        message: res.msg,
                        duration: 2000
                    })
                }
                this.resetAV()
            },
            resetAV() {
                this.refresh = false 
                this.$nextTick(() => {
                    this.refresh = true
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .set-container
        width 100%
    .upload
        float right
        .el-icon-upload2
            line-height 100px
    .tips
        text-align center
        margin 10px 0
        font-size 14px
    .form,
    .av-container
        // 表单的样式
        width 400px
        margin 8px auto

    @media (max-width 700px)
        .form
        .av-container
            width 300px
</style>

<style lang="stylus">
// 这段样式需要全局生效
    div.el-upload-dragger
        width 100px
        height 100px
        border-radius 100%
</style>


