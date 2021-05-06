<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
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
            @clear="getScoreList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getScoreList"
            >
            </el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 过滤器 -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><el-input
            placeholder="答题得分低于"
            v-model="filterInfo.point"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="观看页数少于"
            v-model="filterInfo.page"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="缺勤次数多于"
            v-model="filterInfo.attendance"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="弹幕次数少于"
            v-model="filterInfo.barrage"
          ></el-input
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6"
          ><el-input
            placeholder="投稿次数少于"
            v-model="filterInfo.submission"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="阅读公告数少于"
            v-model="filterInfo.announcement"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="平时成绩低于"
            v-model="filterInfo.average"
          ></el-input
        ></el-col>
        <el-button
          class="button_form"
          icon="el-icon-search"
          @click="getScoreListByFilter"
        >
        </el-button>
      </el-row>

      <!-- 学生列表区域 -->
      <el-table
        :data="scoreList"
        border
        ref="multipleTable"
        tooltip-effect="light"
        size="mini"
      >
        <el-table-column
          v-for="(key, index) in Object.keys(scoreList[0])"
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
        // 学生的学号
        stuID: '',
        // 权重设置 有默认值
        setting: {
          point: 0.5,
          page: 0.2,
          attendance: 0.2,
          barrage: 0.05,
          submission: 0.05,
          announcement: 0,
        },
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      filterInfo: {
        point: '',
        page: '',
        attendance: '',
        barrage: '',
        submission: '',
        announcement: '',
        average: '',
      },
      scoreList: [],
    }
  },

  created() {
    this.getSetting()
    this.getScoreList()
  },

  // watch: {
  //   //监测路由变化，只要变化了就调用路由参数方法将数据存储本组件即可
  //   $route: 'getSetting',
  // },

  methods: {
    getSetting() {
      if(window.localStorage.getItem('point')) {
        this.queryInfo.setting.point = window.localStorage.getItem('point')
      }
      if(window.localStorage.getItem('page')) {
        this.queryInfo.setting.page = window.localStorage.getItem('page')
      }
      if(window.localStorage.getItem('attendance')) {
        this.queryInfo.setting.attendance = window.localStorage.getItem('attendance')
      }
      if(window.localStorage.getItem('barrage')) {
        this.queryInfo.setting.barrage = window.localStorage.getItem('barrage')
      }
      if(window.localStorage.getItem('submission')) {
        this.queryInfo.setting.submission = window.localStorage.getItem('submission')
      }
      if(window.localStorage.getItem('announcement')) {
        this.queryInfo.setting.announcement = window.localStorage.getItem('announcement')
      }
      console.log("in get setting: " + this.queryInfo.setting.point)
      console.log("in get setting: " + this.queryInfo.setting.page)
      console.log("in get setting: " + this.queryInfo.setting.attendance)
      console.log("in get setting: " + this.queryInfo.setting.barrage)
      console.log("in get setting: " + this.queryInfo.setting.submission)
      console.log("in get setting: " + this.queryInfo.setting.announcement)


      // let param = JSON.parse(this.$route.query.param)

      // this.queryInfo.setting.point = param.point
      // this.queryInfo.setting.page = param.page
      // this.queryInfo.setting.attendance = param.attendance
      // this.queryInfo.setting.barrage = param.barrage
      // this.queryInfo.setting.submission = param.submission
      // this.queryInfo.setting.announcement = param.announcement
    },

    async getScoreList() {
      // let myformData = new FormData()
      // myformData.append('coursename', this.queryInfo.coursename)
      // myformData.append('stuID', this.queryInfo.stuID)
      // myformData.append('setting', this.setting)
      // myformData.append('pagenum', this.queryInfo.pagenum)
      // myformData.append('pagesize', this.queryInfo.pagesize)
      console.log(this.queryInfo.setting)
      const { data: res } = await this.$axios.get('score', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error('获取成绩列表失败！')
      }
      this.scoreList = res.scores
      this.total = res.total
      console.log(res)
    },

    async getScoreListByFilter() {
      let params = {
        point: this.filterInfo.point,
        page: this.filterInfo.page,
        attendance: this.filterInfo.attendance,
        barrage: this.filterInfo.barrage,
        submission: this.filterInfo.submission,
        announcement: this.filterInfo.announcement,
        average: this.filterInfo.average,
        coursename: this.queryInfo.coursename,
        stuID: this.queryInfo.stuID,
        setting: this.queryInfo.setting,
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize,
      }
      const { data: res } = await this.$axios.get('score/filter', {
        params: params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取成绩列表失败！')
      }
      this.scoreList = res.scores
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}

.button_form {
  margin-left: 13px;
}

.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
