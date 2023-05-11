<template>
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else class="server">
    <div class="title">
      <span>服务器监管</span>
      <div class="chartIcon">
        <span class="border"></span>
        <span style="color: #ef4136">注销</span>
      </div>
      <div class="chartIcon">
        <span class="border1"></span>
        <span style="color: #77787b">超时</span>
      </div>
      <div class="chartIcon">
        <span class="border2"></span>
        <span style="color: #00ff00">正常</span>
      </div>
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
          style="width: 120px; height: 120px"
          :color="item.color"
          :dur="item?.dur"
        >
          <div :style="{ color: item.fontColor }">{{ item.percent }}</div>
        </dv-decoration-9>
        <div style="margin: 20px 0" :style="{ color: item.fontColor }">
          <!-- {{ item.value + '（' + item.status + '）' }} -->
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { getServerLists } from '@/script/api/serve'

interface IState {
  serverData: {
    percent: string
    value: string
    color: string[]
    fontColor: string
    status: string
    dur?: number
  }[]
}
interface IApi {
  percent: string
  value: string
  status: string
  statusCode: string
}
type Fn = { color: string[]; fontColor: string; dur?: number }

// * 加载标识
const loading = ref<boolean>(true)

const data = reactive<IState>({
  serverData: []
})

// const emits = defineEmits(['getLength'])
// emits('getLength', data.serverData.length)

const inetServerLists = async () => {
  try {
    const res = await getServerLists()
    // statusCode: '2' 注销， statusCode: '0' 正常， statusCode: '1' 超时
    const addColorData = res.map((item: IApi) => {
      return {
        ...item,
        color: judgeColorByStatusCode(item.statusCode).color,
        fontColor: judgeColorByStatusCode(item.statusCode).fontColor,
        dur: judgeColorByStatusCode(item.statusCode)?.dur
      }
    })
    data.serverData = addColorData
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

const judgeColorByStatusCode = (code: string): Fn => {
  let data
  switch (code) {
    case '0':
      data = { color: ['#00ff00', '#00ff00'], fontColor: '#00ff00' }
      break
    case '1':
      data = { color: ['#77787b', '#77787b'], fontColor: '#77787b', dur: 12 }
      break

    default:
      data = { color: ['#ef4136', '#ef4136'], fontColor: '#ef4136', dur: 0 }

      break
  }
  return data
}

inetServerLists()

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
.chartIcon {
  display: inline-flex;
  align-items: center;
  .border,
  .border1,
  .border2 {
    display: inline-block;
    width: 20px;
    height: 12px;
    border-radius: 3px;
    background-color: #ef4136;
    margin: 0 10px 0 20px;
  }
  .border1 {
    background-color: #77787b;
  }
  .border2 {
    background-color: #00ff00;
  }
}
</style>
