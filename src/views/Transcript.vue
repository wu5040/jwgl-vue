<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <el-table :data="GradeData" class="grid" max-height="250" :stripe="true" :border="true">
        <el-table-column prop="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="courseId" label="课程号" width="100"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="130"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
        <el-table-column prop="teacherName" label="教师名" width="100"></el-table-column>
        <el-table-column prop="grade" label="成绩" width="100"></el-table-column>
      </el-table>
    </div>
    <br/>
    <div id="scoreBar" :style="{width: '630px', height: '300px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'transcript',
  data () {
    return {
      GradeData: [{
        index: '1',
        courseId: '08306049',
        courseName: 'Web开发技术',
        credit: '4',
        teacherName: '魏晓',
        grade: '100'
      }, {
        index: '2',
        courseId: '08305001',
        courseName: '离散数学',
        credit: '4',
        teacherName: '武频',
        grade: '94'
      }, {
        index: '3',
        courseId: '08305011',
        courseName: '操作系统(1)',
        credit: '5',
        teacherName: '张建',
        grade: '89'
      }],
      searchList: [{
        courseId: '',
        courseName: ''
      }]
    }
  },
  mounted () {
    this.drawBar()
  },
  methods: {
    test () {
      console.log(this.searchList)
      this.$message('这里需要在数据库查询数据！！！')
    },
    drawBar () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('scoreBar'))
      // 绘制图表
      myChart.setOption({
        title: { text: '成绩分布图' },
        tooltip: { trigger: 'item' },
        xAxis: {
          data: ['Web开发技术', '离散数学', '操作系统(1)']
        },
        yAxis: {},
        series: [{
          name: '成绩',
          type: 'bar',
          data: [100, 94, 89]
        }]
      })
    }
  }
}
</script>

<style lang="stylus">
.course
  width 800px
  margin 0 auto

.search
  width 630px
  margin 0 auto

.grid
  width 630px
  margin 0 auto

#scoreBar
  margin 0 auto
</style>
