<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">学号 </span>
        <el-input v-model="SearchStudentId" placeholder="请输入学号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchStudent()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="CourseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column prop="StudentID" label="学号" width="100"></el-table-column>
        <el-table-column prop="StudentName" label="学生名" width="150"></el-table-column>
        <el-table-column prop="Department" label="院系" width="100"></el-table-column>
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

  data () {
    return {
      SearchStudentId: '',
      search: '',
      CourseData: [{
        StudentID:'10000000',
        StudentName: '张珂昕',
        Department: '计算机学院'
      }, {
        StudentID:'10000001',
        StudentName: '许尉',
        Department: '计算机学院'
      }, {
        StudentID:'10000002',
        StudentName: '李四',
        Department: '通信学院'
      }, {
        StudentID:'10000013',
        StudentName: '刘钊钊',
        Department: '计算机学院'
      }]
    }
  },
  methods: {
    SearchStudent() {
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
