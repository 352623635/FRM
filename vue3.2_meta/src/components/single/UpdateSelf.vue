<template>
  <div style="width: 100%;;background-color: rgb(240 240 240 / 55%);margin:10px auto">
    <div class="common-layout">
      <el-container>
        <el-header height="300px">
          <div style="margin: 20px 20px 10px 20px;display: flex; justify-content: space-around;">
            <div >
              <el-image  fit="cover" :src="host+''+session.avatar" alt="" style="min-width: 225px;width:225px;height: 225px"/>
              <p style="text-align: center">
                原头像
              </p>
            </div>

            <div>
              <label>
                <input id="input" accept="image/png, image/bmp, image/jpg, image/jpeg" style="display: none" type='file' @change="handleInput">
                <el-image v-model:src="form.avatar" fit="cover" style="margin:0 10px 10px 10px;width: 225px;height: 225px;background-color: #d6d6d6"></el-image>
              </label>
              <p style="text-align: center;margin-top: 4px">
                选择的头像
              </p>
            </div>
            <el-form :model="form" label-width="60px" :rules="rules">
              <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name"  placeholder="为自己取一个新名字" />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender">
                  <el-option label="未知" value="未知"></el-option>
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <div style="display: flex;justify-content: flex-end;">
                <el-button style="width: 60px" type="primary" @click="onSubmit">确认修改</el-button>
                <el-button style="width: 90px" type="primary" @click="write">返回信息页</el-button>
                <span>{{up_end}}</span>
              </div>
            </el-form>
          </div>

        </el-header>
        <p style="background-color: #e6a23c2e;padding: 5px 0 5px 2rem;margin:0;font-size: 18px">
          我的创作
        </p>
        <el-container>

          <el-container>
            <el-main style="min-width: 450px;padding:10px;height: 550px;background-color: azure">
              <div v-if="essay.essay"  class="essay">
                <div style="display: flex">
                  <ul style="overflow: auto;padding: 0; margin: 0;list-style: none;background-color: azure;width: 100%;height: 100%">
                    <li v-for="(detail,detail_) in essay.essay" :key="detail_" class="infinite-list-item">
                      <div  class="essay-box">
                        <div class="essay-draw">
                          <img v-if="detail.type==='情绪'" :src="host+'/essay/essay_mood_img.jpg'" alt="暂无图片">
                          <img v-else-if="detail.type==='关于自我'" :src="host+'/essay/essay_self_img.jpg'" alt="暂无图片">
                          <img v-else-if="detail.type==='科普'" :src="host+'/essay/essay_since_img.jpg'" alt="暂无图片">
                          <img v-else-if="detail.type==='教育'" :src="host+'/essay/essay_teach_img.jpg'" alt="暂无图片">
                          <img v-else :src="host+'/essay/essay_none_img.jpg'" alt="暂无图片">
                        </div>
                        <div class="essay-liter" >
                          <router-link :to="'/essay_body?id='+Base64.encode(detail.essay_id)" >
                            <!--                链接-->
                            <p>{{detail.title}}</p>
                            <!--                题目-->
                          </router-link>
                        </div>
                        <router-link :to="'#/essay_update?id='+Base64.encode(detail.essay_id)">
                          <el-button>
                              <el-icon>
                                <edit-pen/>
                              </el-icon>
                          </el-button>
                        </router-link>
                      </div>
                    </li>
                  </ul>
                </div>
                <div >
                  <div style="height: 100px;margin: 20px auto" v-for='(check, index) in essay.essay' :key="index">
                    <!--判断checked是否包含当前fruit，checked.indexOf(fruit.fruitId)返回包含fruit的下标, 若不包含则返回-1-->
                    <input type='checkbox' :checked="checked.indexOf(check.essay_id)>=0" name='checkboxinput' class='input-checkbox' @click="CheckOne(check.essay_id)">
                  </div>
                  <div style="display: flex;margin-top: -20px;flex-direction: column;justify-content: space-between;height: 60px">
                    <span>
                      <input type='checkbox' :checked="arr.length===checked.length" class='input-checkbox'  @click='checkedAll()'>全选
                    </span>
                    <el-button :disabled="checked.length===0" @click="DeleteChecked">删除</el-button>
                  </div>

                </div>
              </div>


              <div v-else> 还没有文章哦</div>


            </el-main>



            <el-footer>Footer</el-footer>
          </el-container>
          <el-aside width="325px">

          </el-aside>
        </el-container>
      </el-container>
    </div>



  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import request from "@/utils/request";
import {EditPen,} from '@element-plus/icons-vue';
import store from "@/store";
import Criterion from "./Criterion.vue"
import {reactive,onMounted,ref} from "vue";
import {  ZoomIn } from '@element-plus/icons-vue'
import base64 from "@/components/base64";
import {Base64} from "js-base64";

let up_end=ref();
const {host,session} = store.state ;
let input = ref();

onMounted(()=>{
  input.value = document.getElementById('input');

})
const old=(await request.get('/web/user/user_self')).data[0];
console.log(old)
const form = reactive({
  name: old.name,
  gender: old.gender,
  avatar:'src/assets/add_img.png',
  avatar_img:''
})
const rules = reactive({

  name:[
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur',
    },
    {
      min: 1,
      max: 5,
      message: '昵称字符数限制为1到5个字符',
      trigger: 'blur',
    },
  ],
  gender: [
    {
      required: false,
    },
  ]
})

const emit = defineEmits(['update'])
const write = ()=>{
  emit('update','read')
}

const onSubmit =async () => {
  if(!input.value.files[0]){
    const result =(await request.post('/web/user/user_update',{
      name:form.name,
      gender:form.gender,
      avatar:old.avatar
    })).data;
    if(result.code === 400 ){
      alert(result.msg)
    }else if (result.code === 200){
      sessionStorage.removeItem('name');
      sessionStorage.setItem('name',form.name);
      window.location.reload();
    }
  }else if (input.value.files[0].size > 1024*2048) {
    alert('文件体积过大！')
  }
  else {
    let formData = new FormData()
    // 服务端接收文件的参数名，文件数据，文件名

    formData.append('avatar', input.value.files[0], input.value.files[0].name);
    await request.post('/web/avatar_upload',formData).then((res:any)=>{
          form.avatar_img=res.data;

        }

        // 这里返回的是你图片的地址
        //sever 是你的服务器名前缀，如果接口返回的地址是自带前缀的要自行调整
        //一般来讲接口返回的应该是一个不带前缀的url，因为开发环境和运行环境不能受限制
    ).catch((err:any)=>console.log(err));
    await request.post('/web/img_delect',{url:sessionStorage.avatar});
    const result =(await request.post('/web/user/user_update',{
      name:form.name,
      gender:form.gender,
      avatar:form.avatar_img
    })).data;
    if(result.code===400){
      alert(result.msg);
    }else if (result.code===200){
      sessionStorage.removeItem('avatar');
      sessionStorage.setItem('avatar',form.avatar_img);
      sessionStorage.removeItem('name');
      sessionStorage.setItem('name',form.name);
      window.location.reload();
    }

    //此处逻辑：1，取得图片，上传；2，上传成功，返回图片地址；3，删除旧图片文件；4，将新图片地址存入数据库
    //页面重载


  }
}
const handleInput=async (e:any)=>{
  if (e.target.files[0]){
    if ( e.target.files[0].size>1024000){
      alert("图片大小最高为1M！")
    }else {
      form.avatar = <string>await base64.getBase64(e.target.files[0]);
      console.log(e.target.files);
    }
  }
}
let essay = ref()
essay.value = (await request.get('/web/user/user_all_text',{params: {id:sessionStorage.id}})).data;

let arr =ref<any>([])
for (let i in essay.value.essay){
  arr.value.push(essay.value.essay[i].essay_id);
}

let isCheckedAll= false;
let checked=ref<any>([])
const CheckOne=(id:number)=>{
  if(checked.value.indexOf(id)>=0){
    checked.value.splice(checked.value.indexOf(id), 1)
  }else {
    checked.value.push(id)
  }
  console.log(checked.value)
}

const checkedAll=()=>{
  isCheckedAll = !isCheckedAll
  if (isCheckedAll) {
    // 全选时
    checked.value = []
    arr.value.forEach(function (id:number) {
      checked.value.push(id)
    }, this)
  } else {
    checked.value = []
  }
  console.log(checked.value,arr.value)
}

let isFirst = true;
const DeleteChecked=async ()=>{
  if (isFirst){
    alert('删除后将无法恢复，确认后再次点击删除将会执行该操作！')
    isFirst=false;
  }else {
    await request.post('/web/essay/essay_delete',{essay_id:checked.value}).then(res=>console.log(res));
    essay.value=(await request.get('/web/user/user_all_text',{params: {id:sessionStorage.id}})).data;
  }

}

</script>

<style lang="scss" scoped>
::v-deep .el-checkbox{
  height: 100px;
  margin: 10px auto;
}
::v-deep .el-checkbox__label{
  display: none;
}
.essay{
  justify-content: center;
  flex-direction: row;
  display: flex;
  margin:10px 0 0 0;
  width: 100%;
}
.essay-box{
  border-radius:5px;
  background-color: aliceblue;
  display: flex;
  width: 100%;
  min-width: 400px;
  max-width: 480px;
  margin:20px auto;
  height: 100px;
}
.essay-draw{
  width: 100px;
  height: 100px;
  margin:auto;
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
</style>