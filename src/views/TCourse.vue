<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <el-table :data="GradeData" v-loading="loading" class="grid" type="index" @row-click="goto" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
        <el-table-column prop="kh" label="课程号"></el-table-column>
        <el-table-column prop="km" label="课程名"></el-table-column>
        <el-table-column prop="sksj" label="上课时间"></el-table-column>
        <el-table-column prop="xq" label="学期"></el-table-column>
      </el-table>
    </div>
    <!-- <br/> -->
    <!-- <div id="scoreBar" :style="{width: '400px', height: '300px'}"></div-->
  </div>
</template>

<script>
export default {
  name: "tcourse",
  data() {
    return {
      loading: false,
      GradeData: [
        {
          index: "1",
          courseId: "08306049",
          courseName: "Web开发技术",
          credit: "4"
        },
        {
          index: "2",
          courseId: "08305001",
          courseName: "离散数学",
          credit: "4"
        },
        {
          index: "3",
          courseId: "08305011",
          courseName: "操作系统(1)",
          credit: "5"
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
    // this.drawBar();
  },
  created: function() {
    this.test();
  },
  methods: {
    goto(row, event, column) {
      // this.$message("success!");
      console.log("message", row.kh);
      this.$router.push({
        path: "/grade",
        query: {
          kh: row.kh,
          xq: row.xq
        }
      });
      console.log("???");
    },
    test() {
      console.log(this.searchList);
      this.loading = true;
      this.axios
        .get("http://localhost:8099/teacher/open", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.loading = false;
          let resCode = res.data.code;
          if (resCode === 200) {
            console.log("教师开课", res.data);
            this.GradeData = res.data.object;
          }
        })
        .catch(error => {
          console.log(error.response);
          this.loading = false;
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
      // this.$message('这里需要在数据库查询数据！！！')
    },
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("scoreBar"));
      // 绘制图表
      myChart.setOption({
        title: { text: "您当前所开设课程的平均成绩分布图" },
        tooltip: { trigger: "item" },
        xAxis: {
          data: ["Web开发技术", "离散数学", "操作系统(1)"]
        },
        yAxis: {},
        series: [
          {
            name: "成绩",
            type: "bar",
            data: [100, 94, 89]
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
