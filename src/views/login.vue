<template>
    <el-form :model="Register" status-icon :rules="rules" ref="Register" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="Register.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="Register.pass" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Register')">登陆</el-button>
        <el-button @click="resetForm('Register')">重置</el-button>
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
          if (this.Register.checkPass !== '') {
            this.$refs.Register.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        Register: {
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
          // console.log(valid)
          if (valid) {
            //提交
            const res = await api.post('posts/', this.gatherData())
            console.log('yeah', res)
            this.$router.push({
                path: `/chat-room/${res.data.id}`,
            })
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
        data.append('username', this.Register.username)
        data.append('pass', this.Register.pass)
        return data
      },
    }
  }
</script>

<style lang="stylus" scoped>
</style>
