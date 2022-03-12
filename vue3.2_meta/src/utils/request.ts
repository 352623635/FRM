import axios from "axios";
import store from "@/store";
let request= axios.create({
    baseURL:store.state.host+":3001",
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
