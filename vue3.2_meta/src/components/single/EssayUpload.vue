<template>
  <div style="margin: 60px auto;border-style:groove;border-radius: 5px">
    <div style="margin:30px 20px">
      <el-form :model="form" label-width="60px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"  placeholder="请输入标题，3到20个字符之间" />
        </el-form-item>
        <el-form-item label="前言" prop="preface">
          <el-input v-model="form.preface"  placeholder="请输入前言，5到60个字符之间" />
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="form.type">
            <el-option label="无" value="无"></el-option>
            <el-option label="关于自我" value="关于自我"></el-option>
            <el-option label="科普" value="科普"></el-option>
            <el-option label="教育" value="教育"></el-option>
            <el-option label="情绪" value="情绪"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <Tinymce v-model:value="form.text" />
        <el-button @click="upload()">
          确认上传
        </el-button>
      </div>
    </div>

  </div>

</template>
<script setup>
import Tinymce from "@/components/single/Tinymce.vue";
import request from "../../utils/request";
import {reactive} from "vue";
import {Base64} from "js-base64";

if(!sessionStorage.token){
  alert('未登录不可操作！')
  window.location.href='#/login'
}

const form = reactive({
  title: '',
  preface:'',
  type:'无',
  text:''
})

const rules = reactive({
  title:[
    {
      required: true,
      message: '标题不可留空！',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 20,
      message: '标题字符数限制为3到20个字符',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: false,
    },
  ],
  preface:[
    {
      required: true,
      message: '前言不可留空！',
      trigger: 'blur',
    },
    {
      min: 5,
      max: 60,
      message: '前言字符数限制为5到60个字符',
      trigger: 'blur',
    },
  ],
  text:[
    {
      required: true,
      message: '内容不可留空！',
      trigger: 'blur',
    },
  ]
})

const upload =async ()=>{
  console.log(form)
  // text = text.replace(/"/g,'\\"');
  //重写实际测试不需要，如果出现新bug再使用重写
  const upload = (await request.post('/web/essay/essay_upload',{
    title:form.title,
    text:form.text,
    type:form.type,
    preface:form.preface
  })).data;
  if (upload.code===400){
    alert(upload.msg)
  }else {
    const id = Base64.encode(upload.data.insertId)
    setTimeout(window.location.href=`#/essay_body?id=${id}`,1000)
  }
};
</script>