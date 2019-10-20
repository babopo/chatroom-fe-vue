<template>
    <div class="input">
        <div class="info">

        </div>
        <el-form :model="inputBox" ref="inputBox" :rules="rules">
            <el-form-item prop="message">
                <el-input 
                    type="textarea" 
                    :rows="3" 
                    placeholder="请在此输入内容" 
                    v-model="inputBox.message"
                    resize="none"
                />
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="onSubmit('inputBox')">发送</el-button>
                <el-button @click="clear('inputBox')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'inputBox',
        data() {
            const checkInput = (rule, value, callback) => {
                if(value.trim() === '') {
                    callback(new Error('内容不能为空'))
                }
                callback()
            }
            return {
                inputBox: {
                    message: '',
                },
                rules: {
                    message: [
                        {validator: checkInput, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        this.$store.commit('send', this.inputBox.message)
                        this.$refs[formName].resetFields()
                    } else {
                        return false
                    }
                })
            },
            clear(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input 
        position relative
    .btns
        position absolute
        right 0
        margin-top: -15px
</style>