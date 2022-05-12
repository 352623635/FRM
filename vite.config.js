import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true,
        host: 'localhost',
        port: 3000,
        // proxy: {
        // '/api': {
        //     target: '',
        //     changeOrigin: true,
        //     rewrite: path => path.replace(/^\/api/, '')
    }
    ,
    plugins: [vue()]
})
