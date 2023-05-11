<template>
  <!-- flex="~ col"  -->
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else w50rem h34rem justify-center items-center bg-dark class="task">
    <span class="title">任务监管</span>
    <div class="task-top">
      <dv-active-ring-chart
        v-if="total"
        :config="conf"
        style="width: 300px; height: 300px"
      ></dv-active-ring-chart>
      <div v-else style="width: 300px; height: 300px"></div>
      <div class="task-word">
        <div class="tw-one">
          <div v-for="item in rightTopData" :key="item.status">
            <span>{{ item.name }}: </span>
            <span :style="{ color: item.color }">{{ item.value }} 个</span>
          </div>
        </div>
        <div class="tw-two">
          <div v-for="item in rightMiddleData" :key="item.status">
            <span>{{ item.name }}: </span>
            <span :style="{ color: item.color }">{{ item.value }} 个</span>
          </div>
        </div>
        <div class="task-bottom">
          <div>
            <span>{{ rightBottomData.name }}：</span>
            <span style="color: #00ff00">{{
              time(rightBottomData.value)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick } from 'vue'
import { getTaskLists } from '@/script/api/task'
import { time } from '@/script/utils/format'

interface IState {
  name: string
  value: number
  status: string
  color?: string
}
interface IStateRightData {
  rightTopData: IState[]
  rightMiddleData: IState[]
  rightBottomData: IState
}

interface IColor {
  lineWidth: number
  digitalFlopStyle: {
    fill: string
  }
  color: string[]
  showOriginValue: boolean
  data: any[]
  activeTimeGap: number
}
// * 加载标识
const loading = ref<boolean>(true)
// * 总数
const total = ref()

const conf = reactive<IColor>({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: 'pink'
  },
  color: [],
  showOriginValue: false,
  data: [],
  activeTimeGap: 2000
})
const rightData = reactive<IStateRightData>({
  rightTopData: [],
  rightMiddleData: [],
  rightBottomData: { name: '', value: 0, status: '', color: '' }
})

const initTaskLists = async () => {
  try {
    let colorLists = [
      '#00ae9d',
      '#00ff00',
      '#ef4136',
      '#50e3c2',
      '#f58220',
      '#ffd400',
      '#00ff00'
    ]
    // 1总数，2成功，3失败，4运行，5等待，6验证，7时间
    const leftChartStatus = ['2', '3', '4', '5', '6']
    const rightTopStatus = ['4', '5', '6']
    const rightMiddleStatus = ['2', '3', '1']
    const res: any = await getTaskLists()
    //给接口数据添加color字段
    const addColorData = res.map((item: IState) => {
      return {
        ...item,
        color: colorLists[+item.status - 1]
      }
    })
    // 任务总数
    const taskTotal = res.find((item: IState) => item.status === '1')
    total.value = taskTotal.value
    // 左边图表数据
    const filterLeftChartData = addColorData.filter((item: IState) =>
      leftChartStatus.includes(item.status)
    )
    // 右上数据
    const filterRightTopData = addColorData.filter((item: IState) =>
      rightTopStatus.includes(item.status)
    )
    // 右中数据
    const filterRightMiddleData = addColorData.filter((item: IState) =>
      rightMiddleStatus.includes(item.status)
    )
    // 右下数据
    const filterRightBottomData = addColorData.find(
      (item: IState) => item.status === '7'
    )
    // 赋值
    rightData.rightTopData = filterRightTopData
    rightData.rightMiddleData = filterRightMiddleData
    rightData.rightBottomData = filterRightBottomData
    conf.data = filterLeftChartData
    conf.color = filterLeftChartData.map((item: IState) => {
      return item.color
    })
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
initTaskLists()

const { rightTopData, rightMiddleData, rightBottomData } = toRefs(rightData)
</script>
<style lang="scss" scoped>
.task {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .title {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .task-top {
    height: 100%;
    display: flex;
    align-items: center;
    .task-word {
      height: 300px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      // padding: 4rem 3rem 2rem 0;
      padding: 50px 10px 70px 0;
      .tw-one {
        display: flex;
        div:nth-child(2),
        div:nth-child(3) {
          // padding-left: 2rem;
          padding-left: 10px;
        }
      }

      .tw-two {
        display: flex;
        div:nth-child(2),
        div:nth-child(3) {
          // padding-left: 3rem;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
