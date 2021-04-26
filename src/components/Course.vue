<template>
  <el-container class="course-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>学生学习行为分析系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <!-- 新建课程 -->
          <el-button class="btn_form" type="primary" @click="addDialogVisible = true"
            >新建课程</el-button
          >
        </el-col>
      </el-row>
      <!-- 课程列表区域 -->
      <el-table :data="courselist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="课程名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 查看按钮 -->
            <el-tooltip effect="dark" content="进入课程" placement="top">
              <el-button
                type="success"
                icon="el-icon-search"
                size="small"
                @click="enterCourse(scope.row.name)"
              ></el-button>
            </el-tooltip>
            <!-- 更新按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="updateDialogVisible = true"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeCourse(scope.row.name)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
    </el-card>

    <!-- 对话框区域 -->
    <!-- 新建课程的对话框 -->
    <el-dialog
      title="导入课程"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <!-- 输入内容区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="课程名称" prop="coursename">
          <el-input v-model="addForm.coursename"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="addForm.classname"></el-input>
        </el-form-item>
        <el-form-item label="雨课堂数据" prop="">
          <el-upload
            ref="uploadFile"
            action="none"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传excel文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCourse">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 更新课程的对话框 -->
    <el-dialog
      title="更新课程"
      :visible.sync="updateDialogVisible"
      width="40%"
      @close="updateDialogClosed"
    >
      <!-- 输入内容区域 -->
      <el-form :model="updateForm" ref="updateFormRef" label-width="100px">
        <el-form-item label="更新方式">
          <el-select v-model="updateForm.type" placeholder="请选择更新方式">
            <el-option label="替换" value="替换"></el-option>
            <el-option label="追加" value="追加"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="雨课堂数据" prop="">
          <el-upload
            ref="uploadFile"
            action="none"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传excel文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCourse(scope.row.name)"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem('username'),
      importDataBtnIcon: '',
      importDataBtnText: '',
      addDialogVisible: false,
      updateDialogVisible: false,
      // 上传的文件
      file: null,
      // 课程列表，默认为空
      courselist: [],
      // 总数据条数
      total: 0,
      // 查询条件 分页
      queryInfo: {
        username: window.sessionStorage.getItem('username'),
        pagenum: 1,
        pagesize: 5
      },
      // 导入课程的表单数据对象
      addForm: {
        coursename: '',
        classname: ''
      },
      // 更新课程的表单数据对象 
      updateForm: {
        type: ""
      }
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    // 获取课程列表
    async getCourseList() {
      console.log(this.queryInfo)
      const {data: res} = await this.$axios.get('file',{ params: this.queryInfo })
      this.courselist = res.list 
      this.total = res.total
    },
    // 新建课程
    addCourse() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        let myformData = new FormData()
        myformData.append('file', this.file.raw)
        myformData.append('coursename', this.addForm.coursename)
        myformData.append('classname', this.addForm.classname)
        myformData.append('username', this.username)
        const { data: res } = await this.$axios.post('file', myformData)
        if (res.code !== 200) return this.$message.error('新增课程失败！')
        this.$message.success('新增课程成功')
        // 隐藏新增课程的对话框
        this.addDialogVisible = false
        // 重新获取课程列表数据
        this.getCourseList()
      })
    },
    // 进入课程
    enterCourse(name) {
      window.sessionStorage.setItem('coursename', name)
      this.$router.push('/home')
    },
    // 更新课程
    updateCourse(name) {
        this.$refs.updateFormRef.validate(async valid => {
        if (!valid) return
        let myformData = new FormData()
        myformData.append('file', this.file.raw)
        myformData.append('course', name)
        myformData.append('type', this.updateForm.type)
        const { data: res } = await this.$axios.post('file/update', myformData)
        if (res.code !== 200) return this.$message.error('更新课程失败！')
        this.$message.success('更新课程成功')
        // 隐藏更新课程的对话框
        this.updateDialogVisible = false
      })
    },
    // 删除课程
    removeCourse(name) {
      let myformData = new FormData()
      myformData.append('name', name)
      myformData.append('username', this.username)
      this.$axios.post('file/remove', myformData)
      if (res.code !== 200) return this.$message.error('删除课程失败！')
      this.$message.success('删除课程成功')
      // 重新获取课程列表数据
      this.getCourseList()
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
      this.$refs.uploadFile.clearFiles()
    },
    updateDialogClosed () {
      this.$refs.updateFormRef.resetFields()
      this.$refs.uploadFile.clearFiles()
    },
    handleRemove(file) {
      console.log(file)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleChange(file) {
      this.file = file
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.course-container {
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

.btn_form {
  margin-bottom: 20px;
}
</style>