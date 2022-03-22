import {createRouter,createWebHashHistory,Router,RouteRecordRaw,RouterHistory,RouterOptions} from "vue-router";
// 路由规则
import Hello from '@/components/HelloWorld.vue'
import {shallowRef} from "@vue/runtime-core";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component:()=>import('@/components/views/Index.vue')
    },
    {
        path: '/test',
        component:()=>import('@/components/views/Test.vue')
    },
    {
        path: '/test1',
        component:()=>import('@/components/views/Test1.vue')
    },
    {
        path: '/test2',
        component:()=>import('@/components/views/Test2.vue')
    },
    {
        path: '/login',
        component:()=>import('@/components/views/Login.vue')
    },
    {
        path: '/register',
        component:()=>import('@/components/views/Register.vue')

    },
    {
        path: '/essay_body',
        component:()=>import('@/components/views/Essaybody.vue')
    },
    {
        path: '/user_self',
        component:()=>import('@/components/views/Userself.vue')
    },
    {
        path: '/update_self',
        component:()=>import('@/components/views/Updateself.vue')
    },
    {
        path: '/essay_upload',
        component:()=>import('@/components/views/Essayupload.vue'),

    },
    {
        path: '/essay_update',
        component:()=>import('@/components/views/Essayupdate.vue')
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