<template>
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else id="main" style="width: 500px; height: 350px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getRuleLists } from '@/script/api/ruleLeft'

type DrawArgments = {
  ReportNum: number
  RuleClassName: string
  value: number
  name: string
}

// * 加载标识
const loading = ref<boolean>(true)
let currentIndex = ref()
// let chartData = ref<DrawArgments[]>([])

// onMounted(() => {
//   nextTick(() => {
//     draw(chartData.value)
//   })
// })

const draw = (dataArg?: DrawArgments[]) => {
  var chartDom = document.getElementById('main')!
  console.log(chartDom)

  var myChart = echarts.init(chartDom)
  var option: any

  option = {
    legend: {
      // top: 'bottom'
      show: false
    },
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return point
      }
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        // name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 160],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: false
        },
        data: dataArg
      }
    ]
  }

  option && myChart.setOption(option)

  currentIndex.value = -1
  setInterval(function () {
    var dataLen = option.series[0].data.length
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex.value
    })
    currentIndex.value = (currentIndex.value + 1) % dataLen
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex.value
    })
    myChart.dispatchAction({
      type: 'showTip',
      // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
      seriesIndex: 0,
      // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
      dataIndex: currentIndex.value
    })
  }, 2000)
}
// const cancelLoading = () => {
//   setTimeout(() => {
//     loading.value = false
//   }, 500)
// }

const initRuleLeftLists = async () => {
  try {
    const res = await getRuleLists()
    const dealData = res.map(
      (item: { ReportNum: number; RuleClassName: string }) => {
        return {
          ...item,
          value: item.ReportNum,
          name: item.RuleClassName
        }
      }
    )
    loading.value = false
    nextTick(() => {
      draw(dealData.slice(0, 10))
    })
  } catch (error) {
    loading.value = false
  }
}
initRuleLeftLists()
</script>

<style lang="scss" scoped>
#main {
  canvas {
    width: 300px;
    height: 300px;
  }
}
</style>
