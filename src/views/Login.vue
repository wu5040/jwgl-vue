<template>
  <div class="background">
    <div class="container">
      <div style="height:25%"></div>
      <div class="loginFormContainer">
        <h1 style="color: ">教务系统</h1>
        <el-form ref="serchList" class="loginForm">
          <el-form-item prop="userName">
            <i class="iconfont" style="font-size: 28px;">&#xe62e;</i>
            <el-input v-model="loginForm.user_id" placeholder="请输入学号" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <i class="iconfont" style="font-size: 28px; font-weight: bold;">&#xe665;</i>
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="login()" style="width:130px" type="primary" plain>
          <i class="iconfont" style="font-size: 18px;">&#xe622;</i>登 录 系 统
        </el-button>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        user_id: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log('要登录了！')
      let formData = new FormData()
      formData.append('userId', this.loginForm.user_id)
      formData.append('password', this.loginForm.password)
      this.axios
        .post('http://localhost:8099/index/login/', formData)
        .then(res => {
          let resCode = res.data.code
          if (resCode === 200) {
            console.log(res.data.jsonObject)
            localStorage.setItem('token', res.data.jsonObject.token)
            if (res.data.jsonObject.role === 'student') {
              console.log('student登录')
            } else {
              console.log('teacher登录')
            }
          }
        })
        .catch(error => {
          console.log(error.response)
          if (error.response.data.code === 40401) {
            console.log('用户名不存在')
          } else {
            console.log('密码错误')
          }
        })
    }
  }
}
</script>

<style  lang="stylus">
.background {
  background: url('../assets/img/background.jpg') no-repeat;
  background-size: 100%;
}

.container {
  width: 100vw;
  height: 100vh;
}

.loginFormContainer {
  margin: 0 auto;
  width: 30%;
  border: 2px solid #a1a1a1;
  border-radius: 25px;
  background-color: rgba(236, 240, 241, 0.7);
}

.loginForm {
  margin: 0 auto;
}
</style>
