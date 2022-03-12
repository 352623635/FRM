<template>
<!--    <a v-html="detail.essay.text" style="white-space: pre-wrap;"></a>-->
    <div style="margin: 10px auto;max-width: 1000px;min-width: 750px;text-align: center">
<!--        <div v-html="detail.essay[0].text">-->

<!--        </div>-->
    </div>

</template>

<script setup>
    import request from "../../utils/request";
    import router from "../../router";
    import {ref} from 'vue';
    const id=router.currentRoute._rawValue.query.id;
    let detail=ref()
    //等价于route.params.id
    let data=(await request.get('/web/essay/essay_body',{params:{id:id}}));
    // if (data.code===400){
    //   alert(data.msg);
    // }else if(data.code===200){
    //   detail.value=data.data
    // }
    console.log(data)
</script>

<style scoped>

</style>
