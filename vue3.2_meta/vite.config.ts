import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0',
    port:8080,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3001',
        rewrite:(path)=>path.replace(/^\/api/,''),
        //将页面内的/api重写为空值，只是一个标记手段
        ws:true,
        changeOrigin:true,
      }
    },
  },
  resolve:{
    alias:[{
        find:'@',
        replacement:resolve(__dirname,'src'),
      }]
  }//配置@引用
})
