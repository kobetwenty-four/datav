import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
//import dataV from '@jiaminghi/data-view';//引入dataV可能如果启动报错看这个https://blog.csdn.net/qq_54753561/article/details/125583526
import echarts from './components/echarts';//echarts 根据官网封装的
import DataVVue3 from '@kjgl77/datav-vue3';//https://datav-vue3.netlify.app/Guide/index.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95

// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'

const app = createApp(App)


app.config.globalProperties.$echarts = echarts
app.use(DataVVue3)
app.use(store).use(router).mount('#app')
