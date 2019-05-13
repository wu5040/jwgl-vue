<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">课程号 </span>
        <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchCourse()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="CourseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column prop="CourseId" label="课程号" width="100"></el-table-column>
        <el-table-column prop="CourseName" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
        <el-table-column align="right">
          <template slot="header" scope="scope"><el-input v-model="search" size="mini" placeholder="输入关键字搜索"/></template>
          <template>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
         </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'grade',
  data () {
    return {
      SearchCourseID: '',
      search: '',
      CourseData: [{
        CourseId: '08306049',
        CourseName: 'Web开发技术',
        credit: '4'
      }, {
        CourseId: '08305001',
        CourseName: '离散数学',
        credit: '4'
      }, {
        CourseId: '08305011',
        CourseName: '操作系统(1)',
        credit: '5'
      }, {
        CourseId: '08305012',
        CourseName: '操作系统(2)',
        credit: '5'
      }, {
        CourseId: '08306110',
        CourseName: '职业定位与就业导向',
        credit: '2'
      }]
    }
  },
  methods: {
    SearchCourse () {
      this.$message('这里查询数据库！！！')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

.searchForm
  margin 0 auto
  width 40vw
  padding-top 5vh
  padding-bottom 2vh

.search
  width 100%
  margin 0 auto

.grid
  margin 0 auto

</style>
