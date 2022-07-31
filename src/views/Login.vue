<template>
  <div class="login-wrapper" :style="'background-image:url('+ Background +')'">
    <div class="form-box">
      <div class="form-title">
        <img src="../assets/img/logo2.png" alt="icon">
        <p>账 号 登 录</p>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码" prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-show="emailVisible" v-model="loginForm.email" type="email" auto-complete="off" placeholder="请输入邮箱" prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item>

        <!-- <div style="display: flex;justify-content: center;"> -->
          <el-form-item>
            <el-button :loading="loading" size="small" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
  <!--        <el-form-item>
            <el-button :loading="loadingRegister" size="small" type="primary" style="width:100px;" @click.native.prevent="handleRegister">
              <span v-if="!loadingRegister">注册</span>
              <span v-else>注 册 中...</span>
            </el-button>
          </el-form-item> -->
        <!-- </div> -->

      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from '@/utils/cookie'
import Background from '../assets/img/login-background.jpg'

export default {
  name: 'Login',
  data() {
    return {
      Background,
      emailVisible:false,
      loginForm: {
        username: 'admin',
        password: '123456',
        email:'',
        rememberMe: true
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      loadingRegister:false,
      redirect: undefined
    }
  },
  mounted () {

  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      let that=this
      this.loading = true
      this.axios
        .get('http://192.168.123.110:8080/user/login?username='+this.loginForm.username+'&password='+this.loginForm.password)
        .then(response => {
         console.log(response.data)
         if(response.data.code==0){
           that.loading = false
           setToken()
           localStorage.setItem("token",response.data.data.value);
           that.$router.push({path:  '/home'})
         }
         else{
           this.$message.error(response.data.data);
           this.loading = false
         }
        })
    },
    handleRegister() {
      this.emailVisible=true
      let that=this
      this.loadingRegister = true
      this.axios
        .get('http://192.168.123.110:8080/user/register?username='+this.loginForm.username+'&password='+this.loginForm.password+'&email='+this.loginForm.email+'&group=0')
        .then(response => {
         console.log(response.data)
         that.loading = false
        })
    },
  }
}
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  .form-box {
    width: 320px;
    padding: 15px 30px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 1, .1);
    .form-title {
      margin: 0 auto 35px;
      text-align: center;
      color: #707070;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}
</style>
