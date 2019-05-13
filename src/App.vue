<template>
  <div id="app">
    <el-header v-show="isLogin" class="header">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isStudent">
        <el-menu-item index="1" route="/course">查看课程</el-menu-item>
        <el-menu-item index="2" route="/transcript">成绩单</el-menu-item>
        <el-menu-item index="3" route="/fastinput">选课</el-menu-item>
        <el-menu-item index="4" route="/fastdelete">退课</el-menu-item>
      </el-menu>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isTeacher">
        <el-menu-item index="1" route="/tcourse">查看课程</el-menu-item>
        <el-menu-item index="2" route="/cmanage">管理课程</el-menu-item>
        <el-menu-item index="3" route="/grade">录入成绩</el-menu-item>
      </el-menu>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router v-show="isAdmin">
        <el-menu-item index="1" route="/course">查看课程</el-menu-item>
        <el-menu-item index="2" route="/tmanage">管理教师</el-menu-item>
        <el-menu-item index="3" route="/smanage">管理学生</el-menu-item>
        <el-menu-item index="4" route="/cmanage">管理课程</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isLogin: true,
      isStudent: false,
      isTeacher: false,
      isAdmin: true
    }
  }
}
</script>

<style lang="stylus">
#app
  margin 0
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.header
  background-color rgb(84, 92, 100)

#nav
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
