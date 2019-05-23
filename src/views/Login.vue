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
  name: "login",
  data() {
    return {
      loginForm: {
        user_id: "",
        password: ""
      }
    };
  },
  created: function() {
    var that = this;
    localStorage.setItem("isLogin", false);
    localStorage.setItem("isStudent", false);
    localStorage.setItem("isTeacher", false);
    localStorage.setItem("isAdmin", false);
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.login();
      }
    };
  },
  methods: {
    login() {
      console.log("要登录了！");
      let formData = new FormData();
      formData.append("userId", this.loginForm.user_id);
      formData.append("password", this.loginForm.password);
      console.log("userid", formData);
      this.axios
        .post("http://localhost:8099/index/login/", formData)
        .then(res => {
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log(res.data.jsonObject);
            localStorage.setItem("user_id", res.data.jsonObject.user_id);
            localStorage.setItem("token", res.data.jsonObject.token);
            if (res.data.jsonObject.role === "student") {
              console.log("student登录");
              localStorage.setItem("isLogin", true);
              localStorage.setItem("isStudent", true);
              localStorage.setItem("isTeacher", false);
              localStorage.setItem("isAdmin", false);
              // this.$router.push('course')
              // this.$store.commit("setIsLogin", true);
              // this.$store.commit("setIsStudent", true);
              // this.$store.commit("setIsTeacher", false);
              // this.$store.commit("setIsAdmin", false);
              this.$router.push({
                path: "/home"
              });
            } else if (res.data.jsonObject.role === "teacher") {
              console.log("teacher登录");
              localStorage.setItem("isLogin", true);
              localStorage.setItem("isStudent", false);
              localStorage.setItem("isTeacher", true);
              localStorage.setItem("isAdmin", false);
              // this.$store.commit("setIsLogin", true);
              // this.$store.commit("setIsTeacher", true);
              // console.log(this.$store.getters.getIsStudent)
              // console.log(this.$store.getters.getIsTeacher)
              this.$router.push({
                path: "/home"
              });
            } else {
              console.log("admin登录");
              localStorage.setItem("isLogin", true);
              localStorage.setItem("isStudent", false);
              localStorage.setItem("isTeacher", false);
              localStorage.setItem("isAdmin", true);
              this.$router.push({
                path: "/home"
              });
            }
          }
        })
        .catch(error => {
          console.log(error.response);
          this.$notify({
            title: "登陆失败",
            message: error.response.data.message,
            type: "error"
          });
        });
    }
  }
};
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
