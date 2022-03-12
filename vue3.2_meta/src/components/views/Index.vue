<template >
    <div :style="'background-image: url('+'http://127.0.0.1:3001/background.jpg'+')'">
        <TabBar :logo=logo :path=tabbar />
        <Banner :banner=banner time=4 />
        <div style="padding-top: 10px">
            <div v-if="session.id">
                <div v-if="session.mood==='true'">
                    <suspense>
                        <Report />
                    </suspense>
                </div>
                <div v-else style="width: 100%;">
                    <router-link to="/add_mood">
                        <div style="max-width: 1000px;min-width: 750px;margin: auto">
                            <el-image :src="'http://localhost:3001/none_mood.png'+''" style="width: 100%;height: 100%"></el-image>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-else style="width: 100%;">
                <router-link to="/login">
                    <div style="max-width: 1000px;min-width: 750px;margin: auto">
                        <el-image :src="'http://localhost:3001/not_login_mood.png'+''" style="width: 100%;height: 100%"></el-image>
                    </div>
                </router-link>
            </div>
        </div>


        <!--    异步组件需要使用此标签进行包裹才可以输出-->
        <suspense>
            <Pour />
        </suspense>

        <Essay  />
        <Games />
        <Footer :footer="footer" />
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
    import Test from "./Test.vue"
    import request from "../../utils/request";
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