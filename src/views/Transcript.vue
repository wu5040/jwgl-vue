<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <el-table :data="GradeData" v-loading="loading" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
        <!-- <el-table-column prop="index" label="序号" width="100"></el-table-column> -->
        <el-table-column prop="kh" label="课程号"></el-table-column>
        <el-table-column prop="km" label="课程名" ></el-table-column>
        <!-- <el-table-column prop="xf" label="学分" ></el-table-column> -->
        <el-table-column prop='gh' label='教师号' ></el-table-column>
        <el-table-column prop="name" label="教师名"></el-table-column>
        <el-table-column prop="zpcj" label="成绩" ></el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button @click="drawBar()">展示</el-button>
    <br/>
    <div v-show="isShow" id="scoreBar" :style="{width: '630px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: "transcript",
  data() {
    return {
      isShow: false,
      loading:false,
      GradeData: [
        {
          index: "1",
          courseId: "08306049",
          courseName: "Web开发技术",
          credit: "4",
          teacherName: "魏晓",
          grade: "100"
        },
        {
          index: "2",
          courseId: "08305001",
          courseName: "离散数学",
          credit: "4",
          teacherName: "武频",
          grade: "94"
        },
        {
          index: "3",
          courseId: "08305011",
          courseName: "操作系统(1)",
          credit: "5",
          teacherName: "张建",
          grade: "89"
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
  mounted() {
    
    //this.drawBar();
  },
  created: function() {
    this.loading=true
    this.axios
      .get("http://localhost:8099/student/elective/grades", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        let resCode = res.data.code;
        if (resCode === 200) {
          console.log("200", res.data.object);
          this.GradeData = res.data.object;
          this.loading=false
        }
      })
      .catch(error => {
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
        }
      });
    console.log("查看下");
    // this.drawBar();
  },
  methods: {
    test() {
      console.log(this.searchList);
      // this.$message("这里需要在数据库查询数据！！！");
    },
    drawBar() {
      this.isShow = true;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("scoreBar"));
      let km_data = new Array();
      let zpcj_data = new Array();
      console.log("GradeData", this.GradeData);
      for (var x in this.GradeData) {
        console.log("km", this.GradeData[x]["km"]);
        km_data.push(this.GradeData[x]["km"]);
        zpcj_data.push(this.GradeData[x]["zpcj"]);
      }
      console.log("km_data", km_data);
      // 绘制图表
      myChart.setOption({
        title: { text: "成绩分布图" },
        tooltip: { trigger: "item" },
        xAxis: {
          // data: ["Web开发技术", "离散数学", "操作系统(1)"]
          data: km_data
        },
        yAxis: {},
        series: [
          {
            name: "成绩",
            type: "bar",
            // data: [100, 94, 89]
            data: zpcj_data
          }
        ]
      });
    }
  }
};
</script>

<style lang="stylus">
.course {
  width: 800px;
  margin: 0 auto;
}

.search {
  width: 630px;
  margin: 0 auto;
}

.grid {
  width: 630px;
  margin: 0 auto;
}

#scoreBar {
  margin: 0 auto;
}
</style>
