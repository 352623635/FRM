<template>
    <div>
        <div class="report">

            <el-menu
                style="border-radius: 5px 5px 0 0 ;"
                    :default-active="activeIndex2"
                    active-text-color="black"
                    background-color="#17a4a942"
                    class="el-menu-demo"
                    hover-text-color="#000a6fb8"
                    mode="horizontal"
                    text-color="#000a6fb8"

            >
                <el-menu-item index="new">情绪记录</el-menu-item>
                <el-menu-item index="more">More&#10148;</el-menu-item>
            </el-menu>
            <hr style="width: 100%">

            <div class="report-body">

                <div style="width: 30%">
                    <div class="report-date">
                        <div class="demo-date-picker">
                            <div class="block">
                                <el-date-picker
                                        v-model="value1"
                                        :disabled-date="disabledDate"
                                        placeholder="Pick a day"
                                        type="date"
                                        @change="change($event)"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        <a style="font-size: xx-small">*图表展示一周内的记录</a>
                        <a style="font-size: xx-small">*纵轴最大值为6，均值是相对于6而言的</a>
                    </div>
                    <div class="report-mark">
                        <p class="report-mark-title">
                            你的性格标签
                        </p>
                        <div class="report-mark-txt">
                            <p v-for="(mark_,index) in mark" :key="index.mark_">
                                •&nbsp;&nbsp;{{mark_}}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="report-state">
                    <div id="chart" class="report-echarts">
                    </div>
                    <div class="report-state-txt">
                        <p class="state-txt-title">
                            相关建议:
                        </p>
                        <div class="state-txt-txt">
                            <p >
                                •&nbsp;&nbsp;{{suggest}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
    import store from '@/store';
    import * as echarts from 'echarts';
    import {ref, onMounted, computed, reactive} from "vue";
    import request from "../../utils/request";
    let date = new Date(Date.now());
    onMounted(()=>{
        console.log(document.getElementById('chart'));
        draw(date.getFullYear(),date.getMonth()+1,date.getDate());
    });

    //
    let myChart=null;
    let n=ref('');
    let suggest=ref();
    const activeIndex2 = ref('new');
    const value1 = ref('');
    const shortcuts = [
        {
            text: 'Today',
            value: new Date(),
        },
        {
            text: 'Yesterday',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                return date
            },
        },
        {
            text: 'A week ago',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                return date
            },
        },
    ]

    let info = ref();

    const time = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    const length = (Date.parse(time)-Date.parse('2022/2/22'))/86400000;


    if(sessionStorage.data){
      info.value = (await request.post('/web/user/mood',{"user":sessionStorage.id})).data;
    }else {
      info.value={
        "date": [
        ],
        "report": ["2", "5", "6", "2", "7", "2", "6", "4", "5", "2", "5", "3", "5", "2", "5", "5", "6", "3", "2", "3", "3", "5","6"
        ],
        "mark": [
          {
            "mark": "情感大师，平平淡淡"
          }
        ],
        "suggest": []
      };
      for(let l=0;l<=22;l++){
        const day_= new Date(Date.parse(time)-(22-l)*86400000);
        const day_time_= day_.getFullYear()+'/'+(day_.getMonth()+1)+'/'+day_.getDate();
        info.value.date.push(day_time_);
        info.value.suggest.push('当前为虚假数据，请登录以添加自己的记录！');
      }
    }
//根据登陆情况赋值，未登录则为虚假值
    console.log(info.value);
    const mark=info.value.mark[0] ;

    const disabledDate = (time) => {
        return time.getTime() > Date.now()||time.getTime() < Date.parse(new Date(info.value.date[0]))
    }

    let date_arr= reactive({
      date:[],
      suggest:[],
      report:[]
    });


      for (let l=0;l<=length;l++){
        const day = new Date(Date.parse(time)-(length-l)*86400000);
        const day_time= day.getFullYear()+'/'+(day.getMonth()+1)+'/'+day.getDate();
        if(info.value.date.indexOf(day_time)===-1){
          date_arr.report.push('无记录');
          date_arr.suggest.push('今天没有记录哦');
          date_arr.date.push(day_time)
        }else {
          for (let i in info.value.date) {
            if (info.value.date[i] === day_time) {
              date_arr.report.push(info.value.report[i]);
              date_arr.suggest.push(info.value.suggest[i]);
              date_arr.date.push(day_time)
            }
          }
        }
      }
      //获得时间数组，但是顺序为倒序
      //数据不符合预期要求时，自我改造数据


    const draw=(y=Number,m=Number,d=Number)=>{
        let xAx=[];
        let yAx=[];
        const time = y+'/'+ m+'/'+ d;
        //当前指定的时间
        const date = date_arr.date;
        const mood=['悲伤','哀愁','忧郁','平淡','微笑','喜悦','激动'];
        //这里应该随显示日期变化而变化，而不是当前日期

        for (let i in date){
            if(time == date[i]){
                n.value=i
            }
        }//新取n值




        if(n.value>=6){
            for (let i=0;i<7;i++){
                xAx.push(date[n.value-6+i].slice(5));
                yAx.push(mood[date_arr.report[n.value-6+i]-1]);
            }
        }else {
            for (let i=0;i<7;i++){
                if(i<6-n.value){
                    xAx.push('未记录');
                    yAx.push('空值');
                }else{
                    xAx.push(date[n.value-6+i].slice(5));
                    yAx.push(mood[date_arr.report[n.value-6+i]-1]);
                }
            }
        }
        console.log(xAx,yAx);
        suggest.value=date_arr.suggest[n.value]

        if(myChart != null && myChart != "" && myChart != undefined){
            myChart.dispose();//解决echarts dom已经加载的报错
        }
        myChart = echarts.init(document.getElementById('chart'));
        let option = {
            xAxis:[{
                name:'日期',
                type:'category',
                data:xAx
            }],
            yAxis:[{
                name:'心情',
                type:'category',
                data:mood,
                boundaryGap:false
            }],
            tooltip:{
                show:true,
                axisPointer: {
                    type: 'cross'
                },
                formatter:'{c}'
            },
            series:[
                {
                    type:'line',
                    data:yAx,
                    markLine:{
                        data:[
                            {type:'average'}
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

    const change=(change_time)=>{
        const date1 = new Date(change_time);
        draw(date1.getFullYear(),date1.getMonth()+1,date1.getDate())
    }

</script>

<style lang="scss" scoped>
    .report{
      border-radius: 5px ;
        background-color: #ffffff6e;
        width: 100%;
        margin: auto;
        padding-bottom: 50px;
        .report-body{
            height: 400px;
            margin: 50px auto auto 2px;
            text-align: center;
            display: flex;
            justify-content: space-evenly;
            .report-date{
                border-radius: 5px;
                background-color: #f9f9f9;
                align-items: center;
                flex-direction: column;
                display: flex;
                width: 100%;
                height: 30%;
                min-width: 100px;
                .report-date-child{
                    margin: 5px auto;
                }
            }
            .report-state{
                border-radius: 5px;
                width: 66%;
                height: 100%;
                background-color: azure;
                .report-echarts{
                    height: 250px;
                    width: 500px;
                    margin: auto;
                }
                .report-state-txt{
                    height: 150px;
                    text-align: left;
                    p{
                        text-indent:2em;
                        margin: 10px auto;
                    }
                    .state-txt-title{
                        color: cornflowerblue;
                        font-size: 18px;

                    }
                    .state-txt-txt{
                        font-size: 14px;
                    }
                }
            }
            .report-mark{
                text-align: left;
                border-radius: 5px;
                background-color: #f9f9f9;
                width: 100%;
                height: 68%;
                .report-mark-title{
                    margin: 10px auto;
                    font-size: 18px;
                }
                .report-mark-txt{
                    padding-top: 20px;
                    width: 100%;
                    height: 210px;
                    font-size: 14px;

                    background-color: rgba(0,0,0,0.05);
                    p{
                        line-height: 2rem;
                        height: 2rem;
                        margin-left: 10px;
                        margin-top: 10px;
                        box-shadow: 2px 2px 2px #888888;
                        border-radius: 3px;
                        width: 200px;
                        border:1px solid cornflowerblue;
                    }
                }
            }
        }
    }
    .demo-date-picker {
        display: flex;
        width: 100%;
        padding: 0;
        flex-wrap: wrap;
    }
    .demo-date-picker .block {
        padding: 20px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color-base);
        flex: 1;
    }
    .block{
        width: 100%;
    }
    .demo-date-picker .block:last-child {
        border-right: none;
    }
    .demo-date-picker .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 20px;
    }

    @import "src/assets/global.scss";
</style>