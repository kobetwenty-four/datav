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
import { reactive, ref, onMounted } from 'vue'
// * 加载标识
const loading = ref<boolean>(true)
const config = reactive({
  data: [
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    },
    {
      name: 'DFX-0215-7 PTH焊盘阻焊开窗环宽',
      value: 55
    }
  ],
  unit: '条'
})
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
onMounted(() => {
  cancelLoading()
})
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
