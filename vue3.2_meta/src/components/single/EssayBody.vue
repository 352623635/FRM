<template>
<!--    <a v-html="detail.essay.text" style="white-space: pre-wrap;"></a>-->
  <div style="margin: 60px auto;border-style:groove;border-radius: 5px">
    <div class="essay_father">
      <h1 class="essay_title">{{detail.essay[0]['title']}}</h1>
      <div class="essay_author" >
        <el-avatar  style="height: 25px;width: 25px" :src="host+detail.author[0]['avatar']">
        </el-avatar>
        <span style="height: 1rem;line-height: 1rem;margin:auto  auto auto 10px">{{detail.author[0]['name']}}</span>
        <!--        个人信息页没写，先标记-->
      </div>
      <p class="preface">{{detail.essay[0]['preface']}}</p>
      <div v-html="detail.essay[0].text" style="background-color: #66b1ff17">
      </div>
    </div>
  </div>

</template>

<script setup>
    import request from "../../utils/request";
    import router from "../../router";
    import {ref} from 'vue';
    import store from "../../store";
    import {Base64} from "js-base64";

    const host = store.state.host;

    const id=router.currentRoute._rawValue.query.id;
    let detail=ref()
    //等价于route.params.id
    let data=(await request.get('/web/essay/essay_body',{params:{id:Base64.decode(id)}})).data;
    if (data.code===400){
      alert(data.msg);
    }else if(data.code===200){
      detail.value=data.data
    }
    console.log(detail.value)
</script>

<style scoped lang="scss">
.essay_father{
  margin: 20px 40px;
  .essay_author{
    display: flex;
    width: 200px;
    color: #8a8f97;
    background-color: #f0f0f0;
  }
  .preface{
    background-color: #f0f0f0;
    color: #888888;
    margin: 30px auto;
    font-size: 18px;
  }
}
  .essay_title{
    margin: 20px auto;
  }
</style>
