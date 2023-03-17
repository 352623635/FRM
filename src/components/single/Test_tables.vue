<template>
    <div class="tab_body">
        <div class="tab_box" v-if="num === 0">
            <div class="tab_tab" v-for="cont in list" :key="cont.n">
                <div class="text_box" @click="num = cont.n">
                    <p> {{cont.title}}
                    </p>
                    <span>{{cont.text}}</span>
                </div>
            </div>
        </div>
        <div v-if="num !== 0" class="tab_from">
            <div class="tab_back" @click="num = 0">
                <div style="width: 30px">
                    <svg style="height: 20px;width: 20px;margin: 5px auto" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                        <path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"></path>
                    </svg>
                </div>

                <span style="padding-top: 5px">返回</span>
            </div>
            <PHQ_9 v-if="num === 1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import PHQ_9 from './Test_PHQ_9.vue'
    const list=[
        {n:1,title:"PHQ 9",text:"PHQ-9抑郁症筛查量表作为专业级的量表，对于筛查抑郁症起到了极大的帮助。一般来说，很多人都会采用这种量表，尤其是在抑郁症早期不严重的时候，采用这种量表变得更加普遍。"
        },
        {n:2,title: "",text:""},
        {n:3,title: "",text:""},
        {n:4,title: "",text:""},
    ]

    const num = ref(0)
</script>

<style lang="scss" scoped>
    .tab_body{
        width: 100%;
        min-height: 400px;
        margin: 20px auto;
        .tab_box{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-around;
            .tab_tab{
                margin-top: 20px;
                width: 31%;
                height: 200px;
                background-color: #d9edf7;
                border-radius: 4px;
                .text_box{
                    margin: 0 20px;
                }
            }
        }
        .tab_from{


            .tab_back{
                display: flex;
                height: 30px;
                background-color: #d9edf7;
                border-radius: 2px;
            }
            .tab_back :hover{
                background-color: #7a82fa;
            }
        }
    }
</style>