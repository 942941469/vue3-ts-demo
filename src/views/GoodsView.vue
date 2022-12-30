<template>
  <div class="select-box">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="dataList.computedList" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduce" label="详情" />
  </el-table>
  <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" />
</template>

<script setup lang="ts">
import { getGoodList } from '@/request/api'
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import { InitData, ListInt } from '@/type/good'
const data = reactive(new InitData())
onMounted(() => {
  getGoods()
})
const getGoods = async () => {
  const { data: res } = await getGoodList()
  data.list = res
  data.selectData.count = res.length
}
const dataList = reactive({
  computedList: computed(() => {
    return data.list.slice(
      (data.selectData.page - 1) * data.selectData.pagesize,
      data.selectData.page * data.selectData.pagesize
    )
  })
})
const currentChange = (page: number) => {
  data.selectData.page = page
}
const sizeChange = (pagesize : number) => {
  data.selectData.pagesize = pagesize
}
const onSubmit = () => {
  let arr: ListInt[] = []
  if (data.selectData.title || data.selectData.introduce) {
    if (data.selectData.title) {
      arr = data.list.filter((value) => {
        return value.title.indexOf(data.selectData.title) !== -1
      })
    }
  } else {
    arr = data.list
  }
  data.selectData.count = arr.length
  data.list = arr
}
watch([() => data.selectData.title, () => data.selectData.introduce], () => {
  if (data.selectData.title === '' && data.selectData.introduce === '') {
    getGoods()
  }
})
const { selectData } = { ...toRefs(data) }
</script>

<style scoped>

</style>
