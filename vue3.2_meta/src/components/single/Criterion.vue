<template>
  <div v-if="type==='index'">
    <div v-if="criterion[0]" class="cri_box">
      <div v-if="type==='index'" class="head">
        <div style="background-color: #ffffff6e;margin:auto;width:64px;display:flex;flex-direction: column;justify-content: center;align-items: center;">
          <el-avatar :src="host+user.avatar">

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
    <div v-else>
      还没有评论哦
    </div>
  </div>
  <div v-else-if="type==='user'">
    <div v-if="criterion[0]" class="cri_box1">
      <div style="border-style: ridge; display: flex;flex-direction: column;justify-content: space-between;background-color: #eeeeee;border-radius: 5px;height: 45px;margin: auto 0;">
        <span style="width: 220px;color: #757d87">
                <a class="liter_txt1">{{criterion[0].text}}</a>
        </span>
        <!--                文本内容-->
        <a style="color:#757d87;">{{criterion[0].update_time.slice(0,10)}}</a>
      </div>
    </div>
  </div>



</template>

<script setup>
    import request from "../../utils/request";
    import { ref } from "vue";
    import {defineProps} from "@vue/runtime-core";
    import store from "../../store";
    const host =store.state.host;
    const props=defineProps({
        id:Number,type:String
    });
    let criterion = ref();
    console.log(props.id)
    if(props.id){
      criterion.value=(await request.get('/web/pour/pour_cri?id='+props.id)).data;
    }
    console.log(criterion.value)

    let user=ref();
    if(criterion.value[0]){
      user.value=(await request.post('/web/user',{"user":criterion.value[0].uid})).data;
    }


</script>

<style lang="scss" scoped>
    .cri_box{
        width: 100%;
        display: flex;
    }
    .cri_box1{
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