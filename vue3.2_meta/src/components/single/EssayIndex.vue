<template>

    <div style="padding-top: 20px;">
        <div class="all-essay">
          <div style="display: flex;border-radius: 5px 5px 0 0 ;justify-content: space-between;background-color: #17a4a942">
            <div style="width: 90%;">
              <el-menu
                  :default-active="activeIndex2"
                  active-text-color="black"
                  background-color="#17a4a900"
                  class="el-menu-demo"
                  hover-text-color="#000a6fb8"
                  mode="horizontal"
                  text-color="#000a6fb8"
                  @select="handleSelect"
              >
                <el-menu-item index="new">最新文章</el-menu-item>
                <el-menu-item index="hot">热门文章</el-menu-item>
                <el-sub-menu index="type">
                  <template #title>标签分类</template>
                  <el-menu-item index="self">关于自我</el-menu-item>
                  <el-menu-item index="teach">教育</el-menu-item>
                  <el-menu-item index="since">科普</el-menu-item>
                  <el-menu-item index="mood">情绪</el-menu-item>
                  <el-menu-item index="none">无</el-menu-item>
                  <!--                    后面实例定义一个数组来查询类型值-->
                </el-sub-menu>
                <el-menu-item index="more" >More&#10148;</el-menu-item>
              </el-menu>
            </div>

            <router-link to="/essay_upload">
              <el-image style="width:40px;height: 40px;margin: auto" fit="cover" :src="host+'/edit.png'"></el-image>
            </router-link>
          </div>
            <hr>
            <div class="essay" >
                <div v-for="(detail,detail_) in essay[n]" :key="detail_" class="essay-box">
                    <div class="essay-draw">
                      <img v-if="detail.type==='情绪'" :src="host+'/essay/essay_mood_img.jpg'" alt="暂无图片">
                      <img v-else-if="detail.type==='关于自我'" :src="host+'/essay/essay_self_img.jpg'" alt="暂无图片">
                      <img v-else-if="detail.type==='科普'" :src="host+'/essay/essay_since_img.jpg'" alt="暂无图片">
                      <img v-else-if="detail.type==='教育'" :src="host+'/essay/essay_teach_img.jpg'" alt="暂无图片">
                      <img v-else :src="host+'/essay/essay_none_img.jpg'" alt="暂无图片">
                        <!--                图片-->
                    </div>

                    <div class="essay-liter">
                        <router-link :to="'/essay_body?id='+Base64.encode(detail.essay_id)" >
                            <!--                链接-->
                            <p>{{detail.title}}</p>
                            <!--                题目-->
                            <a> {{detail.preface}}</a>
                            <!--                文本内容-->
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue';
    import axios from "axios";
    import store from "@/store";
    import {EditPen} from '@element-plus/icons-vue';
    import {Base64} from "js-base64";

    let n =ref('new');
    const activeIndex2 = ref('new');
    const handleSelect = (key: string, keyPath: string[]) => {
        n.value=key;
    };
    const host = store.state.host;
    const essay = (await axios.get('/api/web/essay/essay_index')).data

</script>

<style lang="scss">
    .all-essay{
      border-radius: 5px;
        background-color: #ffffff6e;
        width: 100%;
        margin: auto;

    }
    .title{
        margin-left: 50px;
        padding-top: 10px;
        padding-bottom: 10px;

        display: flex;
        text-align: center;
        .title-txt{
            line-height: 30px;
            border-radius:15px;
            height: 30px;
            width: 80px;
        }
        .title-txt:hover{
            color: cornflowerblue;
        }

    }
    .essay{
        display: flex;
        margin:50px auto auto 2px;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .essay-box{
        border-radius:5px;
        background-color: aliceblue;
        display: flex;
        width: 390px;
        margin-bottom: 50px;
        height: 140px;
    }
    .essay-draw{
        width: 100px;
        height: 100px;
        margin: 20px auto auto 20px;
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

    @media screen and (max-width: 800px) {
        @import '../../assets/narrow.scss';
    }
</style>