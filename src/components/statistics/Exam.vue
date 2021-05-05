<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>试卷统计</el-breadcrumb-item>
      <el-breadcrumb-item>试卷推送</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="myLine" :style="{ width: '1000px', height: '500px' }"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        // 课名
        coursename: window.sessionStorage.getItem('coursename'),
      },
    }
  },

  mounted() {
    this.drawLine()
    this.drawBar()
  },

  methods: {
    async drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myLine'))

      const { data: res } = await this.$axios.get(
        'statistics/exam/line',
        {
          params: this.params,
        }
      )
      if (res.code !== 200) {
        return this.$message.error('获取折线图失败！')
      }

      let option = {
        title: {
          text: '试卷得分走势',
          left: 'center',
        },
        tooltip: { trigger: 'axis' },
        legend: { data: ['得分'], top: 40 },
        grid: { y: 110, y2: 170 },
        xAxis: {
          axisLabel: { show: true, interval: 0, rotate: 60 },
          data: res.xAxis,
        },
        yAxis: {},
        series: [
          {
            name: '得分',
            type: 'line',
            data: res.data,
          },
        ],
      }

      myChart.setOption(option)  
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>