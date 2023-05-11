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
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return point
      }
    },
    legend: {
      show: false
    },
    series: [
      {
        // name: '姓名',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: dataArg,
        label: {
          show: false
        }
      }
    ]
  }
  //   function genData(count) {
  //     // prettier-ignore
  //     const nameList = [
  //         '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
  //     ];
  //     const legendData = []
  //     const seriesData = []
  //     for (var i = 0; i < count; i++) {
  //       var name =
  //         Math.random() > 0.65
  //           ? makeWord(4, 1) + '·' + makeWord(3, 0)
  //           : makeWord(2, 1)
  //       // legendData.push(name);
  //       seriesData.push({
  //         // name: name,
  //         value: Math.round(Math.random() * 100000)
  //       })
  //     }
  //     return {
  //       // legendData: legendData,
  //       seriesData: seriesData
  //     }
  //     function makeWord(max, min) {
  //       const nameLen = Math.ceil(Math.random() * max + min)
  //       const name = []
  //       for (var i = 0; i < nameLen; i++) {
  //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)])
  //       }
  //       // return name.join('');
  //     }
  //   }

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
