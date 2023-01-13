import {createRouter,createWebHashHistory,Router,RouteRecordRaw,RouterHistory,RouterOptions} from "vue-router";
// 路由规则
import Hello from '@/components/HelloWorld.vue'
// import {shallowRef} from "@vue/runtime-core";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component:()=>import('@/components/views/Index.vue')
    },

]
// 路由模式：这里使用的是 hash 模式
const history: RouterHistory = createWebHashHistory('/')
// Vue Router 实例的参数选项
const routerOptions: RouterOptions = { history, routes }
// Vue Router 实例
const router: Router = createRouter(routerOptions)
// 导出
export default router