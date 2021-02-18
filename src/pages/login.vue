<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <el-form-item prop='username'>
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type='password'></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //登录表单的数据绑定对象
        loginForm: {
          grant_type: '',
          username: ' '
          /* password:' ',
          scope:'',
          client_id:'',
          client_secret:'' */
        },
        loginFormRules: {
          username: [{
              required: true,//required是否为必填项
              message: '请输入用户名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            } 
          ],
          password: [{
              required: true,
              message: '请输入密码名称',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 15,
              message: '长度在 6到 15 个字符',
              trigger: 'blur'
            } //require必填项
          ]
        }
      };
    },
    methods: {
      resetLoginForm() {
        //console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return; /* this.$message.error('用户名或密码不能为空！'); */

          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            scope: '',
            client_id: '',
            client_secret: '',
            grant_type: ''
          }
          const res = await this.$http.post('/auth/token', this.$qs.stringify(params));

          //console.log(res.data);
          if (res.code === 401) return this.$message.error('登陆失败')
          this.$message.success('登陆成功');
          //console.log(res);
          if (res.data.access_token !== undefined) {
            let token = res.data.token_type + ' ' + res.data.access_token
            window.sessionStorage.setItem('token', token);
           
            window.sessionStorage.setItem('name', res.data.name);
            this.$router.push('/home');
          }


          /* login(params).then(res => {
          if (res.access_token !== undefined) {
            let str = res.token_type + ' ' + res.access_token
            sessionStorage.setItem('token', str)
            sessionStorage.setItem('name', res.name)
            sessionStorage.setItem('permission', res.permission)
            this.$message({
              type: 'success',
              message: '登录成功!',
              duration: 1000
            })
            this.$router.push({path: '/index'})
          } else if (res.code === 401) {
            this.$message.error(res.message)
          }
        }) */
        });
      }
    }
  };

</script>


<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    /* 输入框在区域内 */
  }

</style>
