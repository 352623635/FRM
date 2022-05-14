// 引入
import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index";
import element from "element-plus"
import 'element-plus/theme-chalk/index.css'
import '../src/assets/css/global.css'


const app = createApp(App)
app.use(element)
app.use(router)
app.mount('#app')
