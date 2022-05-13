// 引入模块
import {createWebHashHistory, createRouter} from "vue-router";

// 配置路由
const routes = [
    {
        path: '/',
        name:'index',
        title:'首页',
        component:()=>import("../components/home.vue")
    }
]

//创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//导出路由
export default router
