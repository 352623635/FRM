<template>
    <div class="login">
        <div class="login-box">
            <div class="login-img">
                <img alt="暂无图片" src="">
            </div>
            <div class="name_pwd">
                <label>
                    <input v-model="user" class="l-txt" placeholder="请输入账号">
                </label>
                <label>
                    <input v-model="pwd" class="l-txt" placeholder="请输入密码" @keyup.enter.native="login" type="password">
                </label>
            </div>
            <div class="cap none">
                <label>
                    <input class="code" placeholder="请输入验证码"  @keyup.enter.native="login" type="text">
                </label>

                <div class="cap-draw">
                    <canvas id="draw" height="50" width="50" @click="cap()"></canvas>
                </div>
            </div>
            <div class="login-button">
                <button type="button" @click="login()">
                    登录
                </button>
                <button type="button" @click="register()">
                    切换为注册
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>
    import store from '@/store';
    import {ref,onMounted} from 'vue';
    let chance=ref(3);
    onMounted(()=>{
        cap();
    });
    let code=ref();
    let user=ref();
    let pwd=ref();
    const register=(()=>{
        window.location.href='/#/register'
    })
    const UserDetails = {
        beforeRouteEnter (to, from, next) {
            next(vm => {
                console.log(to,from,next)
            })
        }
    }

    const cap=()=> {
            const arrays = ['1','2','3','4','5','6','7','8',
                'a','b','c','d','e','f','g','h','i','j',
                'k','m','n','o','p','q','r','s','t',
                'u','v','w','x','y','z',
                'A','B','C','D','E','F','G','H','J',
                'K','L','M','N','P','R','S','T',
                'U','V','W','X','Y','Z'];
            code.value='';// 重新初始化验证码
            for(let i = 0; i<4; i++){
                // 随机获取一个数组的下标
                let x = 0;
                let r = parseInt(Math.random()*arrays.length);
                code.value += arrays[r];
            }
            const draw = document.getElementById("draw");
            const context = draw.getContext("2d");
            draw.width = 50;
            context.font="italic 18px Arial";
            context.textAlign= "center";
            context.textBaseline= "middle";
            context.beginPath();
            context.fillText(code.value,25,25);
            const x = parseInt(Math.random()*50);
            const y = parseInt(Math.random()*50);
            const x1 = parseInt(Math.random()*50);
            const y1 = parseInt(Math.random()*50);
            const x2 = parseInt(Math.random()*50);
            const y2 = parseInt(Math.random()*50);
            const x3 = parseInt(Math.random()*50);
            const y3 = parseInt(Math.random()*50);
            context.lineWidth= 2;
            context.strokeStyle = "green";
            context.moveTo(x,y);
            context.lineTo(x1,y1);
            context.stroke();
            context.lineWidth= 4;
            context.strokeStyle = "green";
            context.moveTo(x2,y2);
            context.lineTo(x3,y3);
            context.stroke();
        };
    const login=()=>{
        let check_code = document.getElementsByClassName("code");
        let none = document.getElementsByClassName("none");
        if(chance.value===0||chance.value===-1){
          none[0].style.display ='block';
        }
        // let n = "0000"+Math.round(Math.random()*9999);
        // const random = n.substr(n.length-4,n.length);
        if(chance.value > -1){
            chance.value--;
            console.log(chance.value);
            store.dispatch("postLogin",
                {
                    user:user.value,
                    pwd:pwd.value});
            console.log(user.value,pwd.value)
        }else {
            if (check_code[0].value !== undefined){
                if (check_code[0].value.toLowerCase() === code.value.toLowerCase()){
                    store.dispatch("postLogin",
                        {
                            user:user.value,
                            pwd:pwd.value});
                  cap();
                }else {
                    cap();
                    alert("验证码错误")
                }
            }
        }//控制错误次数出现验证码，实际项目判断条件应该存储在数据库并且可以从前端进行改变；
    };


</script>

<style lang="scss" scoped>
    .login {
        text-align: center;
        width: 100%;
        height: 450px;
        padding-top: 20px;
        .login-img{
            width: 100px;
            height: 100px;
            margin: 50px auto auto auto;
        }
        .login-box {
            border-radius: 5px;
            margin: 30px auto 50px auto;
            height: 350px;
            width: 250px;
            border:3px solid cornflowerblue;
            box-shadow: 10px 10px 5px #888888;
            display: block;
            .cap{
                width: 170px;
                height: 46px;
                margin: auto;
                input{
                    height: 30px;
                    margin-top: 10px;
                    width: 107px;
                    float: left;
                }
                button{
                    height: 30px;
                    width: 45px;
                    margin:13px 0 auto 10px;
                }
                .cap-draw{
                    height: 50px;
                    canvas{
                        background-color: gray;
                        margin: -5px -15px auto auto;
                    }
                }
                
            }
            .none{
                display: none;
            }
        }

        .register {
            margin: 30px auto 50px auto;
            height: 350px;
            justify-content: center;
            width: 250px;
            border:3px solid cornflowerblue;
            box-shadow: 10px 10px 5px #888888;
            border-radius: 5px;
            display: none;
            .cap{
                width: 170px;
                height: 46px;
                margin: auto;
                input{
                    height: 30px;
                    margin-top: 10px;
                    width: 107px;
                    float: left;
                }
                button{
                    height: 30px;
                    width: 45px;
                    margin:13px 0 auto 10px;
                }
            }
        }
    }
    .name_pwd{
        margin: auto;
        width: 250px;
        .l-txt{
            height: 30px;
            margin-top: 10px;
        }
    }
    .login-button{

        button{
            margin-top: 10px;
            height: 30px;
            width: 85px;
        }
    }

</style>