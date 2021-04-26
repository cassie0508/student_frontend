<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>学业情况</el-breadcrumb-item>
      <el-breadcrumb-item>学业分析</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-button @click="goback"> 返回上一级 </el-button>
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
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        coursename: window.sessionStorage.getItem('coursename'),
        type: window.sessionStorage.getItem('type'),
        pagenum: 1,
        pagesize: 2,
      },
      studentList: [],
    }
  },

  created() {
    this.getStudentList()
  },

  methods: {
    async getStudentList() {
        const { data: res } = await this.$axios.get('study/classification/student', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取学生列表失败！')
      }
      this.studentList = res.students
    },
    goback() {
      this.$router.push('/classification')
    },
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