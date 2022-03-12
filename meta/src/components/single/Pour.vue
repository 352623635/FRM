<template>
    <div class="pour">
        <div style="background-color: white">
            <el-menu
                    :default-active="activeIndex1"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#17a4a942"
                    text-color="#000a6fb8"
                    hover-text-color="#000a6fb8"
                    active-text-color="black"
            >
                <el-menu-item index="new">倾述求助</el-menu-item>
                <el-menu-item index="more">去求助&#10148;</el-menu-item>
            </el-menu>
            <hr>
            <div class="pour-box">
                <div class="pour-ques">
                    <el-menu

                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#17a4a942"
                            text-color="#000a6fb8"
                            hover-text-color="#000a6fb8"
                            active-text-color="black"
                    >
                        <el-menu-item index="new">按热度排序</el-menu-item>
                    </el-menu>
                    <hr>

                    <div class="ques-text">
                        <div class="ques-text-txt" v-for="(ques,index) in pour.hot" :key="index.question">
                            <div><p style="margin: auto 15px;padding-top: 5px">{{ques.title}}</p></div>
                            <div style="display:flex;height: 68px;justify-content: space-between;margin: auto 10px">
                                <div style="width: 85%;">
                                    <suspense>
                                        <Criterion type="index" :id=ques.pour_id />
                                    </suspense>
                                </div>
                                <div style="width: 50px;">热度：{{ques.hot}}</div>
                                <!--                            插入组件-->
                                <!--                            <p style="width: 90%;font-size: 14px;color: gray;text-indent:2em;">{{ques.answer}}</p>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pour-hot">
                    <p class="pour-title">热议</p>
                    <hr>
                    <div class="hot-text">
                        <div class="hot-text-child"  v-for="(news,index) in pour.new" :key="index.new">
                            <div style="margin-left: 10px">
                                <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :content="news.title"
                                        placement="top-start"
                                >
                                    <a style="font-size: 15px;color: gray">{{news.title.slice(0,5)+'…'}}</a>
                                </el-tooltip>
                            </div>
                            <div style="margin-left: 10px">
                                <a style="color: lightskyblue;font-size: 8px">{{news.update_time.substr(0, 10)}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import store from '@/store';
    import {ref} from "vue";
    import request from "../../utils/request";
    import Criterion from "./Criterion.vue"

    const activeIndex1 = ref('new');
    const activeIndex2 = ref('new');

    let pour=(await request.get('/web/pour/pour_index')).data;


</script>

<style lang="scss" scoped>
    .pour{

        width: 100%;
        max-width: 1000px;
        margin: auto;
        padding-top: 10px;
        min-width: 750px;
        .pour-box{
            max-width: 1000px;
            min-width: 750px;
            margin: auto;
            height: 510px;
            display: flex;
            justify-content: space-evenly;
            .pour-title{
                margin: auto;
                width: 90%;
                text-align: center;
                height: 52px;
                line-height: 52px;

            }
            .pour-ques{
                border-radius: 3px;
                background-color: rgba(0,0,0,0.05);
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
                            width: 100%;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            text-overflow:ellipsis;
                            overflow: hidden;
                        }
                    }
                }
                width: 70%;
                height: 100%;

            }
            .pour-hot{
                border-radius: 3px;
                width: 15%;
                height: 100%;
                background-color: rgba(0,0,0,0.05);
                .hot-text{

                    margin: 10px auto;
                    height: 435px;
                    .hot-text-child{
                        border-radius:5px;
                        background-color: aliceblue;
                        height: 50px;
                        width: 90%;
                        margin: 5px auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    a{
                        margin: 6px 0 0 0;
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        text-overflow:ellipsis;
                        overflow: hidden;
                    }
                }
            }
        }

    }
</style>