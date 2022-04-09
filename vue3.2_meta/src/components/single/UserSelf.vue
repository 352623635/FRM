<template>
  <div style="background-color: #f0f0f0;margin: auto">
    <div class="common-layout">
      <el-container>
        <el-header height="275px">
          <div class="data">
            <div class="data_head">
              <el-image fit="cover" :src="host+''+session.avatar" alt="" style="margin:10px 0;width: 225px;height: 225px"/>
              <div style="margin: auto 0;">
                <el-descriptions :column="3" border class="margin-top" title="个人信息">
                  <template #extra>
                    <el-button type="primary" @click="write">🔧编辑</el-button>
                  </template>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item"><el-icon><user /></el-icon>
                        昵称
                      </div>
                    </template>
                    {{data[0].name}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item"><el-icon><iphone /></el-icon>
                        Phone
                      </div>
                    </template>
                    {{data[0].phone}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon>
                          <location />
                        </el-icon>
                        Place
                      </div>
                    </template>
                    {{data[0].place!== 'null' ? data[0].place : '未设置'}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon>
                          <tickets />
                        </el-icon>
                        性别
                      </div>
                    </template>
                    <!--          <el-tag size="small">School</el-tag>-->
                    {{data[0].gender}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon>
                          <office-building />
                        </el-icon>
                        情绪特征
                      </div>
                    </template>
                    {{ data[0].mark }}
                  </el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="1" border class="margin-top">
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon>
                          <office-building />
                        </el-icon>
                        座右铭
                      </div>
                    </template>
                    {{ data[0].sign !== 'null' ? data[0].sign : '这个人很神秘，什么都没留下！' }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </div>
        </el-header>
        <p style="background-color: #e6a23c2e;padding: 5px 0 5px 2rem;margin:0;font-size: 18px">
          我的创作
        </p>
        <el-container>

          <el-container>
            <el-main style="padding:10px;height: 550px;background-color: azure">
              <div v-if="essay.essay"  class="essay">
                <ul style="overflow: auto;padding: 0; margin: 0;list-style: none;background-color: azure;width: 100%;height: 100%">
                  <li v-for="(detail,detail_) in essay.essay" :key="detail_" class="infinite-list-item">
                    <div  class="essay-box">
                      <div class="essay-draw">
                        <img v-if="detail.type==='情绪'" :src="host+'/essay/essay_mood_img.jpg'" alt="暂无图片">
                        <img v-else-if="detail.type==='关于自我'" :src="host+'/essay/essay_self_img.jpg'" alt="暂无图片">
                        <img v-else-if="detail.type==='科普'" :src="host+'/essay/essay_since_img.jpg'" alt="暂无图片">
                        <img v-else-if="detail.type==='教育'" :src="host+'/essay/essay_teach_img.jpg'" alt="暂无图片">
                        <img v-else :src="host+'/essay/essay_none_img.jpg'" alt="暂无图片">
                        <!--                图片-->
                      </div>

                      <div class="essay-liter" >
                        <router-link :to="'/essay_body?id='+Base64.encode(detail.essay_id)" >
                          <!--                链接-->
                          <p>{{detail.title}}</p>
                          <!--                题目-->
                          <a> {{detail.preface}}</a>
                          <!--                文本内容-->
                        </router-link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else> 还没有文章哦</div>
            </el-main>


            <el-footer>Footer</el-footer>
          </el-container>
          <el-aside width="325px" style="border-style: groove;border-radius: 5px">
            <div v-if="essay.pour" class="ques-text">
              <ul class="infinite-list" style="overflow: auto">
                <li v-for="(ques,index) in essay.pour" :key="index.question">
                  <div class="ques-text-txt">
                    <div><p style="margin: 0;padding-top: 5px">{{ques.title}}</p></div>
                    <div style="font-size:12px;display:flex;height: 50px;margin: auto 5px">
                      <div style="width: 90%;">
                        <suspense>
                          <Criterion :id=ques.pour_id type="user" />
                        </suspense>
                      </div>
                      <div style="width: 50px;">热度：{{ques.hot}}</div>
                      <!--                            插入组件-->
                      <!--                            <p style="width: 90%;font-size: 14px;color: gray;text-indent:2em;">{{ques.answer}}</p>-->
                    </div>
                  </div>
                </li>
              </ul>

            </div>
            <div v-else>
              还没有动态哦
            </div>
          </el-aside>
        </el-container>
      </el-container>
    </div>



  </div>
</template>

<script setup>
    import axios from 'axios'
    import request from "@/utils/request";
    import {User, Iphone, Location, Tickets, OfficeBuilding,} from '@element-plus/icons-vue';
    import store from "@/store";
    import Criterion from "./Criterion.vue"
    const {host,session} = store.state ;
    import {Base64} from "js-base64";

    // const load = () => {
    //   count.value += 2
    // }
    // const emit = defineEmits(['update'])
    const write = ()=>{
      // emit('update','write')
      window.location.href='#/user_update';
    }
    const data = (await request.get('/web/user/user_self')).data;

    const essay = (await request.get('/web/user/user_all_text',{params: {id:sessionStorage.id}})).data;
    console.log(essay)
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 550px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: azure;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: var(--el-color-primary-light-9);
  margin: 10px 0;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
  .common-layout{
    margin-top: 10px;
    .data_head{
      justify-content: space-evenly;
      align-items: flex-start;
      padding-top: 20px;
      display: flex;
    }
  }

  .essay{

     display: flex;
     margin:10px 0;
     width: 100%;
     flex-wrap: wrap;
     justify-content: space-evenly;
   }
  .essay-box{
    border-radius:5px;
    background-color: aliceblue;
    display: flex;
    width: 100%;
    min-width: 400px;
    max-width: 480px;
    margin:10px auto;
    height: 140px;
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
      margin: 0;
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
  .ques-text{

    width: 100%;
    height: 435px;
    .ques-text-txt{
      border-radius:5px;
      background-color: aliceblue;
      margin: 10px auto;
      height: 100px;
      width: 90%;
      h5{
        width: 50px;
        height: 50px;
        margin: auto;
        background-color: rgba(0,0,0,0.1);
        text-align: center;
        border-radius: 3px;
        font-weight: normal;
        color: cornflowerblue;

      }
      p{
        margin: 14px auto;
        font-weight: 500;
        width: 95%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow:ellipsis;
        overflow: hidden;
      }
    }
  }
</style>