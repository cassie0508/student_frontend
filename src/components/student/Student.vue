<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入学号"
            v-model="queryInfo.stuID"
            clearable
            @clear="getStudentList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStudentList"
            >
            </el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 学生列表区域 -->
      <el-table
        :data="studentList"
        border
        ref="multipleTable"
        tooltip-effect="light"
        size="mini"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          v-for="(key, index) in Object.keys(studentList[0])"
          :key="Math.random(index)"
          :label="key"
          :prop="key"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="70px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="查看报告" placement="top">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="small"
                @click="viewReport(scope.row.stuId)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-table :data="studentList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          :label="studentList.col1"
          prop="stuId"
        ></el-table-column>
        <el-table-column :label="col2" prop="score"></el-table-column>
        <el-table-column :label="col3" prop="page"></el-table-column>
        <el-table-column :label="col4" prop="attendance"></el-table-column>
        <el-table-column :label="col6" prop="barrage"></el-table-column>
        <el-table-column :label="col7" prop="submission"></el-table-column>
        <el-table-column :label="col8" prop="announcement"></el-table-column> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        // 课名
        coursename: window.sessionStorage.getItem('coursename'),
        // 学生的学号
        stuID: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      // 学生列表
      studentList: [],
    }
  },

  created() {
    this.getStudentList()
  },

  methods: {
    async getStudentList() {
      const { data: res } = await this.$axios.get('student', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error('获取学生列表失败！')
      }
      this.studentList = res.students
      this.total = res.total
      console.log(res)
    },
    vueReport(stu) {},
  },
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
  }

.el-breadcrumb {
  margin-bottom: 15px;
}
</style>

