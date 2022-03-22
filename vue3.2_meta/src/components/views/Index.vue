<template>
  <div :style="'background-image: url('+host+':3001/background.jpg'+');background-size: cover'">
    <div style="max-width: 1100px;background-color: #97d5d9b5;min-width: 825px;margin: auto">
      <div style="width:91%;margin:auto">
        <TabBar :logo=logo :path=tabbar />
        <Banner :banner=banner time=4 />
        <div style="padding-top: 20px">
              <suspense>
                <Report />
              </suspense>
        </div>
        <!--    异步组件需要使用此标签进行包裹才可以输出-->
        <suspense>
          <Pour />
        </suspense>

        <suspense>
          <Essay  />
        </suspense>

        <Games />
        <Footer :footer="footer" />
      </div>
    </div>
  </div>


</template>

<script setup>
    import {computed, ref} from "vue";
    import store from "@/store";
    import TabBar from '../single/TabBar.vue';
    import Banner from "../single/Banner.vue";
    import Footer from "../single/Footer.vue";
    import Essay from "../single/EssayIndex.vue";
    import Report from "../single/Report.vue";
    import Pour from "../single/Pour.vue";
    import Games from "../single/Games.vue";
    import request from "../../utils/request";
    const host = store.state.host;
    let session=computed(()=>{
        return store.state.session
    });

    const tabbar=computed(()=>{return store.state.tabbar});
    const logo=computed(()=>{return store.state.logo});
    const banner=computed(()=>{return store.state.banner});
    const footer=computed(()=>{return store.state.footer});
    let essay=ref([]);//ref与reactive区别是ref自动加入value属性，而reactive每个属性都要自己规定
    request.get(
        '/web/essay/essay_index'
    ).then(res=>essay.value=(res.data)).catch(err=>console.log(err));

</script>

<style lang="scss" scoped>

</style>