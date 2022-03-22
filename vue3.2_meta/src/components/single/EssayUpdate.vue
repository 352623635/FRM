<template>
  <div style="margin: 60px auto;border-style:groove;border-radius: 5px">
    <div style="margin: 20px">
      <Tinymce v-model:value="content" />
      <hr/>
      <el-button @click="update()">
        确认修改
      </el-button>
    </div>

  </div>
</template>
<script setup>
import { ref,watch } from "vue";
import Tinymce from "@/components/single/Tinymce.vue";
import request from "../../utils/request";
import router from "@/router";
import {Base64} from "js-base64";

let href = router.currentRoute._rawValue.query.id;

const old=(await request.get('/web/essay/essay_body',{params:{
    id:Base64.decode(href)
  }
})).data.data.essay[0];
let content = ref(old.text);




const update =async ()=>{
  let text = content.value;
  // text = text.replace(/"/g,'\\"');
  //重写实际测试不需要，如果出现新bug再使用重写
  const update = (await request.post('/web/essay/essay_update',
      {essay_id:old.essay_id,
        img:old.img,
        title:old.title,
        text:text,
        type:old.type,
        preface:old.preface
  })).data;
  if (update.code===400){
    alert(update.msg)
  }else {
    console.log(update.data)
  }
};
</script>