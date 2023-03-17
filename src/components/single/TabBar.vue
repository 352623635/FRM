<template>
  <!--  TabBar，
          1-随数据量变化，链接区域自动居中；-->
  <!--    2-随数据量传入类型不同，在正常显示与折叠窗口间转化；-->
  <div class="line">
    <div>
      <div class="link">
        <div class="logo">
          <a :href=logo.href>
            <div :style="{backgroundImage: 'url('+logo.url+')',backgroundSize:'100%',width:'100%',height:'100%'}" style="width: 210px;height: 70px"></div>
          </a>
        </div>
        <div class="link-father">
          <div v-for="(link,index) in path" :key="index.link" :style="{width:n}" class="link-child">
            <div v-if="link.url !== 0" style="width: 100%">
              <!--          传入时有包含子路径则设置为0-->
              <!--            栏目宽度控制区，默认100%-->
              <div v-if="href==='#/'&&link.url==='/'">
                <div style="border-radius:5px;background-color: #d7e6c8">{{link.name}}</div>
              </div>
              <div v-else-if="link.url===href">
                <div style="border-radius:5px;background-color: #d7e6c8">{{link.name}}</div>
              </div>
              <div  v-else>
                <router-link :to="link.url">
                  <div>{{link.name}}</div>
                </router-link>

              </div>
            </div>
            <div v-else>
              <div class="drop" style="width: 100%">
                <!--              栏目宽度控制区，默认100%-->
                <a>{{link.name}}</a>
                <div class="drop_con">
                  <div v-for="(link_child,index) in link.child" :key="index.child">
                    <div class="child-tab">
                      <a :href=link_child.url>
                        <div>
                          {{link_child.name}}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <login />
        </div>
      </div>
      <div v-if="href!='#/login'&&href!='#/register'" class="tab-search">
        <label>
          <input placeholder="请输入检索内容">
        </label>
        <el-button :icon="Search">Search</el-button>
        <el-button :icon="MagicStick">情绪识别</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search,MagicStick } from '@element-plus/icons-vue'
import login from './Login_tab.vue'
import store from "@/store";
import {defineProps} from "@vue/runtime-core";
import {ref, computed, reactive,onMounted} from 'vue';
import router from "@/router";
const host = store.state.host;


let href = ref();
href.value = router.currentRoute._rawValue.href;
console.log(href.value)

const page = (location.href.split('/'))[(location.href.split('/')).length-1];
const props=defineProps({
  path:Object,
  logo:Object,
});
let n=Number(1/ props.path.length*100).toFixed(1)+"%";
let session=computed(()=>{
  return store.state.session
});


</script>

<style lang="scss" scoped>
.line{
  width: 100%;
  .link{
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    .tab-log-box{
      width: 80px;
      display: flex;
      align-items: center;
      .to-log{
        button{
          font-size: 10px;
          color: white;
          background-color: rgb(0 65 255 / 26%);
          box-shadow: 3px 3px 3px #888888;
          border-radius: 5px;
        }
        button:hover{
          background-color: #000000;
        }
      }
      .to-logout{
        align-items: center;
        display: flex;
        .logout-a{
          line-height: 1rem;
          height: 1rem;
          color: cornflowerblue;
        }
        img{
          width: 40px;
          height: 40px;

        }
        button{
          font-size: 10px;
          color: red;
          background-color: rgba(255,255,255,0);
          box-shadow: 3px 3px 3px #888888;
          border-radius: 5px;
        }
        button:hover{
          background-color: white;
          color: black;
        }
      }
    }
  }
  .tab-search{
    border-radius: 5px;
    background-color: #0041ff24;
    padding: 10px 0;
    margin: 10px auto 0 auto ;
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: space-evenly;
    button{
      background-color: skyblue;

    }
    label{
      width: 75%;

    }
    input{
      margin: auto;
      height: 25px;
      width: 100%;
    }
  }
  .logo{
    width: 210px;
    height: 70px;//logo的尺寸设定，同时你必须再次修改html中引用图片的尺寸
  }
  .link-father{
    margin: auto;
    display: flex;
    width: 70%
  }
  .link-child{
    margin: 0 15px 0 15px;
    -webkit-box-sizing:border-box; /* Safari */
    float:left;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    min-width: 4rem;
    border-radius:5px;
    a{
      text-decoration:none;
      color: black;
    }
  }
  .link-child:hover{

    background-color: gainsboro;
    a{
      color: black;
    }
  }

  .drop{
    text-indent: 0 ;
    position: relative;
    display: inline-block;

  }

  .drop_con{
    text-indent: 0 ;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    max-width: 150px;
    min-width: 90px;
    width: auto;
    height: auto;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  }
  .drop:hover .drop_con{
    border-radius:5px;
    display:block;
    z-index: 9999;
    .child-tab{
      a{
        color: black;
      }
    }
    .child-tab:hover{
      background-color: #000000;
      border-radius:5px;
      a{
        color: #f9f9f9;
      }
    }
  }
}

@import "src/assets/global.scss";
</style>
