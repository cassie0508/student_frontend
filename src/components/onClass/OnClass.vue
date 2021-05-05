<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>课堂统计</el-breadcrumb-item>
      <el-breadcrumb-item>课堂情况</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="myLine" :style="{ width: '1000px', height: '550px' }"></div>
    </el-card>

    <div class="text-form">签到情况 答题情况</div>

    <el-card>
      <div
        class="bar-class"
        id="attendanceBar"
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

      const { data: res } = await this.$axios.get('statistics/onClass/line', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取折线图失败！')
      }

      myChart.setOption(res.data)
    },

    async drawBar() {
      let myAttendance = this.$echarts.init(
        document.getElementById('attendanceBar')
      )
      let myPoint = this.$echarts.init(document.getElementById('pointBar'))

      const { data: res } = await this.$axios.get('statistics/onClass/bar', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取柱状图失败！')
      }

      let option1 = {
        title: { text: '签到方式汇总', left: 'center' },
        xAxis: { data: ['未上课', '扫二维码', '课堂暗号', '"正在上课"提示'] },
        yAxis: {
          // max: 250,
          // axisLabel:{
          //   formatter: function (value) {
          //     var texts = [];
          //     if(value >= 250) {
          //       texts.push('大于250');
          //     }
          //     return texts;
          //   }
          // }
        },
        grid: {
          x: 100,
        },
        series: [
          {
            data: [
              res.data1[0],
              res.data1[1],
              res.data1[2],
              res.data1[3],
            ],
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
            data: [res.data2[0], res.data2[1], res.data2[2]],
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

      myAttendance.setOption(option1)
      myPoint.setOption(option2)
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.text-form {
  font-weight: 700;
  color: #2b4b6b;
  margin-top: 10px;
  margin-bottom: 10px;
}

.bar-class {
  display: inline-block;
}
</style>