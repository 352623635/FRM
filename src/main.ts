// 引入
import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index";
import element from "element-plus"
import 'element-plus/theme-chalk/index.css'
import '../src/assets/css/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import {ElButton} from "element-plus";


const app = createApp(App)
// @ts-ignore
app.use(element).use(router)
app.mount('#app')
app.use(ElButton)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
