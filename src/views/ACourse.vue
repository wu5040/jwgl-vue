<template>
  <div>
    <!-- <div>Admin_Course</div> -->
    <div>
      </br>
      <el-row>
        <el-col :span="24">
          <el-button @click="handleSearch" type="primary">查询课程</el-button>
          <el-button @click="handleAdd" type="info">新增课程</el-button>
        </el-col>
      </el-row>
    </div>
    </br>
    <el-table v-show="isSearch" :data="tableAllCourseData" v-loading="loading" stripe fit style="margin: 0 auto; width: 95%; text-align:center;">
      <el-table-column prop="kh" label="课程号" width="150">
      </el-table-column>
      <el-table-column prop="km" label="课程名" width="150">
      </el-table-column>
      <el-table-column prop="xf" label="学分" width="150">
      </el-table-column>
      <el-table-column prop="xs" label="学时" width="150">
      </el-table-column>
      <el-table-column prop="cjRatio" label="成绩比例" width="150">
      </el-table-column>
      <el-table-column prop="mc" label="院系" width="200">
      </el-table-column>
      <!-- <el-table-column prop="credit" label="学分" width="150">
      </el-table-column> -->
      <!-- <el-table-column prop="sksj" label="上课时间" width="180">
      </el-table-column> -->
      <!-- <el-table-column prop="gh" label="教师号" width="150">
      </el-table-column>
      <el-table-column prop="tname" label="教师名" width="150">
      </el-table-column> -->
      <!-- <el-table-column prop="place" label="上课教室" width="150">
      </el-table-column> -->
      <!-- <el-table-column prop="faculty" label="开课学院院系号" width="150">
      </el-table-column> -->
      <!-- <el-table-column prop="Cur" label="当前选课人数" width="150">
      </el-table-column>
      <el-table-column prop="max" label="额定人数" width="150">
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">开课</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">不开</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" label-width="100px" v-show="isAdd" style="margin: 0 auto; width: 50%">
      <el-form-item label="课程号">
        <el-input v-model="form.kh"></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="form.km"></el-input>
      </el-form-item>
      <!-- <el-form-item label="教师号">
        <el-input v-model="form.gh"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名">
        <el-input v-model="form.tname"></el-input> -->
      </el-form-item>
      <!-- <el-form-item label="上课教室">
        <el-input v-model="form.place"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="额定人数">
        <el-input v-model="form.max"></el-input>
      </el-form-item> -->
      <el-form-item label="学分">
        <el-input v-model="form.xf"></el-input>
      </el-form-item>
      <el-form-item label="学时">
        <el-input v-model="form.xs"></el-input>
      </el-form-item>
      <el-form-item label="成绩比例">
        <el-input v-model="form.cjRatio"></el-input>
      </el-form-item>
      <el-form-item label="院系号">
        <el-input v-model="form.yxh"></el-input>
      </el-form-item>
      <!-- <el-form-item label="上课时间">
        <el-input v-model="dynamicValidateForm.sksj"></el-input>
      </el-form-item>
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'上课时间' + (index+1)" :key="domain.key" :prop="'domains.' + index + '.value'">
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item> -->
      <!-- <el-form-item> -->
      <!-- <el-button @click="addDomain">新增上课时间</el-button> -->
      <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
      <!-- </el-form-item> -->
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">确认提交</el-button>
    </el-form>
    <el-dialog title="开课" :visible.sync="dialogTableVisible">
      <el-form :model="dialogueform">
        <el-form-item label="课程号" :label-width="formLabelWidth">
          <el-input :disabled=true v-model="dialogueform.kh" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogueform.km" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="学分" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogueform.credit" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="教师号" :label-width="formLabelWidth">
          <el-input v-model="dialogueform.gh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期" :label-width="formLabelWidth">
          <div>
            <el-select v-model="dialogueform.xq" placeholder="请选择">
              <el-option v-for="item in chooseForm" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- <el-form-item label="教师姓名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogueform.tname" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-input v-model="dialogueform.sksj" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上课地点" :label-width="formLabelWidth">
          <el-input v-model="dialogueform.class_location" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="最大选课人数" :label-width="formLabelWidth">
          <el-input v-model="dialogueform.max" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "acourse",
  inject: ["reload"],
  data() {
    return {
      loading: false,
      isSearch: false,
      isAdd: false,
      dialogTableVisible: false,
      Cur: "",
      dialogueform: {
        kh: "",
        // km: "",
        // credit: "",
        gh: "",
        xf: "",
        xq: "",
        // tname: "",
        sksj: "",
        // class_location: "",
        max: ""
      },
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        sksj: ""
      },
      form: {
        kh: "",
        km: "",
        // gh: "",
        // tname: "",
        // place: "",
        xf: "",
        xs: "",
        cjRatio: "",
        yxh: ""
        // max: ""
      },
      tableAllCourseData: [
        {
          kh: "01001234",
          km: "编译原理",
          sksj: "周三1-2",
          gh: "1000",
          tname: "魏晓",
          place: "计406",
          credit: "4",
          faculty: "计算机工程与科学学院",
          Cur: 0,
          max: 60
        }
      ],
      chooseForm: [
        {
          value: "2018-2019学年 秋季学期",
          label: "2018-2019学年 秋季学期",
          disabled: true
        },
        {
          value: "2018-2019学年 冬季学期",
          label: "2018-2019学年 冬季学期",
          disabled: true
        },
        {
          value: "2018-2019学年 春季学期",
          label: "2018-2019学年 春季学期"
        },
        {
          value: "2018-2019学年 夏季学期",
          label: "2018-2019学年 夏季学期",
          disabled: true
        }
      ]
    };
  },
  methods: {
    handleSearch: function() {
      this.loading = true;
      this.axios
        .get("http://localhost:8099/admin/course", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          console.log("aijfadfj", res);
          var list = res.data.object;
          console.log(this.tableAllCourseData);
          this.tableAllCourseData.splice(0, this.tableAllCourseData.length);
          console.log(this.tableAllCourseData);
          this.tableAllCourseData = res.data.object;
          // for (var index in list) {
          // console.log('1111',list[index]);
          // this.tableAllCourseData.push({
          //   //   student_id: list[index].pk,
          //   //   student_name: list[index].fields.student_name,
          //   //   sex: list[index].fields.student_sex,
          //   //   age: list[index].fields.student_age,
          //   //   faculty: list[index].fields.yxh,
          //   kh: list[index]['kh'],
          //   km: list[index]['km'],
          //   xf: list[index]['xf'],
          //   // sksj: list[index]['sksj'],
          //   // gh: list[index]['gh'],
          //   // tname: list[index]['tname'],
          //   // place: list[index].fields.class_location,
          //   // credit: list[index].fields.credit,
          //   // faculty: list[index].fields.yxh,
          //   // Cur: list[index].fields.Cur,
          //   // max: list[index].fields.max
          // });
          // }
          this.loading = false;
          this.$notify({
            title: "成功",
            message: "查询成功",
            type: "success"
          });
          // console.log(list)
        })
        .catch(error => {
          this.$notify({
            title: "查询失败",
            message: "登陆失效，请重新登陆",
            type: "error"
          });
          console.log("请求失败:" + error.status + "," + error.statusText);
        });
      this.isSearch = true;
      this.isAdd = false;
    },
    handleAdd: function() {
      this.isAdd = true;
      this.isSearch = false;
    },
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      console.log(this.dynamicValidateForm.sksj);
      var classtime = this.dynamicValidateForm.sksj;
      for (var index in this.dynamicValidateForm.domains) {
        classtime =
          classtime + " " + this.dynamicValidateForm.domains[index].value;
      }
      console.log(classtime);
      console.log("submit");

      let formData = new FormData();
      formData.append("kh", this.form.kh);
      formData.append("km", this.form.km);
      formData.append("gh", this.form.gh);
      formData.append("tname", this.form.tname);
      // formData.append("class_location", this.form.place);
      formData.append("max", this.form.max);
      // formData.append("credit", this.form.credit);
      formData.append("sksj", classtime);

      this.axios
        .post("http://localhost:8099/admin/open", formData)
        .then(resp => {
          console.log(resp);
          if (resp.data.error === 1) {
            this.$notify({
              title: "失败",
              message: "新增课程信息失败",
              type: "error"
            });
          } else {
            this.$notify({
              title: "成功",
              message: "新增课程信息成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
          this.$notify({
            title: "失败",
            message: "新增课程信息失败",
            type: "error"
          });
        });
    },
    resetForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    handleEdit(index, row) {
      this.Cur = index;
      this.dialogTableVisible = true;
      this.dialogueform.kh = this.tableAllCourseData[index].kh;
      this.dialogueform.km = this.tableAllCourseData[index].km;
      this.dialogueform.credit = this.tableAllCourseData[index].credit;
      this.dialogueform.gh = this.tableAllCourseData[index].gh;
      this.dialogueform.tname = this.tableAllCourseData[index].tname;
      this.dialogueform.sksj = this.tableAllCourseData[index].sksj;
      this.dialogueform.class_location = this.tableAllCourseData[index].place;
      this.dialogueform.max = this.tableAllCourseData[index].max;
    },
    handleDelete(index, row) {
      // alert('delete')
      this.Cur = index;
      let formData = new FormData();
      formData.append("kh", this.tableAllCourseData[index].kh);
      formData.append("gh", this.tableAllCourseData[index].gh);
      this.axios
        .post("http://localhost:8000/delete_courseinfo", formData)
        .then(resp => {
          console.log(resp);
          if (resp.data.error === 1) {
            this.$notify({
              title: "失败",
              message: resp.data.msg,
              type: "error"
            });
          } else {
            this.$notify({
              title: "成功",
              message: "删除课程信息成功",
              type: "success"
            });
            this.tableAllCourseData[this.Cur].sksj = "不开";
            this.tableAllCourseData[this.Cur].Cur = 0;
            this.tableAllCourseData[this.Cur].max = 0;
          }
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
          this.$notify({
            title: "失败",
            message: "删除课程信息失败",
            type: "error"
          });
        });
    },
    submit() {
      let formData = new FormData();
      // this.dialogueform.kh = this.tableAllCourseData[index].kh
      // this.dialogueform.km = this.tableAllCourseData[index].km
      // this.dialogueform.credit = this.tableAllCourseData[index].credit
      // this.dialogueform.gh = this.tableAllCourseData[index].gh
      // this.dialogueform.tname = this.tableAllCourseData[index].tname
      // this.dialogueform.sksj = this.tableAllCourseData[index].sksj
      // this.dialogueform.class_location = this.tableAllCourseData[index].place
      // this.dialogueform.max = this.tableAllCourseData[index].max
      formData.append("kh", this.dialogueform.kh);
      // formData.append("km", this.dialogueform.km);
      formData.append("xf", this.dialogueform.xf);
      formData.append("gh", this.dialogueform.gh);
      // formData.append("tname", this.dialogueform.tname);
      formData.append("sksj", this.dialogueform.sksj);
      // formData.append("class_location", this.dialogueform.class_location);
      formData.append("max", this.dialogueform.max);
      formData.append("xq", this.dialogueform.xq);

      this.axios
        .post("http://localhost:8099/admin/open", formData, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          console.log(res);
          if (res.data.error === 1) {
            this.$notify({
              title: "开课失败",
              message: res.data.message,
              type: "error"
            });
          } else {
            this.$notify({
              title: "开课成功",
              message: res.data.message,
              type: "success"
            });
            // this.reload()
            this.dialogTableVisible = false;
            this.dialogueform.kh = "";
            this.dialogueform.xf = "";
            this.dialogueform.gh = "";
            this.dialogueform.sksj = "";
            this.dialogueform.xq = "";
            this.dialogueform.max = "";
            // this.tableAllCourseData[
            //   this.Cur
            // ].sksj = this.dialogueform.sksj;
            // this.tableAllCourseData[
            //   this.Cur
            // ].place = this.dialogueform.class_location;
            // this.tableAllCourseData[this.Cur].max = this.dialogueform.max;
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
    }
  }
};
</script>

<style scoped>
</style>
