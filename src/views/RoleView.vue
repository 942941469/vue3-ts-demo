<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="roleId" label="ID" width="360" />
    <el-table-column prop="roleName" label="姓名" width="360" />
    <el-table-column prop="authority" label="操作">
      <template #default="{row}">
        <el-button
          link
          size="small"
          @click="changeRole(row)"
        >
          修改权限
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '@/request/api'
import { RoleData, RoleList } from '@/type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

onMounted(async () => {
  const { data: res } = await getRoleList()
  data.list = res
})
const addRole = () => {
  ElMessageBox.prompt('请输入角色名称', '添加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      if (value) {
        data.list.push({
          roleId: data.list.length + 1,
          roleName: value,
          authority: []
        })
      }
      ElMessage({
        type: 'success',
        message: `${value}添加成功`
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消'
      })
    })
}
const router = useRouter()
const changeRole = (row: RoleList) => {
  router.push({
    name: 'Authority',
    query: {
      id: row.roleId,
      authority: row.authority
    }
  })
}
const data = reactive(new RoleData())
const { list } = { ...toRefs(data) }
</script>

<style scoped>

</style>
