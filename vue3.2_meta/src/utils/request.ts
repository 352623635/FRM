import axios from "axios";

let request= axios.create({
    baseURL:'/api',
    timeout:6000
});

request.interceptors.request.use(
    (config:any)=>{
        if(sessionStorage.token){
            config.headers.token=sessionStorage.token;
        }
        return config;
    },error => {
        console.log(error);
        return error;
    }
);
export default request;
