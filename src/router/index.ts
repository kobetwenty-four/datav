import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue') // 懒加载组件
    }
]

const base_url = import.meta.env.BASE_URL; //获取vite.config.js配置的base,默认是根目录/

const router = createRouter({
    history: createWebHashHistory(base_url),
    routes
})

export default router