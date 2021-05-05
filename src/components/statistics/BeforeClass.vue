<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>预习统计</el-breadcrumb-item>
      <el-breadcrumb-item>课件推送</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="myLine" :style="{ width: '1000px', height: '520px' }"></div>
    </el-card>

    <el-card>
      <div
        class="bar-class"
        id="pageBar"
        :style="{ width: '450px', height: '300px' }"
      ></div>
      <div
        class="bar-class"
        id="pointBar"
        :style="{ width: '450px', height: '300px' }"
      ></div>
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
        'statistics/beforeClass/line',
        {
          params: this.params,
        }
      )
      if (res.code !== 200) {
        return this.$message.error('获取折线图失败！')
      }

      let option = {
        title: {
          text: '预习情况各项数据走势',
          left: 'center',
        },
        tooltip: { trigger: 'axis' },
        legend: { data: ['观看页数', '答题'], top: 40 },
        grid: { y: 110, y2: 150 },
        xAxis: {
          axisLabel: { show: true, interval: 0, rotate: 60 },
          data: res.xAxis,
        },
        yAxis: {},
        series: [
          {
            name: '观看页数',
            type: 'line',
            data: res.data1,
          },
          {
            name: '答题',
            type: 'line',
            data: res.data2,
          },
        ],
        color: [
          'rgb(21,13,125,0.57)',
          'rgb(46,41,107,0.91)',
        ],
      }

      myChart.setOption(option)
    },

    async drawBar() {
      let myPage = this.$echarts.init(
        document.getElementById('pageBar')
      )
      let myPoint = this.$echarts.init(document.getElementById('pointBar'))

      const { data: res } = await this.$axios.get('statistics/beforeClass/bar', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取柱状图失败！')
      }
      let option1 = {
        title: { text: '观看页数汇总', left: 'center' },
        xAxis: { data: ['未观看', '部分观看', '完成观看'] },
        yAxis: {
        },
        grid: {
          x: 100,
        },
        series: [
          {
            data: res.data1,
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#5470c6",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      }

      let option2 = {
        title: { text: '答题情况汇总', left: 'center' },
        xAxis: { data: ['未答题', '答题正确', '答题错误'] },
        yAxis: {},
        grid: {
          x: 100,
        },
        series: [
          {
            data: res.data2,
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#5470c6",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      }

      myPage.setOption(option1)
      myPoint.setOption(option2)

    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.bar-class {
  display: inline-block;
}
</style>
