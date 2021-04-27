<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>学业情况</el-breadcrumb-item>
      <el-breadcrumb-item>学业分析</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="3" class="first-btn"
          ><el-button @click="getListByType(4)">{{ btn1 }}</el-button></el-col
        >
        <el-col :span="3" class="second-btn"
          ><el-button @click="getListByType(0)">{{ btn2 }}</el-button></el-col
        >
        <el-col :span="3" class="third-btn"
          ><el-button @click="getListByType(1)">{{ btn3 }}</el-button></el-col
        >
        <el-col :span="3" class="fourth-btn"
          ><el-button @click="getListByType(2)">{{ btn4 }}</el-button></el-col
        >
        <el-col :span="3" class="fifth-btn"
          ><el-button @click="getListByType(3)">{{ btn5 }}</el-button></el-col
        >
      </el-row>
    </el-card>

    <el-card>
      <div
        class="chart-class"
        id="myLine"
        :style="{ width: '600px', height: '300px' }"
      ></div>
      <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div
        class="chart-class"
        id="myPie"
        :style="{ width: '350px', height: '300px' }"
      ></div>
    </el-card>

    <el-card>
      <el-row>
        <div class="text-class">类别一：该类学生有挂科风险</div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btn1: '',
      btn2: '',
      btn3: '',
      btn4: '',
      btn5: '',
      params: {
        // 课名
        coursename: window.sessionStorage.getItem('coursename'),
      },
    }
  },

  created() {
    this.getBtnData()
  },

  // 此时 页面上的元素 已经被渲染完毕
  mounted() {
    this.drawPie()
    this.drawLine()
  },

  methods: {
    async drawPie() {
      // 3.基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myPie'))

      const { data: res } = await this.$axios.get('study/classification/pie', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取饼图失败！')
      }

      // 4.绘制图表 展示数据
      myChart.setOption(res.data)
    },

    async drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myLine'))

      const { data: res } = await this.$axios.get('study/classification/line', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取折线图失败！')
      }

      myChart.setOption(res.data)
    },

    async getBtnData() {
      const { data: res } = await this.$axios.get('study/classification/btn', {
        params: this.params,
      })
      if (res.code !== 200) {
        return this.$message.error('获取数据失败！')
      }
      this.btn1 = '总学生数  ' + res.btn1
      this.btn2 = '类别一学生数  ' + res.btn2
      this.btn3 = '类别二学生数  ' + res.btn3
      this.btn4 = '类别三学生数  ' + res.btn4
      this.btn5 = '类别四学生数  ' + res.btn5
    },

    async getListByType(type) {
      // 进入列表页面
      window.sessionStorage.setItem('type', type)
      this.$router.push('/classList')
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.first-btn {
  margin-left: 5%;
}

.second-btn {
  margin-left: 5%;
}

.third-btn {
  margin-left: 5%;
}

.fourth-btn {
  margin-left: 5%;
}

.fifth-btn {
  margin-left: 5%;
}

.chart-class {
  display: inline-block;
}

.text-class {
  color: #2b4b6b;
  margin-left: 20px;
  margin-bottom: 5px;
}
</style>