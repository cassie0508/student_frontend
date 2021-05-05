import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Course from '../components/Course.vue'
import Student from '../components/student/Student.vue'
import Score from '../components/score/Score.vue'
import Setting from '../components/score/Setting.vue'
import Classification from '../components/study/Classification.vue'
import ClassList from '../components/study/ClassList.vue'
import OnClass from '../components/onClass/OnClass.vue'
import BeforeClass from '../components/beforeClass/BeforeClass.vue'
import Exam from '../components/exam/Exam.vue'
import OnClassList from '../components/onClass/OnClassList.vue'
import BeforeClassList from '../components/beforeClass/BeforeClassList.vue'
import ExamList from '../components/exam/ExamList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/course',
    component: Course
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/student', component: Student },
      { path: '/score', name: 'score', component: Score },
      { path: '/setting', component: Setting },
      { path: '/classification', component: Classification },
      { path: '/classList', component: ClassList },
      { path: '/onClass', component: OnClass },
      { path: '/beforeClass', component: BeforeClass },
      { path: '/exam', component: Exam },
      { path: '/onClassList', component: OnClassList },
      { path: '/beforeClassList', component: BeforeClassList },
      { path: '/examList', component: ExamList }
    ]
  }
]

const router = new VueRouter({
  routes
})

// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to将要访问的路径
//   // from代表从哪个路径跳转而来
//   // next是一个函数，表示放行
//   // next() 放行  next('/login')强制跳转

//   // 如果用户访问登录页，直接放行
//   if (to.path === '/login') return next()
//   // 从sessionStorage中获取到保存的token值
//   const codeStr = window.sessionStorage.getItem('token')
//   // 没有token，强制跳转到登录页
//   if (!codeStr) return next('/login')
//   next()
// })

export default router

