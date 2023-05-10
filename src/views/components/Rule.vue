<template>
  <div class="rule">
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: 300px"
      @mouseover="mouseoverHandler"
      @click="clickHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
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
</script>

<style lang="scss" scoped>
.rule {
  display: flex;
  align-items: center;
  width: 33.33%;
  padding: 2rem;
}
.title {
  padding: 2rem 0 2rem 2rem;
}
</style>
