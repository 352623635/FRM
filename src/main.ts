// 引入
import {createApp} from 'vue'
import App from './App.vue'
import element from 'element-plus'
import '../elment'
import router from "./router/index";


const app = createApp(App)
app.use(element).use(router)
app.mount('#app')

