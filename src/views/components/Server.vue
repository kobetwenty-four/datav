<template>
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else class="server">
    <div class="title">
      <span>服务器监管</span>
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
        padding-top: 40px;
        overflow-y: auto;
      "
    >
      <div class="server-chart" v-for="item in serverData" :key="item.value">
        <dv-decoration-9
          style="width: 110px; height: 110px"
          :color="item.color"
        >
          <div :style="{ color: item.fontColor }">{{ item.percent }}</div>
        </dv-decoration-9>
        <div style="margin: 20px 0" :style="{ color: item.fontColor }">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, watch, ref, onMounted } from 'vue'
import useDraw from '@/script/utils/useDraw'

// * 加载标识
const loading = ref<boolean>(true)
// 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

const data = reactive({
  serverData: [
    {
      percent: '66%',
      value: '192.168.7.120',
      color: ['#50e3c2', '#f58220'],
      fontColor: '#ff00ff'
    },
    {
      percent: '16%',
      value: '192.168.7.121',
      color: ['#1d953f', '#ef4136'],
      fontColor: '#1d953f'
    },
    {
      percent: '66%',
      value: '192.168.7.120',
      color: ['#ff00ff', '#00ff00'],
      fontColor: '#00ff00'
    },
    {
      percent: '66%',
      value: '192.168.7.120',
      color: ['#4fd2dd', '#235fa7'],
      fontColor: '#ef4136'
    },
    {
      percent: '16%',
      value: '192.168.7.121',
      color: ['#1d953f', '#ef4136'],
      fontColor: '#ffff00'
    },
    {
      percent: '66%',
      value: '192.168.7.120',
      color: ['#ff00ff', '#00ff00'],
      fontColor: '#fff'
    },
    {
      percent: '16%',
      value: '192.168.7.121',
      color: ['#1d953f', '#ef4136'],
      fontColor: '#ffff00'
    },
    {
      percent: '66%',
      value: '192.168.7.120',
      color: ['#ff00ff', '#00ff00'],
      fontColor: '#fff'
    }
  ]
})

const emits = defineEmits(['getLength'])
emits('getLength', data.serverData.length)
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
onMounted(() => {
  cancelLoading()
})
const { serverData } = toRefs(data)
</script>
<style scoped lang="scss">
.server {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0 0 1;
  justify-content: center;
  padding: 5px;
}
.content {
  font-size: 28px;
  text-shadow: 0 0 3px #7acaec;
}
.title {
  // padding: 2rem 0 2rem 2rem;
  // padding: 20px 0 40px 20px;
  position: absolute;
  top: 20px;
  left: 20px;
}
.server-chart {
  // height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
