<template>
  <div class="head">
    <!--    导航栏-->
    <div class="title">
      <a class="logo"><img src="../assets/logo.png"></a>
      <el-tabs class="home_nav">
        <el-tab-pane label="首页"></el-tab-pane>
        <el-tab-pane label="情绪记录"></el-tab-pane>
        <el-tab-pane label="疾病预测"></el-tab-pane>
      </el-tabs>
    </div>
    <!--    工具栏-->
    <div class="tool">
      <el-input v-model="input" placeholder="搜索" suffix-icon="Search"/>
      <el-button type="primary">上传</el-button>
    </div>
    <!--    登录注册-->
    <div class="log">
      <!--      登录对话框-->
      <a id="logup" @click="logupFormVisible=true">登录</a>
      <el-dialog v-model="logupFormVisible" destroy-on-close title="登录" @close="logupClose(logupFormRef)">
        <el-form ref="logupFormRef" :model="logupForm" :rules="logupFormRules" label-position="left">
          <el-form-item label="用户名" label-width="140px" prop="username">
            <el-input v-model="logupForm.username"/>
          </el-form-item>
          <el-form-item label="密码" label-width="140px" prop="password">
            <el-input v-model="logupForm.password" show-password/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="logupFormVisible = false">取消</el-button>
        <el-button type="primary" @click="logupFormVisible = false">确定</el-button>
      </span>
        </template>
      </el-dialog>
      <!--      注册对话框-->
      <a id="login" @click="loginFormVisible=true">注册</a>
      <el-dialog v-model="loginFormVisible" destroy-on-close title="注册" top="1.5vh" @close="loginClose(loginFormRef)">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="left" label-width="15px">
          <el-form-item label="用户名" label-width="150px" prop="username">
            <el-input v-model="loginForm.username"/>
          </el-form-item>
          <el-form-item label="密码" label-width="150px" prop="password1">
            <el-input v-model="loginForm.password1" show-password/>
          </el-form-item>
          <el-form-item label="确认密码" label-width="150px" prop="password2">
            <el-input v-model="loginForm.password2" show-password/>
          </el-form-item>
          <el-form-item label="电话号码" label-width="150px" prop="mobile">
            <el-input v-model="loginForm.mobile"/>
          </el-form-item>
          <el-form-item label="邮箱" label-width="150px" prop="email">
            <el-input v-model="loginForm.email"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="loginFormVisible = false">取消</el-button>
        <el-button type="primary" @click="loginFormVisible = false">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {ref, unref} from "vue";

const logupFormVisible = ref(false)
const loginFormVisible = ref(false)


// 登录表单
const logupForm = ref({
  password: '',
  username: '',
})
// 注册表单
const loginForm = ref({
  password1: '',
  password2: '',
  username: '',
  email: '',
  mobile: ''
})


//登录验证规则
const logupFormRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
}

//密码验证
const passwordConfirm = (rule, value, cb) => {
  if (value !== loginForm.value.password1) {
    cb(new Error("两次密码不一致!"))
  }
};
// 验证邮箱
const checkEmail = (rule, value, cb) => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-z0-9])+(\.[a-zA-Z0-9_-])+/
  if (regEmail.test(value)) {
    return cb()
  }
  cb(new Error('请输入正确的邮箱!'))
};
// 验证手机号
const checkMobile = (rule, value, cb) => {
  const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (regMobile.test(value)) {
    return cb()
  }
  cb(new Error("请输入正确的手机号"))
};
//注册验证规则
const loginFormRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 10, message: '用户名长度应在5-10之间', trigger: 'blur'}
  ],
  password1: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 13, message: '密码长度应在6-13之间', trigger: 'blur'}
  ],
  password2: [
    {required: true, message: '请输入再次密码', trigger: 'blur'},
    {validator: passwordConfirm, trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {validator: checkEmail, trigger: 'blur'},
  ],
  mobile: [
    {required: true, message: '请输入电话号码', trigger: 'blur'},
    {validator: checkMobile, trigger: 'blur'}
  ]
}
// 对话框的数据重置
const logupFormRef = ref('')
const logupClose = (el) => {
  el.resetFields()
}
const loginFormRef = ref('')
const loginClose = (el) => {
  el.resetFields()
}
</script>

<style scoped>
/deep/ .el-form-item__error {
  padding-left: 25px;
}

.log {
  align-items: center;
  font-size: 16px;
}

.log a:hover {
  color: white;
}

.head {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
}

img {
  width: 65px;
}

/deep/ .el-input__wrapper {
  height: 35px;
  margin: 15px;
  border-radius: 15px;
  width: 400px;
}

div {
  display: flex;
}

.tool {
  display: flex;
  justify-content: space-between;
}

button {
  height: 35px;
  margin: 15px;
  margin-left: 5px;
  border-radius: 15px;
  background-color: #409EFF;
}

/deep/ .el-tabs__header {
  margin-top: 10px;
}

a {
  margin-right: 30px;
  text-decoration-line: none;
  color: black;
}

.el-button--text {
  margin-right: 15px;
}


/deep/ .el-dialog .el-form-item__label {
  padding-left: 70px;
  width: 100px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

/deep/ .el-form-item__label {
  line-height: 80px;
}
</style>
