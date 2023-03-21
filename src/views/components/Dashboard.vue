
<template>
  <div class="eacharts1" ref="eacharts1" style="width: 500px;height: 500px;"></div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  getCurrentInstance
} from 'vue'
const { proxy }: any = getCurrentInstance()
const decorationColors = ['#568aea', '#000000']
const title = '可视化大屏项目示例'
const eacharts1 = ref(null)
const renderChart = () => {
  var myChart = proxy.$echarts.init(eacharts1.value);
  myChart.setOption({
    title: [
      {
        text: '极坐标柱状图标签'
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    radiusAxis: {
      max: 4
    },
    angleAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd'],
      startAngle: 75
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    },
    animation: false
  })
};
onMounted(() => {
  renderChart()
})
</script>
