<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.png" class="logo" alt=""></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4" class="col-btn"><el-button @click="quit">退出登录</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const list = router.getRoutes().filter(v => v.meta.isShow)
const route = useRoute()
const active = route.path
const quit = () => {
  localStorage.removeItem('token')
  router.push('Login')
}
</script>

<style lang="scss" scoped>
.el-header{
  height: 80px;
  background-color: burlywood;
  .logo{
    height: 80px;
  }
  h2, .quit-login{
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
}
.el-aside{
  .el-menu{
    height: calc(100vh - 80px);
  }
}
.col-btn{
  height: 80px;
  line-height: 80px;
}
</style>
