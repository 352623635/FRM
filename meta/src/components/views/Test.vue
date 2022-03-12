<template>
    <h1>page B</h1>
    <Tinymce v-model:value="content" />
    <hr/>
    <div>{{content}}</div>
    <button @click="upload()">
        click me
    </button>
</template>
<script setup>
    import { ref,watch } from "vue";
    import Tinymce from "@/components/single/Tinymce.vue";
    import request from "../../utils/request";
    let content = ref();
    const upload =async ()=>{
        let text = content.value;
        text = text.replace(/"/g,'\\"');
        await request.post('/web/essay/essay_upload',{img:'/essay/essay_17f6db3f0e2.bmp',
          title:'测试',text:text,type:'测试文本',preface:'预览'
        }).then(res=>console.log(res)).catch(err=>console.log(err));
        console.log(text)
    };
</script>