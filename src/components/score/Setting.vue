<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/runstate' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>权重设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-form :rules="settingRules" :model="setting" ref="settingRef">
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">答题:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="point">
              <el-input v-model.number="setting.point"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"
            ><div class="text_form">
              答题包括课堂答题、课前答题、试卷答题
            </div></el-col
          >
        </el-row>
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">预习:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="page">
              <el-input v-model.number="setting.page"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"
            ><div class="text_form">课前观看课件的页数</div></el-col
          >
        </el-row>
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">出勤:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="attendance">
              <el-input v-model.number="setting.attendance"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"><div class="text_form">签到的次数</div></el-col>
        </el-row>
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">弹幕:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="barrage">
              <el-input v-model.number="setting.barrage"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"
            ><div class="text_form">课堂发弹幕的数量</div></el-col
          >
        </el-row>
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">投稿:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="submission">
              <el-input v-model.number="setting.submission"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"
            ><div class="text_form">课堂投稿的数量</div></el-col
          >
        </el-row>
        <el-row :gutter="10" class="row_form">
          <el-col :span="2"><div class="text_form">公告:</div></el-col>
          <el-col :span="3">
            <!-- <el-form :rules="settingRules" :model="setting" ref="settingRef"> -->
            <el-form-item prop="announcement">
              <el-input v-model.number="setting.announcement"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-col>
          <el-col :span="3"><div class="text_form">%</div></el-col>
          <el-col :span="10"
            ><div class="text_form">阅读公告的次数</div></el-col
          >
        </el-row>
      </el-form>

      <el-row class="btn_form">
        <el-button type="primary" @click="setWeight">确定</el-button>
        <el-button type="info" @click="resetSetting">重置</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setting: {
        point: window.localStorage.getItem('point').substring(2),
        page: window.localStorage.getItem('page').substring(2),
        attendance: window.localStorage.getItem('attendance').substring(2),
        barrage: window.localStorage.getItem('barrage').substring(2),
        submission: window.localStorage.getItem('submission').substring(2),
        announcement: window.localStorage.getItem('announcement').substring(2),
      },

      settingRules: {
        point: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
        page: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
        attendance: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
        barrage: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
        submission: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
        announcement: [
          { required: true, message: '请输入权重', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    resetSetting() {
      this.$refs.settingRef.resetFields()
    },

    setWeight() {
      let sum = parseInt(this.setting.point) + parseInt(this.setting.page) + parseInt(this.setting.attendance) + parseInt(this.setting.barrage) + parseInt(this.setting.submission) +  parseInt(this.setting.announcement)
      console.log(sum)
      if(sum != 100)
      return this.$message.error('权重和需为100')

      window.localStorage.setItem('point',parseInt(this.setting.point)/100)
      window.localStorage.setItem('page',parseInt(this.setting.page)/100)
      window.localStorage.setItem('attendance',parseInt(this.setting.attendance)/100)
      window.localStorage.setItem('barrage',parseInt(this.setting.barrage)/100)
      window.localStorage.setItem('submission',parseInt(this.setting.submission)/100)
      window.localStorage.setItem('announcement',parseInt(this.setting.announcement)/100)

      console.log(window.localStorage.getItem('point'))
      console.log(window.localStorage.getItem('page'))
      console.log(window.localStorage.getItem('attendance'))
      console.log(window.localStorage.getItem('barrage'))
      console.log(window.localStorage.getItem('submission'))
      console.log(window.localStorage.getItem('announcement'))


      // let arg = JSON.stringify({
      //   point: '0.' + this.setting.point,
      //   page: '0.' + this.setting.page,
      //   attendance: '0.' + this.setting.attendance,
      //   barrage: '0.' + this.setting.barrage,
      //   submission: '0.' + this.setting.submission,
      //   announcement: '0.' + this.setting.announcement,
      // })
      // // 把权值传给score页面
      // this.$router.push({
      //   path: '/score',
      //   query: {
      //     param: arg,
      //   },
      // })

      // this.$router.replace({
      //   name: 'score',
      //   params: {
      //     point: '0.' + this.point,
      //     page: '0.' + this.page,
      //     attendance: '0.' + this.attendance,
      //     barrage: '0.' + this.barrage,
      //     submission: '0.' + this.submission,
      //     announcement: '0.' + this.announcement,
      //   },
      // })
    },
  },
}
</script>



<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.row_form {
  .text_form {
    color: #2b4b6b;
    transform: translate(0, 30%);
  }
}

.btn_form {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  margin-right: 70px;
}
</style>