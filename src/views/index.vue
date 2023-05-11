<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <!-- <dv-loading v-if="loading">Loading...</dv-loading> -->
      <!-- v-else -->
      <div class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColors" />
            <div class="title">
              <span class="title-text">{{ title }}</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
              <!-- <dv-decoration-11 style="width: 400px; height: 60px" class="dv-dec-6">
                <div color-green font-600 bg="~ dark/0">
                  <span class="title-text">{{ title }}</span>
                </div>
              </dv-decoration-11> -->
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColors"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-3 react-l-s">
              <span class="react-before"></span>
              <span class="text">{{ subtitle[0] }}</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">{{ subtitle[1] }}</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">{{ subtitle[2] }}</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <!-- <div class="react-right bg-color-blue mr-3"> -->
            <div class="react-right mr-3" style="background-color: #0f1325">
              <span class="text fw-b">{{ subtitle[3] }}</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">
                {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
                {{ timeInfo.dateDay }}
              </span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12 ref="border12" class="border12">
                <!-- <Task :height="data > 4 ? '25rem' : '15rem'" /> -->
                <!-- <Task :height="data > 4 ? '240px' : '240px'" /> -->
                <Task />
                <!-- <dashboard /> -->
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12 class="border12">
                <!-- <Person :height="data > 4 ? '25rem' : '15rem'" /> -->
                <!-- <center-left2 /> -->
                <Person />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12 class="border12 serverPage">
                <!-- <Server @getLength="getLength" /> -->
                <!-- <center-left2 /> -->
                <Server />
              </dv-border-box-12>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-12 class="ruleFather border12">
              <!-- <div class="title"> -->
              <span class="ruleTitle">规则监管</span>
              <!-- </div> -->
              <div class="ruleChart">
                <RuleLeft class="one" />
                <Line class="two" />
                <Rule />
              </div>
              <!-- <bottom-left /> -->
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--index.vue-->
<script lang="ts" setup>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
  computed
} from 'vue'
//引入封装好的
import { formatTime } from '@/script/utils/index'
// 引入封装好的屏幕适配方法
import useDraw from '@/script/utils/useDraw'
//引入封装的标题日期
import { WEEK, title, subtitle, moduleInfo } from '@/constant/index'
//页面组件
import dashboard from './components/Dashboard.vue' //demo 废弃
import Task from './components/Task.vue'
import Person from './components/Person.vue'
import Rule from './components/Rule1.vue'
import Server from './components/Server.vue'
import RuleLeft from './components/RuleLeft1.vue'
import Line from './components/Line1.vue'
interface IState {
  setInterval: ReturnType<typeof setInterval> | null
  dateDay: string
  dateYear: string
  dateWeek: string
  decorationColors: string
}
// * 加载标识
const loading = ref<boolean>(true)
// * 时间内容
const timeInfo = reactive<IState>({
  setInterval: null,
  dateDay: '',
  dateYear: '',
  dateWeek: '',
  decorationColors: '#ff00ff'
})
const data = ref()
const border12 = ref()

// 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

// 生命周期
onMounted(() => {
  // console.log(border12.value, 'bbbbbbbbbb')
  setTimeout(() => {
    border12.value.initWH()
  }, 1000)
  cancelLoading()
  handleTime()
  // todo 屏幕适应
  windowDraw()
  calcRate()
})

onUnmounted(() => {
  unWindowDraw()
  clearInterval(timeInfo.setInterval!)
})

// methods
// todo 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// todo 处理时间监听
const handleTime = () => {
  timeInfo.setInterval = setInterval(() => {
    const date = new Date()
    timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
    timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
    timeInfo.dateWeek = WEEK[date.getDay()]
  }, 1000)
}

const getLength = (val: number) => {
  console.log(val)
  data.value = val
}
// watch(
//   () => data.value?.length,
//   val => {
//     alert(1)
//     cancelLoading()
//     handleTime()
//     windowDraw()
//     calcRate()
//   }
//   // { immediate: true }
// )
const { decorationColors } = toRefs(timeInfo)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.content-box {
  // width: 100%;
  // display: flex;
  // justify-content: space-between;
}
.bottom-box {
  // margin-top: 30px;
  margin-top: 30px;
  height: 450px;
  // height: calc(100vh);
  :deep(.border-box-content) {
    display: flex;
    flex-direction: row;
  }
}
.ruleFather {
  :deep(.border-box-content) {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    .ruleTitle {
      // padding: 2rem 0 1rem 1rem;
      // padding-left: 10px;
      // padding-top: 10px;
      // padding: 20px 0 0 20px;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .ruleChart {
      padding-top: 40px;
      height: 100%;
      display: flex;
      flex-direction: row;
      .one,
      .two {
        flex: 0 0 33.33%;
      }
    }
  }
}
.border12 {
  // width: 33.33%;
  height: 410px;
}
.serverPage {
  // overflow-y: auto;
}
</style>
