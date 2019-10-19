<template>
    <el-form :model="Register" status-icon :rules="rules" ref="Register" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="Register.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="Register.pass" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password" v-model="Register.checkPass" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Register.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Register')">注册</el-button>
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
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.Register.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        Register: {
          username: '',
          pass: '',
          checkPass: '',
          email: '',
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            // 表单验证的另一种方式
            // { required: true, message: "邮箱不能为空", trigger: 'blur' }
            { type: 'email', message: "请输入正确的邮箱", trigger: ['blur', 'change'] }
          ]
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
        data.append('email', this.Register.email)

        return data
      },
    }
  }
</script>

<style lang="stylus" scoped>

</style>