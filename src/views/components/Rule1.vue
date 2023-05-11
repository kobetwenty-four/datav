<template>
  <!-- <div w50rem h24rem p3 flex="~ col" justify-center items-center bg-dark> -->
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div class="rule" v-else>
    <div>
      <dv-scroll-ranking-board
        :config="config"
        style="width: 500px; height: 350px"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getLogLists } from '@/script/api/rule'
// * 加载标识
const loading = ref<boolean>(true)
const config = reactive({
  data: []
})

const initData = async () => {
  try {
    const res = await getLogLists()
    let dealData = res.map((item: any) => {
      return {
        ...item,
        value: `${item.operName} ${item.operTime}`,
        name: item.title
      }
    })
    loading.value = false
    config.data = dealData
  } catch (error) {
    loading.value = false
  }
}
initData()
</script>
<style lang="scss" scoped>
.rule {
  display: flex;
  align-items: center;
  width: 33.33%;
  padding: 20px;
}
.title {
  //   padding: 2rem 0 2rem 2rem;
  padding: 20px 0 0 20px;
}
</style>
