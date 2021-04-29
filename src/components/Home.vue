<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>学生学习行为分析系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 折叠按钮 -->
        <div class="toggle-button">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff"
        active-text-color="#409BEF" unique-opened router
        :default-active="activePath">

          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-platform"></i>
              <!-- 文本 -->
              <span>学生管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="student" @click="saveNavState('student')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-platform"></i>
              <!-- 文本 -->
              <span>成绩管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="score" @click="saveNavState('score')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>成绩列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="setting" @click="saveNavState('setting')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权重设置</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-marketing"></i>
              <!-- 文本 -->
              <span>学业情况</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="classification" @click="saveNavState('classification')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学业分析</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item index="predictionOfSubject" @click="saveNavState('predictionOfSubject')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>教学预警</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-data"></i>
              <!-- 文本 -->
              <span>课堂统计</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="onClass" @click="saveNavState('onClass')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>课堂情况</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-data"></i>
              <!-- 文本 -->
              <span>试卷统计</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="student" @click="saveNavState('student')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>试卷情况</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-data"></i>
              <!-- 文本 -->
              <span>预习统计</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="beforeClass" @click="saveNavState('beforeClass')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>课件推送</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  watch: {
    '$route'(toRouter, fromRouter) {
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // cursor: pointer;
}
</style>
