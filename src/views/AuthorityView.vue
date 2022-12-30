<template>
  <el-tree
  :data="data.list"
  ref="treeRef"
  show-checkbox
  node-key="roleId"
  :default-checked-keys="data.authority"
  :check-strictly="true"
  :props="{
  children: 'roleList',
  label: 'name',
  }"
  />
  <el-button @click="changeAuthority">确认修改</el-button>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { Authority } from '@/type/authority'
import { getAuthorityList } from '@/request/api'
import { ElTree } from 'element-plus'
const route = useRoute()
const query: any = route.query
const data = reactive(new Authority(query.id, query.authority))
onMounted(async () => {
  const { data: res } = await getAuthorityList()
  data.list = res
})
const treeRef = ref<InstanceType<typeof ElTree>>()
const changeAuthority = () => {
  console.log(treeRef.value!.getCheckedKeys().sort(function (a:any, b:any) {
    return a - b
  }))
}
</script>

<style scoped>

</style>
