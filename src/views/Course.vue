<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <!-- <div style="width: 700px; margin: 0 auto">
        <el-form ref="serchList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="searchList.courseId" placeholder="请输入课程号" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="课程名" style="float: left">
            <el-input v-model="searchList.courseName" placeholder="请输入课程名" style="width: 200px"></el-input>
          </el-form-item>
          <el-button @click="test()">查询</el-button>
        </el-form>
      </div> -->
      <el-table :data="CourseData" v-loading="loading" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
        <el-table-column prop="kh" label="课程号"></el-table-column>
        <el-table-column prop="km" label="课程名"></el-table-column>
        <el-table-column prop="xf" label="学分"></el-table-column>
        <el-table-column prop="gh" label="教师号"></el-table-column>
        <el-table-column prop="tname" label="教师名"></el-table-column>
        <el-table-column prop="sksj" label="上课时间"></el-table-column>
        <el-table-column prop="xq" label="学期"></el-table-column>
      </el-table>
      <br>
      <div>
        我的课程表
      </div>
      <br>
      <el-table :data="tableForm" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
        <el-table-column prop="class_time" label="上课时间">
        </el-table-column>
        <el-table-column prop="mon" label="星期一">
        </el-table-column>
        <el-table-column prop="tue" label="星期二">
        </el-table-column>
        <el-table-column prop="wed" label="星期三">
        </el-table-column>
        <el-table-column prop="thu" label="星期四">
        </el-table-column>
        <el-table-column prop="fri" label="星期五">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      loading: false,
      tableForm: [
        {
          index: 1,
          class_time: "8:00-8:45",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 2,
          class_time: "8:45-9:40",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 3,
          class_time: "10:00-10:45",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 4,
          class_time: "10:55-11:40",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 5,
          class_time: "12:10-12:55",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 6,
          class_time: "13:05-13:50",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 7,
          class_time: "14:10-14:55",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 8,
          class_time: "15:05-15:50",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 9,
          class_time: "16:00-16:45",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 10,
          class_time: "16:55-17:40",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 11,
          class_time: "18:00-18:45",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 12,
          class_time: "18:55-19:40",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        },
        {
          index: 13,
          class_time: "19:50-20:35",
          mon: "",
          tue: "",
          wed: "",
          thu: "",
          fri: ""
        }
      ],
      CourseData: [
        {
          CourseId: "08306049",
          CourseName: "Web开发技术",
          credit: "4",
          TeacherId: "1000",
          TeacherName: "魏晓",
          date: "2018-2019 春季"
        },
        {
          CourseId: "08305001",
          CourseName: "离散数学",
          credit: "4",
          TeacherId: "1001",
          TeacherName: "武频",
          date: "2018-2019 秋季"
        },
        {
          CourseId: "08305011",
          CourseName: "操作系统(1)",
          credit: "5",
          TeacherId: "1002",
          TeacherName: "张建",
          date: "2018-2019 秋季"
        },
        {
          CourseId: "08305012",
          CourseName: "操作系统(2)",
          credit: "5",
          TeacherId: "1002",
          TeacherName: "张建",
          date: "2018-2019 冬季"
        },
        {
          CourseId: "08306110",
          CourseName: "职业定位与就业导向",
          credit: "2",
          TeacherId: "1003",
          TeacherName: "张惠然",
          date: "2018-2019 春季"
        }
      ],
      searchList: [
        {
          courseId: "",
          courseName: ""
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
          console.log("chaxun", res.data.jsonObject.Electives);
          this.CourseData = res.data.jsonObject.Electives;
          this.loading = false;
          this.filltable();
        }
      })
      .catch(error => {
        console.log(error.response);
        this.loading=false
        if (error.response.data) {
          if (error.response.data.status == 500) {
            this.$notify({
              title: "查询失败",
              message: "暂无课程，请先选课",
              type: "error"
            });
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
    filltable() {
      for (var x in this.CourseData) {
        var str0 = this.CourseData[x]["sksj"];
        var str1 = str0.substring(0, 1);
        var str2 = str0.substring(1);
        var list = str2.split("-");
        console.log(str0, str1, str2, list[0], list[1]);
        if (str1 == "一") {
          str1 = "mon";
        } else if (str1 == "二") {
          str1 = "tue";
        } else if (str1 == "三") {
          str1 = "wed";
        } else if (str1 == "四") {
          str1 = "thu";
        } else {
          str1 = "fri";
        }
        // this.tableForm[list[0]-1][str1]=this.CourseData[x]['km']
        for (var index = Number(list[0]); index <= Number(list[1]); index++) {
          this.tableForm[index - 1][str1] = this.CourseData[x]["km"];
        }
      }
    },
    test() {
      console.log("12345678", this.searchList);
      console.log("token", localStorage.getItem("token"));
      this.axios
        .get("http://localhost:8099/student/elective", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("200", res.data.object);
            this.CourseData = res.data.object;
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
      // this.$message("这里需要在数据库查询数据！！！");
    }
  }
};
</script>

<style lang="stylus">
.course {
  width: 700px;
  margin: 0 auto;
}
</style>
