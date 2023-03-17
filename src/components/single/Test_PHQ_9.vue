<template>
    <div class="PHQ_list">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="序号" width="180" >
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id+1}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="项目" width="400">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.test }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="选项">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-select v-model="value[scope.row.id]" class="m-2" placeholder="Select" size="large" @change="change()">
                            <el-option
                                    v-for="item in scope.row.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            />
                        </el-select>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="PHQ_res" v-if="!isNaN(result)">
            <div>{{res_text}}</div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const value = ref(['','','','','','','','',''])

    const options = [
            {label:"没有",value:0},
            {label:"有几天",value:1},
            {label:"一半时间以上",value:2},
            {label:"几乎每天",value:3},
        ]
    const tableData = [
        {
            id: 0,
            test: '做事时提不起劲或没有兴趣',
            options: options
        },
        {
            id: 1,
            test: '感到心情低落，沮丧或感到绝望',
            options: options
        },
        {
            id: 2,
            test: '入睡困难、睡不安或睡得过多',
            options: options
        },
        {
            id: 3,
            test: '感觉疲倦或没有活力',
            options: options
        },
        {
            id: 4,
            test: '食欲不振或吃太多',
            options: options
        },
        {
            id: 5,
            test: '觉得自己很糟或觉得自己很失败，或让自己、家人失望',
            options: options
        },
        {
            id: 6,
            test: '对事物专注有困难，例如看电视或看报纸时',
            options: options
        },
        {
            id: 7,
            test: '行动或说话速度缓慢到能被察觉，或者刚好相反，变得比平日更烦躁或坐立不安、动来动去',
            options: options
        },
        {
            id: 8,
            test: '有不如死掉或用某种方式伤害自己的念头',
            options: options
        },
    ]
    const sum = ()=>{
        let n = 0;
        if (value.value.indexOf('')===-1){
            for (let i=0;i<value.value.length;i++){
                n+=value.value[i];
            }
            return n
        }else {
            return NaN
        }
    }
    const result=ref(NaN)
    const res_text=ref('')
    const change=()=>{
        result.value=sum();
        if (!isNaN(result.value)){
            if (0<=result.value&&result.value<5){
                res_text.value="没有抑郁症症（注意自我保护）"
            }
            else if (5<=result.value&&result.value<10){
                res_text.value="可能有轻度抑郁症（建议咨询心理医生或心理医学工作者）"
            }
            else if (10<=result.value&&result.value<15){
                res_text.value="可能有中度抑郁症（最好咨询心理医生或心理医学工作者）"
            }
            else if (15<=result.value&&result.value<20){
                res_text.value="可能有中重度抑郁症（建议咨询心理医生或精神科医生）"
            }
            else if (20<=result.value){
                res_text.value="可能有重度抑郁症（一定要抓紧看心理医生或精神科医生）"
            }
        }

    }
</script>

<style lang="scss" scoped>
    .PHQ_res{
        padding:20px;
    }
</style>