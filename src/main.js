import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TreeTable from 'vue-table-with-tree-grid'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api  8443是tomcat的redirectport
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

// 1.引入echarts
import * as echarts from 'echarts'

import installElementPlus from './plugins/element'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

