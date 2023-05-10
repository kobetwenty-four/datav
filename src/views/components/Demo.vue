<template>
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else id="main" style="width: 500px; height: 350px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

// * 加载标识
const loading = ref<boolean>(true)
let currentIndex = ref()

onMounted(() => {
  cancelLoading()
  setTimeout(() => {
    var chartDom = document.getElementById('main')!
    var myChart = echarts.init(chartDom)
    var option: any

    option = {
      legend: {
        top: 'bottom'
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
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [20, 150],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
          ]
        }
      ]
    }

    option && myChart.setOption(option)

    currentIndex.value = -1
    //myChart.setOption(option);
    //console.log(option.series[0].data[0]);
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
    }, 1000)
  }, 600)
})
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<style lang="scss" scoped>
#main {
  canvas {
    width: 300px;
    height: 300px;
  }
}
</style>
