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
import { reactive, ref, onMounted } from 'vue'
// * 加载标识
const loading = ref<boolean>(true)

// const props = defineProps({
//   height: {
//     type: String,
//     // default: '250px'
//     // default: '15rem'
//     default: '350px'
//   }
// })

const config = reactive({
  header: ['人员', '提交', '完成', '产生结果数'],
  data: [
    ['冯元迪1', '1个', '8个', 123231213],
    ['冯元迪2', '2个', '8个', 123231213],
    ['冯元迪3', '3个', '8个', 123231213],
    ['冯元迪4', '4个', '8个', 123231213],
    ['冯元迪5', '5个', '8个', 123231213],
    ['冯元迪6', '6个', '8个', 123231213],
    ['冯元迪7', '7个', '8个', 123231213],
    ['冯元迪8', '8个', '8个', 123231213],
    ['冯元迪9', '9个', '8个', 123231213],
    ['冯元迪10', '10个', '8个', 123231213],
    ['冯元迪11', '11个', '8个', 123231213],
    ['冯元迪12', '12个', '8个', 123231213],
    ['冯元迪13', '13个', '8个', 123231213]
  ],
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
// 生命周期
onMounted(() => {
  cancelLoading()
})
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
