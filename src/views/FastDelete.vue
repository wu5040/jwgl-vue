<template>
  <div>
    <div v-show="isAvailable" class="notAvailable">
      <i class="el-icon-warning" style="font-size: 100px; font-weight: bold; margin: 0 auto"></i>
      <h1 style="margin: 0 auto">选课时间未到！</h1>
    </div>
    <div v-show="!isAvailable">
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">课程号 </span>
        <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchCourse()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="courseData" border style="width:600px; margin: 0 auto;">
        <el-table-column prop="courseId" label="课程号" width="100"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="80"></el-table-column>
        <el-table-column prop="teacherId" label="教师号" width="100"></el-table-column>
        <el-table-column prop="teacherName" label="教师名" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="70">
          <template :slot-scope="scope">
            <el-button @click="DeleteChoise()" type="text" size="medium">退课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fastdelete',
  data () {
    return {
      isAvailable: false,
      SearchCourseID: '',
      courseData: [
        {
          courseId: '08306049',
          courseName: 'Web开发技术',
          credit: '4',
          teacherId: '1000',
          teacherName: '魏晓'
        }
      ]
    }
  },
  methods: {
    SearchCourse () {
      this.$message('这里查询数据库！！！')
    },
    DeleteChoise () {
      this.$message('这里需要在数据库插入数据！！！')
    }
  }
}
</script>

<style lang="stylus">
.notAvailable
  margin 0 auto
  width 40vw
  padding-top 10vh

.searchForm
  margin 0 auto
  width 40vw
  padding-top 5vh
  padding-bottom 2vh
</style>
