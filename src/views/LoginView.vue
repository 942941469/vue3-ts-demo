<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="submitForm(ruleFormRef)"
        >登录</el-button
        >
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { LoginDataclass } from '@/type/login'
import type { FormInstance } from 'element-plus'
import { login } from '@/request/api'
import { useRouter } from 'vue-router'
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(data.ruleForm).then((res) => {
        localStorage.setItem('token', res.data.token)
        router.push('/')
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = () => {
  data.ruleForm.password = ''
  data.ruleForm.username = ''
}
const data = reactive(new LoginDataclass())
const rules = {
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 5,
      message: 'Length should be 3 to 5',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '输入密码',
      trigger: 'blur'
    }
  ]
}
const { ruleForm } = { ...toRefs(data) }
</script>

<style lang="scss" scoped>
.login-box{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  overflow: hidden;
  text-align: center;
  .demo-ruleForm{
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
  }
  .loginBtn{
    width: 48%;
  }
  h2{
    margin-bottom: 10px;
  }
}
</style>
