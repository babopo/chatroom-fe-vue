<template>
    <el-form :model="Login" status-icon :rules="rules" ref="Login" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="Login.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="Login.pass" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Login')">登陆</el-button>
        <el-button @click="resetForm('Login')">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
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
      };
      const checkUsername = (rule, value, callback) => {
        if(!value.trim()) {
          callback(new Error("用户名不能为空"))
        } else if(!checkSpecificKey(value)) {
          callback(new Error('用户名不能包含特殊字符'))
        }
        callback();
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.Login.checkPass !== '') {
            this.$refs.Login.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        Login: {
          username: '',
          pass: '',
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //提交
            const res = await api.post('login', this.gatherData())
            if(res.data.code) {
              // 跳转至聊天室
              this.$router.push({
                  path: `/chat-room/${this.Login.username}`,
              })
            } else {
              // 登陆失败
              this.$notify({
                  title: '登陆失败',
                  message: '用户名或密码错误',
                  type: 'error',
                  duration: 2000,
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      gatherData() {
        const data = new FormData();
        data.append('username', this.Login.username)
        data.append('password', this.Login.pass)
        return data
      },
    }
  }
</script>

<style lang="stylus" scoped>
</style>
