<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">教师号 </span>
        <el-input v-model="SearchTeacherID" placeholder="请输入教师号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchTeacher()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="CourseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column prop="TeacherID" label="教师号" width="100"></el-table-column>
        <el-table-column prop="TeacherName" label="教师名" width="150"></el-table-column>
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
      SearchTeacherID: '',
      search: '',
      CourseData: [{
        TeacherID:'10000000',
        TeacherName: '丁学海',
        Department: '计算机学院'
      },
      {
        TeacherID:'10000001',
        TeacherName: '朱颖',
        Department: '计算机学院'
      },
      {
        TeacherID:'10000002',
        TeacherName: '陆晓峰',
        Department: '通信学院'
      },
      {
        TeacherID:'10000013',
        TeacherName: '王艺璇',
        Department: '计算机学院'
      }]
    }
  },
  methods: {
    SearchTeacher () {
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
