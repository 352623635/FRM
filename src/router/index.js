// module
import {createApp} from "vue";
import VueRouter from 'vue-router'
import axios from "axios"

//css

//components
import Home from '../pages/home.vue'
import About from '../pages/about.vue'

// 绑定http
Vue.use(VueRouter)
Vue.prototype.$http = axios

//route
const router = new VueRouter({
    rotes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})


export default router
