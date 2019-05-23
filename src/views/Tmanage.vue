<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <!-- <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">教师号 </span>
        <el-input v-model="SearchTeacherID" placeholder="请输入教师号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchTeacher()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div> -->
      <!-- <el-table :data="CourseData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"> -->
      <el-table :data="CourseData" v-loading="loading" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
        <el-table-column prop="gh" label="教师号"></el-table-column>
        <el-table-column prop="name" label="教师名"></el-table-column>
        <el-table-column prop="xl" label="学历"></el-table-column>
        <el-table-column prop="mc" label="院系"></el-table-column>
        <el-table-column prop="jbgz" label="基本工资"></el-table-column>
        <!-- <el-table-column align="right">
          <!-- <template slot="header" scope="scope"><el-input v-model="search" size="mini" placeholder="输入关键字搜索"/></template> -->
          <template>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
         </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      SearchTeacherID: "",
      search: "",
      CourseData: [
        {
          TeacherID: "10000000",
          TeacherName: "丁学海",
          Department: "计算机学院"
        },
        {
          TeacherID: "10000001",
          TeacherName: "朱颖",
          Department: "计算机学院"
        },
        {
          TeacherID: "10000002",
          TeacherName: "陆晓峰",
          Department: "通信学院"
        },
        {
          TeacherID: "10000013",
          TeacherName: "王艺璇",
          Department: "计算机学院"
        }
      ]
    };
  },
  created: function() {
    this.loading = true;
    this.axios
      .get("http://localhost:8099/admin/teacher", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        let resCode = res.data.code;
        if (resCode === 200) {
          console.log("chaxun", res.data);
          this.CourseData = res.data.object;
          this.loading = false;
        }
      })
      .catch(error => {
        console.log(error.response);
        this.$notify({
          title: "查询失败",
          message: "登陆失效，请重新登陆",
          type: "error"
        });
        if (error.response.data.code === 40401) {
          console.log("用户名不存在");
        } else {
          console.log("密码错误");
        }
      });
  },
  methods: {
    SearchTeacher() {
      this.$message("这里查询数据库！！！");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="stylus">
.course {
  width: 700px;
  margin: 0 auto;
}

.searchForm {
  margin: 0 auto;
  width: 40vw;
  padding-top: 5vh;
  padding-bottom: 2vh;
}

.search {
  width: 100%;
  margin: 0 auto;
}

.grid {
  margin: 0 auto;
}
</style>
