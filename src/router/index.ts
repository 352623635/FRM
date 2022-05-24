// 引入模块
import {createWebHashHistory, createRouter} from "vue-router";
import routes from "./routes";

//创建路由
// @ts-ignore
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//导出路由
export default router
