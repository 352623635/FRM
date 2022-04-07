import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store} from 'vuex'

import request from "@/utils/request";
//vue3安装axios方式为npm add axios而不是vue2的方式


//除了作为仓库之外，还可以作为变量中转站

export default createStore({
    state:{
        host:'http://127.0.0.1:3001',
        count:0,
        n:4,
        session:window.sessionStorage,
        logo : {
            "href":"",
            "url":"https://ibio.cqupt.edu.cn/picture/logo.png"
        },
        tabbar : [
            {
                "name":"首页",
                "url":"/"
            },
            {
                "name":"情绪识别",
                "url":""
            },
            {
                "name":"心情故事",
                "url":""
            },
            {
                "name":"疾病预测",
                "url":""
            },
            {
                "name":"工具",
                "url":0,
                "child":[{
                    "name":"iProx",
                    "url":"https://www.iprox.org/"
                },
                    {
                        "name":"OD",
                        "url":"https://www.omicsdi.org/"
                    }
                ]
            }
        ],
        banner : [
            {
                "path":"https://ibio.cqupt.edu.cn/picture/banner1.png",
                "link":"",
                "video":""
            },
            {
                "path":"https://ibio.cqupt.edu.cn/picture/banner2.png",
                "link":"https://www.iprox.org/",
                "video":""
            },
            {
                "path":"https://ibio.cqupt.edu.cn/picture/banner3.png",
                "link":"https://www.omicsdi.org/",
                "video":""
            },
        ],
        essay : [],
        footer : [
            {
                "VX":[
                    {
                        "title":"重庆邮电大学",
                        "img":""
                    },
                    {
                        "title":"生物信息学院",
                        "img":""
                    },
                    {
                        "title":"大数据实验室",
                        "img":""
                    },
                ],
                "about":[
                    {
                        "title":"",
                        "url":""
                    },
                    {
                        "title":"",
                        "url":""
                    },
                    {
                        "title":"",
                        "url":""
                    },
                    {
                        "title":"",
                        "url":""
                    },
                ],
                "link":[
                    {
                        "title":"重庆邮电大学",
                        "url":"http://www.cqupt.edu.cn/"
                    },
                    {
                        "title":"生物信息学院",
                        "url":"http://swxy.cqupt.edu.cn/"
                    },
                    {
                        "title":"iPox",
                        "url":"https://www.iprox.org/"
                    },
                    {
                        "title":"OmicsDi",
                        "url":"https://www.omicsdi.org/"
                    },
                    {
                        "title":"原网页",
                        "url":"http://172.16.98.98/liufaping/world/index/index.php"
                    },


                ],
                "icp":{
                    "gov":"渝公网安备：xxxxxx",
                    "govimg":"https://lapp.xinli001.com/images/website-www/guohui.png",
                    "urlG":"",
                    "BeiAn":"渝ICP备:xxxxx",
                    "urlB":""

                }
            }
        ],
        game_data:[
            {
                "name":"迷宫",
                "img":"http://8.130.10.7:3001/maze.png",
                "url":"https://www.17sucai.com/pins/demo-show?id=7202&st=rLC5H3vwTdnTkGEpLVu38g&e=1647561719"
            },
            {
                "name":"砸地鼠",
                "img":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fis3.mzstatic.com%2Fimage%2Fthumb%2FPurple49%2Fv4%2F56%2F01%2Fef%2F5601ef11-d7db-64ee-365e-dd0247bee915%2Fsource%2F512x512bb.jpg&refer=http%3A%2F%2Fis3.mzstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644385010&t=93ff32283bce3f38a8476aec90541ff3",
                "url":""
            },
            {
                "name":"周公解梦",
                "img":"https://img1.baidu.com/it/u=1186502159,3689115975&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "url":""
            },
            {
                "name":"成语接龙",
                "img":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fnospd%2Fupload%2Fupc%2Ftx%2Fpcdlc%2F2103%2F14%2Fc10%2F256992567_1615669152635.png&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644385133&t=13101681eb953a5b16b16c0f96f8cdd0",
                "url":""
            },
            {
                "name":"猜字谜",
                "img":"",
                "url":""
            },

            {
                "name":"未知",
                "img":"",
                "url":""
            },
            {
                "name":"未知",
                "img":"",
                "url":""
            },
            {
                "name":"未知",
                "img":"",
                "url":""
            },

        ],
        //根据一般逻辑，查询分为3步=>接口传入用户id，返回用户时间表和时间联合查询相应时间的记录
        //所以此处模拟返回的数据，为，时间，记录；实际项目应远比此处复杂
        mood: {},

    },
    mutations:{
        setCount(state,count:number){
            state.count=count;
        },
        async Login(state,data){
            if(data.data.code == 200){
                state.session.setItem('data',data.data.data);
                state.session.setItem('name',data.data.data.name);
                state.session.setItem('avatar',data.data.data.avatar);
                state.session.setItem('id',data.data.data.id);

                state.session.setItem('token',data.data.data.ms_token);
                const date =(await request.post('/web/user/mood',{"user":sessionStorage.id})).data.date;
                if(date==''){
                    state.session.setItem('mood','false');
                }else {
                    state.session.setItem('mood','true');
                }
                console.log(sessionStorage.mood);
                const page = (location.href.split('/'))[(location.href.split('/')).length-1];

                window.location.href='/';
            }else {
                alert(data.data.msg);
            }
        },
        Register(state,data){
            if(data.data.code == 200){
                alert('注册成功，点击跳转登录！')
                window.location.href='/#/login';
            }else {
                alert(data.data.msg);
            }
        },
        Essay(state,data){
            state.essay=data.data;
            console.log(state.essay)
        },
        Mood(state,data){
            state.mood=data.data;
            console.log(data)
        },
    },
    actions:{
        postRegister({commit},{name,pwd,code,gender,user,avatar}){
            request.post('/web/register',
                {name:name,pwd:pwd,code:code,gender:gender,user:user,avatar:avatar}).then(
                res=>commit('Register',res)).catch(function (error) {
                    console.log(error)
                }
            )
        },
        postLogin({commit},{user,pwd}){
            request.post('/web/login',
                {user:user,pwd:pwd}).then(
                res=>commit('Login',res)).catch(function (error) {
                    console.log(error)
                }
            )
        },
        getEssay({commit}){
            request.get('/web/essay/essay_index').then(
                res=>commit('Essay',res)).catch(err=>console.log(err)
            );
        },
        postMood({commit},{user}){
            request.post(
                '/web/user/mood',{user:user}
            ).then(res=>commit('Mood',res)).catch(err=>console.log(err));
        }
    },
    getters:{
        get_count(state){
            return state.count
        },
        get_essay(state){
            return state.essay
        },
        post_mood(state){
            return state.mood
        }
    }
})

