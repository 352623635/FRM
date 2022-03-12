<template>
    <div class="cri_box">
        <div class="head" v-if="type==='index'">
            <div style="background-color: white;margin:auto;width:64px;display:flex;flex-direction: column;justify-content: center;align-items: center;">
                <el-avatar :src="'http://localhost:3001'+user.avatar">

                </el-avatar>

                <span style="font-size: small; margin: 2px auto;height: 20px;line-height: 20px;color: darkturquoise">
                {{user.name}}
            </span>
            </div>
        </div>
        <div class="liter">
            <span>
                <a class="liter_txt">{{criterion[0].text}}</a>
            </span>
            <!--                文本内容-->
            <a class="liter_time">{{criterion[0].update_time.slice(0,10)}}</a>
        </div>
    </div>

</template>

<script setup>
    import request from "../../utils/request";
    import { ref } from "vue";
    import {defineProps} from "@vue/runtime-core";

    const props=defineProps({
        id:Number,type:String
    });
    const criterion=(await request.get('/web/pour/pour_cri?id='+props.id)).data;
    const user=(await request.post('/web/user',{"user":criterion[0].uid})).data;
    console.log(user)


</script>

<style scoped lang="scss">
    .cri_box{
        width: 100%;
        display: flex;
    }
    .head{
        width: 80px;
        height: 65px;

    }
    .liter{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #eeeeee;
        border-radius:5px;
        height: 65px;
        margin: auto;
        .liter_txt{
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
        .liter_time{
            color: lightskyblue;
            font-size: 8px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow:ellipsis;
            overflow: hidden;
        }
    }
    .liter:hover{
        background-color: rgba(218,250,255,1);
    }
    @media screen and (min-width: 750px) {
        @import '../../assets/broad.scss';
    }
    @media screen and (max-width: 750px) {
        @import '../../assets/narrow.scss';
    }
</style>