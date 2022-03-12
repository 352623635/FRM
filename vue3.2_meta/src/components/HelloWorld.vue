<template>
  <h1>{{ show_count }}</h1>
<a>{{essay}}</a>
  {{essay1}}
  <button type="button" @click="addBtn">?</button>

</template>

<script lang="ts" setup>
  //本页面将一直保留以供使用

  //标签的setup是vue3中setup()的进阶写法，区别是暴露数据时省略return，要求vue版本高于3.2
  //setup()是vue3加入的写法，可以将函数全部包括进去，在函数定义时就能进行生命周期设置
  //setup直接写函数会认定为created写法，即不可获取dom元素，要调用dom需要写入computed内

  //组件引用改变，不再需要components注册

  //设定一个数据为ref()可以设置为响应型数据

  //props也可以直接定义,Emits与其类似
  // const props=defineProps({
  //
  // })

  // require是vite不可以使用的,引入echarts用import
  //setup的生命周期比export default紊乱!!-----渲染后不能直接读取dom值!!,不引入子组件情况下尽量使用vue3的写法来内嵌setup

  //vue改变标签属性不一定要操作dom元素，可以用动态赋值的方式，直接改变所挂载的值就能改变标签属性

  //Mint vux ui是手机端的定制组件库
  //iview radon-ui antd N3
  import data from '@/store'
  import {ref, computed, reactive} from 'vue';
  import axios from "axios";

  const store=data;

  let essay=ref([]);//ref与reactive区别是ref自动加入value属性，而reactive每个属性都要自己规定
  axios.get(
    '/api/web/essay'
  ).then(res=>essay.value=(res.data)).catch(err=>console.log(err));
  //单页面写法

  store.dispatch('getEssay');
  let essay1=computed(()=>{
    return store.getters['get_essay']
  });//库内存值写法

  const count = ref(0);
  //定义count
  const show_count =computed(()=>{
    return store.getters['get_count']
  });
  //调用getter中的get_count获取到state中的count值
  const addBtn = () =>{
    store.commit('setCount',++count.value)
  };
  //点击事件，不可能用它

  //更改setup标签，与下面代码效果相同
  // export default {
  //   setup(){
  //     const store=userStore();
  //     const count = ref(0);
  //     const showcount =computed(()=>{
  //       return store.getters['getCount']
  //     });
  //     const addBtn = () =>{
  //       store.commit('setCount',++count.value)
  //     };
  //     return{
  //       store,
  //       count,
  //       showcount,
  //       addBtn
  //     }
  //   }
  // }

  //图片上传逻辑
  //1.字段名
  //2.
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
