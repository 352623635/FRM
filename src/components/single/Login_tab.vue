<template>
    <el-button v-if="!store.state.session.user" type="primary" style="margin-left: 16px" @click="log_tab = true">
        登录
    </el-button>
    <div v-else style="height:40px;width: 100px;color: #3d546f">
        <div class="drop" style="height:40px;width: 100%;">
            <!--              栏目宽度控制区，默认100%-->
            <a>{{store.state.session.user}}</a>
            <div class="drop_con">
                <div v-for="link_child in link">
                    <div class="child-tab">
                        <button @click="link_child.url">
                            {{link_child.name}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <el-drawer size="40%" v-model="log_tab" direction="ttb" title="登录">
        <el-form
                size="large"
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="Account">
                <el-input
                        v-model="ruleForm.Account"
                        autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fun_login(),log_tab=false"
                >登录</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>
        </el-form>
        <el-form-item>
            <div>如果您还没有账户，请先
                <span @click="log_tab=false,reg_tab=true" style="color: #207ab7">注册</span>
            </div>
        </el-form-item>
    </el-drawer>

    <el-drawer size='40%' v-model="reg_tab" direction="ttb" title="注册">
        <el-form
                size="large"
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="Account_reg">
                <el-input
                        v-model="ruleForm.Account_reg"
                        autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="密码" prop="pass_reg">
                <el-input v-model="ruleForm.pass_reg" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="pass_reg_check">
                <el-input v-model="ruleForm.pass_reg_check" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                >注册</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>
        </el-form>
        <el-form-item>
            <div>已有账户，去
                <span @click="log_tab=true,reg_tab=false" style="color: #207ab7">登录</span>
            </div>
        </el-form-item>
    </el-drawer>
</template>

<script lang="ts" setup>
    import { reactive,ref } from 'vue'
    const is_login = ref(false)
    const log_tab = ref(false)
    const reg_tab = ref(false)
    import axios from "axios";
    import store from "@/store";

    import type { FormInstance } from 'element-plus'

    const ruleFormRef = ref<FormInstance>()

    //表单赋值和验证
    const ruleForm = reactive({
        pass: '',
        Account: '',
        Account_reg:'',
        pass_reg:'',
        pass_reg_check:''
    })
    const validatePass = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password'))
        } else {
            if (ruleForm.Account !== '') {
                if (!ruleFormRef.value) return
                ruleFormRef.value.validateField('Account', () => null)
            }
            callback()
        }
    }
    const validateAccount = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input your account'))
        }
        // else if (value !== ruleForm.pass) {
        //     callback(new Error("Two inputs don't match!"))
        // } else {
        //     callback()
        // }
    }
    const validateAccount_reg = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input your account'))
        }
        // else if (value !== ruleForm.pass) {
        //     callback(new Error("Two inputs don't match!"))
        // } else {
        //     callback()
        // }
    }
    const validatePass_reg = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password'))
        } else {
            if (ruleForm.Account !== '') {
                if (!ruleFormRef.value) return
                ruleFormRef.value.validateField('Account', () => null)
            }
            callback()
        }
    }
    const validatePass_reg_check = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password again'))
        }
        else if (value !== ruleForm.pass_reg) {
            callback(new Error("Two inputs don't match!"))
        } else {
            callback()
        }
    }

    const rules = reactive({
        Account: [{ validator: validateAccount, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],

        Account_reg: [{ validator: validateAccount_reg, trigger: 'blur' }],
        pass_reg:[{ validator: validatePass_reg, trigger: 'blur' }],
        pass_reg_check:[{ validator: validatePass_reg_check, trigger: 'blur' }]
    })

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                console.log('submit!')
            } else {
                console.log('error submit!')
                return false
            }
        })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    //登录和注册请求
    const fun_login=()=> {
        axios.post(
            '/api/api/login',
            {user: ruleForm.Account, pwd: ruleForm.pass}
        ).then(res => {
            window.sessionStorage.setItem('token',res.data.data.ms_token)
            window.sessionStorage.setItem('user',res.data.data.name)
            is_login.value=true
            window.location.reload();
        })
    }

    //下拉菜单展示
    const log_out = ()=>{
        window.sessionStorage.clear();
        window.location.reload();
    }
    const link=[
        {
            url:'',
            name:'个人中心'
        },
        {
            url:'',
            name:'消息'
        },
        {
            url:log_out,
            name:'退出登录'
        },
    ]

</script>

<style lang="scss" scoped>

    .drop{
        text-indent: 0 ;
        position: relative;
        display: inline-block;
        margin: 10px;

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
        border-radius:3px;
    }
    .drop:hover .drop_con{
        border-radius:3px;
        display:block;
        z-index: 9999;
        .child-tab{
            height: 30px;
        }
        .child-tab:hover{
            background-color: #d9edf7;
            border-radius:3px;

        }
        button{
            background-color: rgba(255,255,255,0);
            border-width: 0;
            width: 100%;
            height: 100%;
            border-radius:3px;
        }
    }
</style>
