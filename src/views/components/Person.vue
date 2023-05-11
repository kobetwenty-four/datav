<template>
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else class="personAll">
    <div class="title">
      <span>人员监管</span>
    </div>
    <div demo-bg class="person">
      <dv-scroll-board
        :config="config"
        :style="{ width: '90%', height: '290px' }"
        @mouseover="mouseoverHandler"
        @click="clickHandler"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getPersonLists } from '@/script/api/person'
interface Istate {
  header: string[]
  data: (string | number)[][]
  index: boolean
  columnWidth: number[]
  align: string[]
}

// * 加载标识
const loading = ref<boolean>(true)

const config = reactive<Istate>({
  header: ['人员', '提交', '完成', '产生结果数'],
  data: [],
  index: true,
  columnWidth: [50],
  align: ['center']
})

const mouseoverHandler = (e: any) => {
  console.log(e)
}

const clickHandler = (e: any) => {
  console.log(e)
}
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const initPersonLists = async () => {
  try {
    const res: any = await getPersonLists()
    console.log(res)
    config.data = res
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
initPersonLists()
</script>

<style lang="scss" scoped>
.personAll {
  position: relative;
  height: 100%;
}
.person {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.title {
  // padding: 2rem 0 2rem 2rem;
  // padding: 20px 0 10px 20px;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
