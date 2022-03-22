<template>
    <div class="line_">
        <el-carousel :height="400+'px'" :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,banner_) in banner" :key="banner_">
                <el-image
                        :src="item.path"
                        fit="scale-down"
                        style="width: 100%"
                ></el-image>
            </el-carousel-item>
        </el-carousel>

    </div>

<!--    <video width="100%" height="100%" autoplay="autoplay" loop="" muted="muted"  preload="auto" class="slider-video" style="width:100%; height:100%">-->
<!--        <source :src=draw.video type="video/mp4">-->
<!--    </video>-->
</template>

<script setup>
import {ref} from 'vue'
import {defineProps} from "@vue/runtime-core";

const props=defineProps({
    banner: Object,
})


</script>

<style lang="scss" scoped>
    ::v-deep .el-carousel__button{
        background-color: #f00;
    }
    .el-carousel{
        --el-carousel-arrow-size:60px;
        --el-carousel-arrow-font-size:60px
    }
    ::v-deep .el-carousel__arrow{
        color: #006dffc7;
        background-color: #4e2b2b00;
    }
    .line_{

        padding-top: 20px;
        width: 100%;
        margin: auto;
        height: auto;
        text-align: center;

        min-height: 400px;
    }
    .draw{

        width: 100%;
        height: 500px;
        display: flex;

    }
    .change{
        width: 50px;
        height: 50px;
        margin: auto;
        z-index:9;
    }
    .left{
        float: left;
        margin-right: -50px;

    }
    .right{
        float: right;
        margin-left: -50px;
    }
    .to{
        margin: auto;
        width: 50px;
        height: 50px;

    }
    img{
        width: 50px;
        height: 50px;
    }
    @import "src/assets/global.scss";
</style>