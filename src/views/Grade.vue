<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <!--div class="search">
        <el-form ref="searchList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="SearchCourseID" placeholder="请输入课程号"></el-input>
          </el-form-item>
          <el-button round @click="SearchCourse()">搜索课程</el-button>
        </el-form> >
      </div-->
      <el-table @row-click="handleEdit" v-loading="loading" :data="CourseData" style="width: 100%" :stripe="true" type="index">
        <el-table-column label="学号" prop="xh"></el-table-column>
        <el-table-column label="平时成绩" prop="pscj"></el-table-column>
        <el-table-column label="考试成绩" prop="kscj"></el-table-column>
        <el-table-column label="总评成绩" prop="zpcj"></el-table-column>
        <el-table-column align="right">
          <!-- <template slot="header" :slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template> -->
          <!-- <template> -->
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <!-- </template> -->
        </el-table-column>>
      </el-table>
      <br/>
      <el-button @click="drawBar()">成绩分布直方图</el-button>
      <br/>
      <div v-show="iss" id="scoreBar" :style="{width: '630px', height: '300px'}"></div>
      </br>
      <el-dialog title="修改成绩" :visible.sync="dialogForm">
        <el-form :model="cj">
          <el-form-item label="平时成绩">
            <el-input v-model="cj.pscj" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="考试成绩">
            <el-input v-model="cj.kscj" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">`
          <el-button @click="dialogForm = false">取消</el-button>
          <el-button type="primary" @click="handleUpdate()">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "grade",
  inject: ["reload"],
  data() {
    return {
      loading: false,
      iss: false,
      currentStudent: { xh: "", kh: "", xq: "" },
      dialogForm: false,
      cj: { pscj: "", kscj: "" },
      courseData: {},
      SearchCourseID: "",
      search: "",
      searchList: [
        {
          courseId: ""
        }
      ],
      CourseData: [
        {
          StudentId: "s1",
          grade: "89"
        },
        {
          StudentId: "s2",
          grade: "75"
        },
        {
          StudentId: "s3",
          grade: "84"
        },
        {
          StudentId: "s4",
          grade: "93"
        },
        {
          StudentId: "s5",
          grade: "88"
        }
      ]
    };
  },
  created: function() {
    if (this.$route.query.kh) {
      this.courseData = this.$route.query;
      console.log("courseData", this.courseData);
      this.SearchCourseID = this.courseData.kh;
      this.loading = true;
      this.axios
        .get("http://localhost:8099/teacher/open/detail", {
          params: {
            kh: this.courseData.kh,
            xq: this.courseData.xq
          },
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.loading = false;
          console.log("res", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            this.CourseData = res.data.object;
          }
        })
        .catch(error => {
          this.loading = false;
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
    } else {
      console.log("need_serch");
    }
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("scoreBar"));
      let Xlabel = ["100-90", "89-70", "69-60", "59-0"];
      let Ylabel = [0, 0, 0, 0];
      for (var x in this.CourseData) {
        console.log("km", this.CourseData[x]["zpcj"]);
        let zpcj = this.CourseData[x]["zpcj"];
        if (zpcj >= 90 && zpcj < 100) {
          Ylabel[0] = Ylabel[0] + 1;
        } else if (zpcj >= 70 && zpcj < 90) {
          Ylabel[1] = Ylabel[1] + 1;
        } else if (zpcj >= 60 && zpcj < 70) {
          Ylabel[2] = Ylabel[2] + 1;
        } else if (zpcj >= 0 && zpcj < 60) {
          Ylabel[3] = Ylabel[3] + 1;
        }
        console.log("Y", Ylabel);
        console.log("x", Xlabel);
        // zpcj_data.push(this.GradeData[x]["zpcj"]);
      }
      // console.log("km_data", km_data);
      // 绘制图表
      myChart.setOption({
        title: { text: "成绩分布图" },
        tooltip: { trigger: "item" },
        xAxis: {
          // data: ["Web开发技术", "离散数学", "操作系统(1)"]
          data: Xlabel
        },
        yAxis: {},
        series: [
          {
            name: "成绩",
            type: "bar",
            // data: [100, 94, 89]
            data: Ylabel,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      });
      console.log("before", this.iss);
      if (this.iss == true) {
        this.iss = false;
      } else {
        this.iss = true;
      }
      console.log("after", this.iss);
      this.reload;
    },
    SearchCourse() {
      this.loading = true;
      this.axios
        .get("http://localhost:8099/teacher/open/detail", {
          params: {
            kh: this.SearchCourseID,
            xq: "2018-2019学年 春季学期"
          },
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.loading = false;
          console.log("res", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            this.CourseData = res.data.object;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error.response);
          this.$notify({
            title: "查询失败",
            message: error.response.data.message,
            type: "error"
          });
          if (error.response.data.code === 40401) {
            console.log("用户名不存在");
          } else {
            console.log("密码错误");
            // this.$message("未搜索到您有开设这门课程，请确认输入是否正确！")
          }
        });
    },
    handleEdit(row, event, column) {
      console.log(row);
      this.currentStudent.kh = this.SearchCourseID;
      this.currentStudent.xh = row.xh;
      this.currentStudent.xq = "2018-2019学年 春季学期";
      this.cj.pscj = row.pscj;
      this.cj.kscj = row.kscj;
      this.dialogForm = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleUpdate() {
      let formdata = new FormData();
      console.log("111", formdata);
      formdata.append("xh", this.currentStudent.xh);
      formdata.append("kh", this.currentStudent.kh);
      formdata.append("xq", this.currentStudent.xq);
      formdata.append("pscj", this.cj.pscj);
      formdata.append("kscj", this.cj.kscj);
      this.loading = true;
      this.axios
        .post("http://localhost:8099/teacher/open/detail", formdata, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.loading = false;
          console.log("res", res.data);
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            this.$notify({
              title: "录入成功",
              message: res.data.message,
              type: "success"
            });
            // this.CourseData = res.data.object;
            this.dialogForm = false;
            this.cj.pscj = "";
            this.cj.kscj = "";
            this.reload();
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error.response);
          this.$notify({
            title: "录入失败",
            message: error.response.data.message,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="stylus">
.course {
  width: 700px;
  margin: 0 auto;
}

.search {
  width: 100%;
  margin: 0 auto;
}

.grid {
  margin: 0 auto;
}
</style>
