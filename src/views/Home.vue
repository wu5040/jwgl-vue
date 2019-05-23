<template>
    <div>

        <el-header v-show="isLogin" class="header">
            <el-row>
                <el-col :span="18">
                    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isStudent">
                        <el-menu-item index="1" route="/course">我的课表</el-menu-item>
                        <el-menu-item index="2" route="/transcript">我的成绩</el-menu-item>
                        <el-menu-item index="3" route="/fastinput">我要选课</el-menu-item>
                        <el-menu-item index="4" route="/fastdelete">我要退课</el-menu-item>
                    </el-menu>
                    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isTeacher">
                        <el-menu-item index="1" route="/tcourse">我的课程</el-menu-item>
                        <!-- <el-menu-item index="2" route="/cmanage">管理课程</el-menu-item> -->
                        <el-menu-item index="3" route="/grade" disabled=true>录入成绩</el-menu-item>
                    </el-menu>
                    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isAdmin">
                        <el-menu-item index="1" route="/aopen">开课信息</el-menu-item>
                        <el-menu-item index="2" route="/tmanage">管理教师</el-menu-item>
                        <el-menu-item index="3" route="/smanage">管理学生</el-menu-item>
                        <el-menu-item index="4" route="/acourse">管理课程</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4" style="height:60px" justify="end"> 
                    <el-button type="text" style="height:60px">Welcome,{{ this.name}}!</el-button>
                </el-col>
                <el-col :span="2" style="height:60px" justify="end">
                    <el-button type="text" style="height:60px" @click="goBack()">安全退出</el-button>
                </el-col>
            </el-row>
        </el-header>
        <div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isLogin: JSON.parse(localStorage.getItem("isLogin")),
      isStudent: JSON.parse(localStorage.getItem("isStudent")),
      isTeacher: JSON.parse(localStorage.getItem("isTeacher")),
      isAdmin: JSON.parse(localStorage.getItem("isAdmin"))
    };
  },
  created: function() {
    // console.log("123456", this.$store.state.isLogin);
    this.name = localStorage.getItem("name");
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    this.isStudent = JSON.parse(localStorage.getItem("isStudent"));
    this.isTeacher = JSON.parse(localStorage.getItem("isTeacher"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  },
  methods: {
    goBack() {
      localStorage.setItem("token", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="stylus">
#app {
    margin: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.header {
    background-color: rgb(84, 92, 100);
}

#nav {
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
