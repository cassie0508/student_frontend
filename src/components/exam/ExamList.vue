<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>试卷统计</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="第几次"
            v-model="queryInfo.num"
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

      <el-row :gutter="20">
        <el-col :span="6"
          ><el-input placeholder="学生学号" v-model="queryInfo.stuID"></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="学生姓名"
            v-model="queryInfo.stuName"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="得分少于"
            v-model="queryInfo.point"
          ></el-input
        ></el-col>
        <el-button
          class="button_form"
          icon="el-icon-search"
          @click="getStudentList"
        >
        </el-button>
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
          v-for="(key, index) in Object.keys(studentList[0])"
          :key="Math.random(index)"
          :label="key"
          :prop="key"
          align="center"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
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
        // 第几次 默认为第一次
        num: 1,
        // 学号
        stuID: '',
        stuName: '',
        point: '',
        totalTime: '',
        endTime: '',
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
      const { data: res } = await this.$axios.get('/statistics/exam/list', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error('获取学生列表失败！')
      }
      this.studentList = res.students
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-row {
  margin-bottom: 10px;
}

.button_form {
    margin-left: 260px;
}
</style>