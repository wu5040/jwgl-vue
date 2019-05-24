<template>
  <div>
    <div v-show="isAvailable" class="notAvailable">
      <i class="el-icon-warning" style="font-size: 100px; font-weight: bold; margin: 0 auto"></i>
      <h1 style="margin: 0 auto">选课时间未到！</h1>
    </div>
    <div v-show="!isAvailable">
      <!-- <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">课程号 </span>
        <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchCourse()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div> -->
      <!--br/>
      < <div style="width: 700px; margin: auto auto">
        <el-form :inline='true' ref="choiceList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="choiceList.kh" placeholder="请输入课程号" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="教师号" style="float: left">
            <el-input v-model="choiceList.gh" placeholder="请输入教师号" style="width: 200px"></el-input>
          </el-form-item>
          <el-button type="primary" @click="choiceClass()">选课</el-button>
        </el-form>
      </div> -->
      <br/>
      <div style="width: 700px; margin: auto auto">
        <el-form :inline='true' ref="searchList" label-width="150px">
          <el-form-item label="课程号/课程名">
            <el-input v-model="searchList.courseName" placeholder="请输入课程号或者课程名" style="width: 400px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="课程名" style="float: left">
            <el-input v-model="searchList.courseName" placeholder="请输入课程名" style="width: 200px"></el-input>
          </el-form-item> -->
          <el-button type="primary" @click="SearchCourse()">查询</el-button>
        </el-form>
        <br/>
      </div>
      <el-table :data="courseData" v-loading="loading" style="width:800px; margin: auto auto;">
        <el-table-column prop="kh" label="课程号" width="100"></el-table-column>
        <el-table-column prop="km" label="课程名" width="130"></el-table-column>
        <!-- <el-table-column prop="credit" label="学分" width="80"></el-table-column> -->
        <el-table-column prop="gh" label="教师号" width="100"></el-table-column>
        <el-table-column prop="tname" label="教师名" width="100"></el-table-column>
        <el-table-column prop="sksj" label="上课时间" width="100"></el-table-column>
        <el-table-column prop="Cur" label="已选课人数" width="100"></el-table-column>
        <el-table-column prop="max" label="额定人数" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <el-button @click="SubmitChoice(scope.row)" type="text" size="medium">选课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "fastinput",
  inject: ["reload"],
  data() {
    return {
      isAvailable: false,
      isConflict: false,
      SearchCourseID: "",
      loading: false,
      Course: "",
      CourseList: [],
      courseData: [
        // {
        //   courseId: "08306049",
        //   courseName: "Web开发技术",
        //   credit: "4",
        //   teacherId: "1000",
        //   teacherName: "魏晓"
        // }
      ],
      searchList: [
        {
          courseId: "",
          courseName: ""
        }
      ],
      choiceList: [
        {
          kh: "",
          gh: ""
        }
      ]
    };
  },
  created: function() {
    this.axios
      .get("http://localhost:8099/student/elective", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        let resCode = res.data.code;
        if (resCode === 200) {
          console.log("chaxun", res.data.jsonObject.Electives);
          this.Course = res.data.jsonObject.Electives;
          for (var x in this.Course) {
            var str0 = this.Course[x]["sksj"];
            var str1 = str0.substring(0, 1);
            var str2 = str0.substring(1);
            var list = str2.split("-");
            if (str1 == "一") {
              str1 = 0;
            } else if (str1 == "二") {
              str1 = 1;
            } else if (str1 == "三") {
              str1 = 2;
            } else if (str1 == "四") {
              str1 = 3;
            } else {
              str1 = 4;
            }
            for (
              var index = Number(list[0]);
              index <= Number(list[1]);
              index++
            ) {
              var num = Number(str1 * 13 + index);
              this.CourseList.push(num);
            }
            console.log("courselist", this.CourseList);
          }
        }
      })
      .catch(error => {
        console.log(error.response);
        // this.$notify({
        //   title: "查询失败",
        //   message: "登陆失效，请重新登陆",
        //   type: "error"
        // });
      });
  },
  methods: {
    judge(sksj) {
      var str1 = sksj.substring(0, 1);
      var str2 = sksj.substring(1);
      var list = str2.split("-");
      if (str1 == "一") {
        str1 = 0;
      } else if (str1 == "二") {
        str1 = 1;
      } else if (str1 == "三") {
        str1 = 2;
      } else if (str1 == "四") {
        str1 = 3;
      } else {
        str1 = 4;
      }
      for (var index = Number(list[0]); index <= Number(list[1]); index++) {
        var num = Number(str1 * 13 + index);
        console.log("judge",num)
        for(var x in this.CourseList){
          if(num == this.CourseList[x]){
            this.isConflict=true
          }
        }
      }
    },
    SearchCourse() {
      // this.$message("这里查询数据库！！！");
      this.loading = true;
      console.log("courseName", this.searchList.courseName);
      this.axios
        .get("http://localhost:8099/student/search", {
          params: { inputStr: this.searchList.courseName }
        })
        .then(res => {
          console.log("res", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            this.courseData = res.data.object;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error.response);
          this.loading = false;
          this.$notify({
            title: "查询失败",
            message: error.response.data.message,
            type: "error"
          });
          if (error.response.data.code === 40401) {
            console.log("用户名不存在");
          } else {
            console.log("密码错误");
          }
        });
    },
    SubmitChoice(row) {
      // this.$message("这里需要在数据库插入数据！！！");
      console.log("row", row);
      let formdata = new FormData();
      formdata.append("kh", row.kh);
      formdata.append("gh", row.gh);
      formdata.append("xq", row.xq);
      console.log("formdata", formdata);
      this.judge(row.sksj);
      if (this.isConflict) {
        this.$notify({
          title: "选课失败",
          message: "该时间段已选择课程",
          type: "error"
        });
        this.isConflict=false
      } else {
        this.loading = true;
        this.axios
          .post("http://localhost:8099/student/elective", formdata, {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            console.log("data", res.data);
            let resCode = res.data.code;
            if (resCode === 200) {
              console.log("200", res.data.object);
              // this.$message("选课成功");
              this.loading = false;
              this.$notify({
                title: "选课成功",
                message: res.data.message,
                type: "success"
              });
              this.reload();
            }
            if (res.data.code == 40002) {
              // this.$message("该课程已选！！");
              console.log("该课程已选");
              this.loading = false;
              this.$notify({
                title: "选课失败",
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error.response);
            this.$notify({
              title: "选课失败",
              message: error.response.data.message,
              type: "error"
            });
            this.loading = false;
            if (error.response.data.code === 40002) {
              console.log("该课程已选");
            } else {
              console.log("密码错误");
            }
          });
      }
    },
    choiceClass() {
      let data = new FormData();
      this.loading = true;
      data.append("kh", this.choiceList.kh);
      data.append("gh", this.choiceList.gh);
      data.append("xq", "2018-2019学年 春季学期");
      this.axios
        .post("http://localhost:8099/student/elective", data, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          console.log("data", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            // this.$message("选课成功");
            this.loading = false;
            this.$notify({
              title: "选课成功",
              message: res.data.message,
              type: "success"
            });
            this.reload();
          }
          if (res.data.code == 40002) {
            // this.$message("该课程已选！！");
            console.log("该课程已选");
            this.loading = false;
            this.$notify({
              title: "选课失败",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error.response);
          this.$notify({
            title: "选课失败",
            message: error.response.data.message,
            type: "error"
          });
          this.loading = false;
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
