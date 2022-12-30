<template>
  <div>
    <el-form :inline="true" :model="data.selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="data.selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="data.selectData.role" class="m-2" placeholder="请选择" size="large">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in data.roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="data.userList" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="nickName" label="姓名" width="180" />
    <el-table-column prop="role" label="角色">
      <template #default="{row}">
        <el-button
          v-for="item in row.role"
          :key = item.role
          link
          size="small"
        >
          {{item.roleName}}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="role" label="操作">
      <template #default="{row}">
        <el-button
          type="primary"
          link
          size="small"
          @click="changeUser(row)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="data.isShow" title="编辑信息">
    <el-form :model="data.active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="data.active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="data.active.role" placeholder="请选择">
          <el-option
            v-for="item in data.roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser">更改</el-button>
        <el-button type="primary" @click="data.isShow = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api'
import { UserData, UserList } from '@/type/user'
const data = reactive(new UserData())
onMounted(() => {
  getUser()
  getRole()
})
const getUser = async () => {
  const { data: res } = await getUserList()
  data.userList = res
}
const getRole = async () => {
  const { data: res } = await getRoleList()
  data.roleList = res
}
const onSubmit = () => {
  let arr: UserList[] = []
  if (data.selectData.nickName || data.selectData.role) {
    if (data.selectData.nickName) {
      arr = data.userList.filter((value) => {
        return value.nickName.indexOf(data.selectData.nickName) !== -1
      })
    }
    if (data.selectData.role) {
      arr = (data.selectData.nickName ? arr : data.userList).filter((value) => {
        return value.role.find((item) => item.role === data.selectData.role)
      })
    }
  } else {
    arr = data.userList
  }
  data.userList = arr
}
const changeUser = (row: UserList) => {
  data.isShow = true
  data.active = {
    id: row.id,
    nickName: row.userName,
    userName: row.nickName,
    role: row.role.map((value:any) => value.role || value.roleId)
  }
}
const updateUser = () => {
  const obj: any = data.userList.find(value => value.id === data.active.id)
  obj.nickName = data.active.nickName
  obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !== -1)
  data.userList.forEach((item, i) => {
    if (item.id === obj.id) {
      data.userList[i] = obj
    }
  })
  console.log(obj)
  data.isShow = false
}
watch([() => data.selectData.nickName, () => data.selectData.role], () => {
  if (data.selectData.nickName === '' && data.selectData.role === 0) {
    getUser()
  }
})
</script>

<style scoped>

</style>
