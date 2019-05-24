<template>
  <div>
    <div v-show="isAvailable" class="notAvailable">
      <i class="el-icon-warning" style="font-size: 100px; font-weight: bold; margin: 0 auto"></i>
      <h1 style="margin: 0 auto">选课时间未到！</h1>
    </div>
    <!--div v-show="!isAvailable">
      <<div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">课程号 </span>
        <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchCourse()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div> -->
    <br/>
    <el-table :data="courseData" v-loading="loading" style="margin: 0 auto; width: 80%; text-align:center;" fit :stripe="true" :border="false">
      <el-table-column prop="kh" label="课程号" ></el-table-column>
      <el-table-column prop="km" label="课程名"></el-table-column>
      <el-table-column prop="xf" label="学分" width="80"></el-table-column>
      <el-table-column prop="gh" label="教师号" ></el-table-column>
      <el-table-column prop="tname" label="教师名" ></el-table-column>
      <el-table-column prop="sksj" label="上课时间" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="DeleteChoice(scope.row)" type="text" size="medium">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
export default {
  name: "fastdelete",
  inject: ["reload"],
  data() {
    return {
      isAvailable: false,
      loading: false,
      SearchCourseID: "",
      courseData: [
        {
          courseId: "08306049",
          courseName: "Web开发技术",
          credit: "4",
          teacherId: "1000",
          teacherName: "魏晓"
        }
      ]
    };
  },
  created: function() {
    this.loading = true;
    this.axios
      .get("http://localhost:8099/student/elective", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        let resCode = res.data.code;
        if (resCode === 200) {
          console.log("tuike", res.data.jsonObject.Electives);
          this.courseData = res.data.jsonObject.Electives;
          this.loading = false;
        }
      })
      .catch(error => {
        console.log(error.response);
        this.loading = false;
       if (error.response.data) {
          if (error.response.data.status == 500) {
            this.$notify({
              title: "查询失败",
              message: "暂无课程，请先选课",
              type: "error"
            });
            this.loading=false
          } else {
            this.$notify({
              title: "查询失败",
              message: error.response.data.message,
              type: "error"
            });
          }
        } else {
          this.$notify({
            title: "查询失败",
            message: "登陆失效，请重新登陆",
            type: "error"
          });
        }
      });
  },
  methods: {
    SearchCourse() {
      // this.$message('这里查询数据库！！！')
      // this.$message("这里查询数据库！！！")
    },
    DeleteChoice(row) {
      // this.$message('这里需要在数据库插入数据！！！')
      let formdata = new FormData();
      this.loading = true;
      formdata.append("kh", row.kh);
      formdata.append("gh", row.gh);
      formdata.append("xq", row.xq);
      console.log("formdata", formdata);
      this.axios
        .delete("http://localhost:8099/student/elective", {
          data: formdata,
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          console.log("data", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("tuike", res.data);
            // this.$message('退课成功')
            this.loading = false;
            this.$notify({
              title: "退课成功",
              message: res.data.message,
              type: "success"
            });
            this.reload();
          }
          if (res.data.code == 40002) {
            // this.$message('该课程已选！！')
            this.loading = false;
            this.$notify({
              title: "退课失败",
              message: res.data.message,
              type: "error"
            });
            console.log("该课程已选");
          }
          if (res.data.code == 400){
            this.$notify({
            title: "退课失败",
            message: "已有成绩，不能退课",
            type: "error"
          });
          }
          this.loading=false
        })
        .catch(error => {
          console.log(error.response);
          this.loading = false;
          this.$notify({
            title: "退课失败",
            message: "已有成绩，不能退课",
            type: "error"
          });
          if (error.response.data.code === 40002) {
            console.log("该课程已选");
          } else {
            console.log("密码错误");
          }
        });
    }
  }
};
</script>

<style lang="stylus">
.notAvailable {
  margin: 0 auto;
  width: 40vw;
  padding-top: 10vh;
}

.searchForm {
  margin: 0 auto;
  width: 40vw;
  padding-top: 5vh;
  padding-bottom: 2vh;
}
</style>
