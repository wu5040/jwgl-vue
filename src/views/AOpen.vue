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
            <el-table @row-click="handleEdit" :data="CourseData" v-loading="loading" style="margin: 0 auto; width: 100%; text-align:center;" fit :stripe="true" :border="false">
                <el-table-column prop="kh" label="课程号"></el-table-column>
                <el-table-column prop="km" label="课程名"></el-table-column>
                <el-table-column prop="xf" label="学分"></el-table-column>
                <el-table-column prop="gh" label="教师号"></el-table-column>
                <el-table-column prop="name" label="教师名"></el-table-column>
                <el-table-column prop="max" label="额定人数"></el-table-column>
                <el-table-column prop="sksj" label="上课时间"></el-table-column>
                <el-table-column prop="xq" label="学期"></el-table-column>
            </el-table>
            <el-dialog title="修改开课信息" :visible.sync="dialogTableVisible">
                <el-form :model="dialogueform">
                    <el-form-item label="课程号" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.kh" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.km" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学分" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.xf" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教师号" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.gh" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教师名" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学期" :label-width="formLabelWidth">
                        <el-input :disabled=true v-model="dialogueform.xq" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上课时间">
                        <el-input v-model="dialogueform.sksj" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="额定人数" :label-width="formLabelWidth">
                        <el-input v-model="dialogueform.max" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "aopen",
  inject:['reload'],
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      dialogueform: {
        kh: "",
        km: "",
        gh: "",
        name: "",
        xf: "",
        xq: "",
        sksj: "",
        max: ""
      },
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
      .get("http://localhost:8099/admin/open", {
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
    submit() {
      let formData = new FormData();
      formData.append("kh", this.dialogueform.kh);
      // formData.append("km", this.dialogueform.km);
      formData.append("gh", this.dialogueform.gh);
      // formData.append("tname", this.dialogueform.tname);
      formData.append("sksj", this.dialogueform.sksj);
      // formData.append("class_location", this.dialogueform.class_location);
      formData.append("max", this.dialogueform.max);
      formData.append("xq", this.dialogueform.xq);

      this.axios
        .put("http://localhost:8099/admin/open", formData, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          console.log(res);
          if (res.data.error === 1) {
            this.$notify({
              title: "修改失败",
              message: res.data.message,
              type: "error"
            });
          } else {
            this.$notify({
              title: "修改成功",
              message: res.data.message,
              type: "success"
            });
            // this.reload()
            this.dialogTableVisible = false;
            this.reload()
          }
        })
        .catch(error => {
          // console.log("请求失败:" + err.status + "," + err.statusText);
          this.$notify({
            title: "开课失败",
            message: error,
            type: "error"
          });
        });
    },
    handleEdit(row, event, column) {
      this.dialogTableVisible = true;
      this.dialogueform = row;
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
