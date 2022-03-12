<template>

    <div style="padding-top: 10px;">
        <div class="all-essay">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#17a4a942"
                    text-color="#000a6fb8"
                    hover-text-color="#000a6fb8"
                    active-text-color="black"
                    @select="handleSelect"
            >
                <el-menu-item index="new">最新文章</el-menu-item>
                <el-menu-item index="hot">热门文章</el-menu-item>
                <el-sub-menu index="type">
                    <template #title>标签分类</template>
                    <el-menu-item index="type1">item one</el-menu-item>
<!--                    后面实例定义一个数组来查询类型值-->
                </el-sub-menu>
                <el-menu-item index="more">More&#10148;</el-menu-item>
            </el-menu>
            <hr>
            <div class="essay" >
                <div class="essay-box" v-for="(detail,detail_) in essay[n]" :key="detail_">
                    <div class="essay-draw">
                        <img :src=detail.img alt="暂无图片">
                        <!--                图片-->
                    </div>

                    <div class="essay-liter" >
                        <router-link :to="'/essay_body?id='+detail.essay_id" >
                            <!--                链接-->
                            <p>{{detail.title}}</p>
                            <!--                题目-->
                            <a> {{detail.preface}}</a>
                            <!--                文本内容-->
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import axios from "axios";

    let n =ref('new');
    const activeIndex2 = ref('new');
    const handleSelect = (key: string, keyPath: string[]) => {
        n.value=key;
    };

    const essay = (await axios.get('/api/web/essay/essay_index')).data
    // const props=defineProps({
    //     essay:Object,
    // })


    // let essay = document.getElementsByClassName("essay");
    // let title = document.getElementsByClassName("title-txt");
    // for(let l=0;l<essay.length;l++){
    //     essay[l].style.display = "none";
    // }
    // essay[0].style.display = "flex";
    // title[0].style.border= "1px solid cornflowerblue";
    // title[0].style.color= "cornflowerblue";
    //
    //
    // let change=(n:number)=>{
    //     let essay = document.getElementsByClassName("essay");
    //     let title = document.getElementsByClassName("title-txt");
    //     for(let l=0;l<essay.length;l++){
    //         essay[l].style.display = "none";
    //         title[l].style.border= "";
    //         title[l].style.color= "";
    //     }
    //     essay[n].style.display = "flex";
    //     title[n].style.border= "1px solid cornflowerblue";
    //     title[n].style.color= "cornflowerblue";
    // }

</script>

<style lang="scss">
    .all-essay{

        background-color: white;
        min-width: 750px;
        width: 100%;
        max-width: 1000px;
        margin: auto;

    }
    .title{
        margin-left: 50px;
        padding-top: 10px;
        padding-bottom: 10px;

        display: flex;
        text-align: center;
        .title-txt{
            line-height: 30px;
            border-radius:15px;
            height: 30px;
            width: 80px;
        }
        .title-txt:hover{
            color: cornflowerblue;
        }

    }
    .essay{
        display: flex;
        margin:50px auto auto 2px;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .essay-box{
        border-radius:5px;
        background-color: aliceblue;
        display: flex;
        width: 390px;
        margin-bottom: 50px;
        height: 140px;
    }
    .essay-draw{
        width: 100px;
        height: 100px;
        margin: 20px auto auto 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .essay-liter{
        border-radius:5px;
        width: 260px;
        height: 100px;
        margin: auto;
        p{
            color: #2b3b4e;
            font-size: 16px;
            font-weight: 500;
            margin: 0 0 0 0;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow:ellipsis;
            overflow: hidden;
        }
        a{
            color: gray;
            margin: 10px 0 0 0;
            font-size: small;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow:ellipsis;
            overflow: hidden;
        }
    }
    .essay-liter:hover{
        background-color: rgba(218,250,255,1);
        p{
            color: #0080ff;
        }
    }

    @media screen and (max-width: 800px) {
        @import '../../assets/narrow.scss';
    }
</style>