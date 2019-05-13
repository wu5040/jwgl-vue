<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div class="search">
        <el-form ref="searchList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
          </el-form-item>
          <el-button type="primary" round @click="SearchCourse()">查询所有选修此课程的学生成绩</el-button>
        </el-form>
      </div>
      <el-table :data="CourseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column label="学号" prop="StudentId"></el-table-column>
        <el-table-column label="成绩" prop="grade"></el-table-column>
        <el-table-column align="right">
          <template slot="header" :slot-scope="scope"><el-input v-model="search" size="mini" placeholder="输入关键字搜索"/></template>
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
      searchList: [{
        courseId: ''
      }],
      CourseData: [{
        StudentId: 's1',
        grade: '89'
      }, {
        StudentId: 's2',
        grade: '75'
      }, {
        StudentId: 's3',
        grade: '84'
      }, {
        StudentId: 's4',
        grade: '93'
      }, {
        StudentId: 's5',
        grade: '88'
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

.search
  width 100%
  margin 0 auto

.grid
  margin 0 auto

</style>
