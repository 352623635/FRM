<template>
    <div style="width: 100%;padding-top: 10px">
        <div class="games-border">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#17a4a942"
                    text-color="#000a6fb8"
                    hover-text-color="#000a6fb8"
                    active-text-color="black"
            >
                <el-menu-item index="new">放松一下</el-menu-item>
                <el-menu-item index="more">More&#10148;</el-menu-item>
            </el-menu>
            <hr>
            <div class="games-box">
                <div style="display: flex;justify-content: center">
                    <div class="games">
                        <div class="change left1">
                            <button disabled="disabled" type="button" class="left1_button" @click="l_change(l--)">
                                <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23007aff'/%3E%3C/svg%3E" alt="图片失效">
                            </button>

                        </div>
                        <div class="game_box">
                            <div class="game" v-for="(game,index) in game_data" :key="index.game">
                                <a :href="game.url">
                                    <div class="game-child">
                                        <img :src="game.img" alt="暂无图片">
                                    </div>
                                    <p>{{game.name}}</p>
                                </a>
                            </div>
                        </div>

                        <!-- 如果需要导航按钮 -->
                        <div class="change right1">
                            <button type="button" class="right1_button" @click="l_change(l++)">
                                <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'%3E%3Cpath d='M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23007aff'/%3E%3C/svg%3E" alt="图片失效">
                            </button>

                        </div>
                    </div>
                </div>
                <div style="max-width: 1000px;margin: 10px auto auto auto;padding-top:10px;min-width: 750px;text-align: center">
                    <button @click="l_change(l=1)">第一页</button>
                    <a>共{{n+((m!==0)-0)}}页&nbsp;</a>
                    <a>当前第<label>
                        <input @keyup.enter='l_change(l=Number($event.target.value))' style="width: 20px" :value="l">
                    </label>页</a>
                    <button @click="l_change(l=n+((m!==0)-0))">尾页</button>
                    <!--                分页器-->
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import store from '@/store';
import {ref} from "vue";

    export default {
        name: "Games",
        props: {
        },
        setup(){
            const activeIndex2 = ref('new');
            return{
                activeIndex2
            }
        },
        data(){
            return{
                l:1,//page为l
                game_data:store.state.game_data,
                m:Number,
                n:Number
            }
        },
        mounted() {
            this.$data.m =this.$data.game_data.length%3;
            this.$data.n = (this.$data.game_data.length-this.$data.game_data.length%3)/3;
            let game=document.getElementsByClassName("game");
            for(let i = 0;i<this.$data.game_data.length;i++){
                game[i].style.display="none";
            }
            game[0].style.display="block";
            game[1].style.display="block";
            game[2].style.display="block";
        },
        methods:{
            l_change(){
                console.log(this.$data.l);
                let n = (this.$data.m!==0)-0;//布尔值-0转化为数字
                let game=document.getElementsByClassName("game");
                for(let  i=0;i<this.$data.game_data.length;i++){
                    game[i].style.display="none";
                }//全隐藏
                document.getElementsByClassName("left1_button")[0].disabled = (this.$data.l === 1);
                document.getElementsByClassName("right1_button")[0].disabled= (this.$data.l === this.$data.n+n);
                if(this.$data.l === this.$data.n+n){
                    if(n){
                        n=this.$data.m;
                    }else {
                        n=3;
                    }
                    for(let  i=0;i<n;i++){
                        game[3*(this.$data.l-1)+i].style.display="block";
                    }//局部显示
                }else{
                    game[3*this.$data.l-1].style.display="block";
                    game[3*this.$data.l-2].style.display="block";
                    game[3*this.$data.l-3].style.display="block";
                }
            },
        },
    }

</script>

<style lang="scss">
    .games-border{
        background-color: white;
        min-width: 750px;
        max-width: 1000px;
        margin: auto;
        padding-bottom: 20px;
        .games-box{

        }
        .games{
            width: 100%;
            max-width: 1000px;
            margin: 50px auto auto 2px;
            height: 250px;
            display: flex;
            text-align: center;
            justify-content: space-around;
            align-content: center;
            min-width: 750px;
            .game_box{
                max-width: 900px;
                width: 90%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                .game{
                    background-color: rgba(0,0,0,0.05);
                    display: none;
                    height: 100%;
                    width: 28%;
                    margin: auto 10px auto 10px;
                    p{
                        color: cornflowerblue;
                    }
                    .game-child{
                        height: 150px;
                        width: 150px;
                        margin: 50px auto auto auto;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            .change{
                width: 50px;
                height: 50px;
                margin: auto;
                z-index:9;
            }
            button{
                width: 50px;
                height: 50px;
                text-align: center;
            }
            .left1{
                float: left;
            }
            .right1{
                float: right;
            }
            .to{
                margin: auto;
                width: 50px;
                height: 50px;

            }
            img{

                margin: auto;
                width: 100%;
                height: 100%;
            }
        }
    }


    @import "src/assets/global.scss";
</style>