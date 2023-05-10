<template>
  <!-- flex="~ col"  -->
  <dv-loading v-if="loading">Loading...</dv-loading>
  <div v-else w50rem h34rem justify-center items-center bg-dark class="task">
    <span class="title">任务监管</span>
    <div class="task-top">
      <dv-active-ring-chart
        :config="conf"
        :style="{ width: '300px', height: '300px' }"
      ></dv-active-ring-chart>
      <!-- :style="{ width: '33.33%', height: height }" -->
      <!-- :style="{ width: '300px', height: height }" -->
      <!-- <div flex="~ col" gap2 justify-center items-center> -->
      <div class="task-word" justify-center items-center>
        <div class="tw-one">
          <div>
            <span>运行中: </span>
            <span style="color: #50e3c2">15个</span>
          </div>
          <div>
            <span>等待中：</span>
            <span style="color: #f58220">37个</span>
          </div>
        </div>
        <div class="tw-two">
          <div>
            <span>成功：</span>
            <span style="color: #00ff00">81个</span>
          </div>
          <div>
            <span>失败： </span>
            <span style="color: #ef4136">3个</span>
          </div>
        </div>
        <div class="task-bottom">
          <div>
            <span>整体分析耗时：</span>
            <span style="color: #00ff00">17 h 02 min</span>
          </div>
        </div>
        <!-- <div>
        <span text-white>城市：</span>
        <input v-model="cityName" demo-input />
      </div>
      <div>
        <span text-white>Value：</span>
        <input v-model="cityValue" type="number" demo-input />
      </div>
      <div>
        <button btn @click="addData">添加数据</button>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
// * 加载标识
const loading = ref<boolean>(true)

// todo 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
// const props = defineProps({
//   height: {
//     type: String,
//     // default: '240px'
//     // default: '15rem'
//     default: '450px'
//   }
// })
const conf = reactive({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: 'pink'
  },
  color: ['#50e3c2', '#f58220', '#00ff00', '#ef4136'],
  showOriginValue: false,
  data: [
    {
      name: '运行中',
      value: 98
    },
    {
      name: '等待中',
      value: 150
    },
    {
      name: '成功',
      value: 62
    },
    {
      name: '失败',
      value: 54
    }
  ]
})
onMounted(() => {
  cancelLoading()
})
// const addData = () => {
//   if (!cityName.value || !cityValue.value) return

//   conf.data.push({
//     name: cityName.value,
//     value: parseInt(cityValue.value.toString())
//   })
// }

const { data } = toRefs(conf)
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
      padding: 50px 20px 70px 0;
      .tw-one {
        display: flex;
        div:nth-child(2) {
          // padding-left: 2rem;
          padding-left: 20px;
        }
      }

      .tw-two {
        display: flex;
        div:nth-child(2) {
          // padding-left: 3rem;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
