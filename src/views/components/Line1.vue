<template>
  <dv-loading v-if="loading">Loading...</dv-loading>

  <div v-else id="line" style="width: 500px; height: 350px"></div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getIncrementLists } from '@/script/api/line'

// * 加载标识
const loading = ref<boolean>(true)
// onMounted(() => {
//   cancelLoading()
// })

const initChart = (successData: any, failData: any, totalData: any) => {
  console.log(successData, failData, totalData)

  var chartDom = document.getElementById('line')!
  var myChart = echarts.init(chartDom)
  var option: any
  const colors = ['#00ff00', '#ef4136', '#ffd400']
  option = {
    animationDuration: 10000,
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      show: false,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        //x轴文字的配置
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisPointer: {
        label: {
          backgroundColor: 'transparent'
        }
      }
      //   data: [
      //     '2015-1',
      //     '2015-2',
      //     '2015-3',
      //     '2015-4',
      //     '2015-5',
      //     '2015-6',
      //     '2015-7',
      //     '2015-8',
      //     '2015-9',
      //     '2015-10',
      //     '2015-11',
      //     '2015-12'
      //   ]
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          //x轴文字的配置
          show: true,
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '成功',
        type: 'line',
        xAxisIndex: 0,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        dimensions: ['time', 'success', 'type'],
        encode: {
          x: 'time',
          label: ['type', 'success'],
          itemName: 'time',
          tooltip: ['success']
        },
        symbol: 'circle',
        symbolSize: 0,
        // data: [
        //   ['2023-04-11', 123, '成功'],
        //   ['2023-04-12', 5.9, '成功'],
        //   ['2023-04-13', 12, '成功'],
        //   ['2023-04-14', 50.9, '成功'],
        //   ['2023-04-15', 223, '成功'],
        //   ['2023-04-16', 511.9, '成功'],
        //   ['2023-04-17', 23, '成功'],
        //   ['2023-04-18', 51.9, '成功']
        // ],
        data: successData,
        endLabel: {
          show: true,
          color: '#fff',
          fontSize: 14
        },

        labelLayout: {
          moveOverlap: 'shiftY'
        }
      },
      {
        name: '失败',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'fail', 'type'],
        emphasis: {
          focus: 'series'
        },
        endLabel: {
          show: true,
          color: '#fff',
          fontSize: 14
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        symbol: 'circle',
        symbolSize: 0,
        encode: {
          x: 'time',
          label: ['type', 'fail'],
          itemName: 'time',
          tooltip: ['fail']
        },
        // data: [
        //   ['2023-04-11', 1, '失败'],
        //   ['2023-04-12', 10, '失败'],
        //   ['2023-04-13', 120, '失败'],
        //   ['2023-04-14', 10.9, '失败'],
        //   ['2023-04-15', 123, '失败'],
        //   ['2023-04-16', 111.9, '失败'],
        //   ['2023-04-17', 223, '失败'],
        //   ['2023-04-18', 123.9, '失败']
        // ],
        data: failData
      },
      {
        name: '总数',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        dimensions: ['time', 'total', 'type'],
        encode: {
          x: 'time',
          label: ['type', 'total'],
          itemName: 'time',
          tooltip: ['total']
        },
        symbol: 'circle',
        symbolSize: 0,
        endLabel: {
          show: true,
          color: '#fff',
          fontSize: 14
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        data: totalData
      }
    ]
  }
  option && myChart.setOption(option)
  setInterval(function () {
    myChart.clear()
    myChart.setOption(option)
  }, 11000)
}
// const cancelLoading = () => {
//   setTimeout(() => {
//     loading.value = false
//     nextTick(() => {
//       initChart()
//     })
//   }, 500)
// }

const initData = async () => {
  try {
    const res = await getIncrementLists()
    // 0:total,1:success,2:fail
    let successData: any[] = []
    let failData: any[] = []
    let totalData: any[] = []
    // console.log(res)

    // res.forEach((element: any) => {
    //   successData.push([element.time, element.success])
    // })
    // res.forEach((element: any) => {
    //   failData.push([element.time, element.fail])
    // })
    // res.forEach((element: any) => {
    //   totalData.push([element.time, element.total])
    // })
    // console.log(successData)

    res[1].forEach((element: any) => {
      successData.push([element.time, element.success, element.type])
    })
    res[2].forEach((element: any) => {
      failData.push([element.time, element.fail, element.type])
    })
    res[0].forEach((element: any) => {
      totalData.push([element.time, element.total, element.type])
    })
    loading.value = false
    nextTick(() => {
      initChart(successData, failData, totalData)
    })
  } catch (error) {
    loading.value = false
  }
}
initData()
</script>

<style lang="scss" scoped>
#main {
  canvas {
    width: 300px;
    height: 300px;
  }
}
</style>
