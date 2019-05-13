<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div style="width: 700px; margin: 0 auto">
        <el-form ref="serchList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="searchList.courseId" placeholder="请输入课程号" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="课程名" style="float: left">
            <el-input v-model="searchList.courseName" placeholder="请输入课程名" style="width: 200px"></el-input>
          </el-form-item>
          <el-button @click="test()">查询</el-button>
        </el-form>
      </div>
      <el-table :data="CourseData" style="width: 700px; margin: 0 auto" max-height="600" :stripe="true" :border="true">
        <el-table-column prop="CourseId" label="课程号" width="100"></el-table-column>
        <el-table-column prop="CourseName" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
        <el-table-column prop="TeacherId" label="教师号" width="100"></el-table-column>
        <el-table-column prop="TeacherName" label="教师名" width="100"></el-table-column>
        <el-table-column prop="date" label="学期" width="150"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course',
  data () {
    return {
      CourseData: [{
        CourseId: '08306049',
        CourseName: 'Web开发技术',
        credit: '4',
        TeacherId: '1000',
        TeacherName: '魏晓',
        date: '2018-2019 春季'
      }, {
        CourseId: '08305001',
        CourseName: '离散数学',
        credit: '4',
        TeacherId: '1001',
        TeacherName: '武频',
        date: '2018-2019 秋季'
      }, {
        CourseId: '08305011',
        CourseName: '操作系统(1)',
        credit: '5',
        TeacherId: '1002',
        TeacherName: '张建',
        date: '2018-2019 秋季'
      }, {
        CourseId: '08305012',
        CourseName: '操作系统(2)',
        credit: '5',
        TeacherId: '1002',
        TeacherName: '张建',
        date: '2018-2019 冬季'
      }, {
        CourseId: '08306110',
        CourseName: '职业定位与就业导向',
        credit: '2',
        TeacherId: '1003',
        TeacherName: '张惠然',
        date: '2018-2019 春季'
      }],
      searchList: [{
        courseId: '',
        courseName: ''
      }]
    }
  },
  methods: {
    test () {
      console.log(this.searchList)
      this.$message('这里需要在数据库查询数据！！！')
    }
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

</style>
