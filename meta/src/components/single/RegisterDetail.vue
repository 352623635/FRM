<template>
    <div class="register">
        <div class="register_box">
            <div style="margin: 10px auto">
                <el-form
                        size="small"
                        style="width: 400px"
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                        label-width="80px"
                        class="demo-ruleForm"
                        :size="formSize"
                >
                    <el-form-item label="账号" prop="user">
                        <el-input placeholder="请输入11位手机号或者邮箱" v-model="ruleForm.user"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                        <el-input placeholder="为自己取一个新名字" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input
                                v-model="ruleForm.pwd"
                                type="password"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input
                                v-model="ruleForm.checkpwd"
                                type="password"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="ruleForm.gender">
                            <el-option label="未知" value="未知"></el-option>
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item lable="头像" prop="avatar">
                        <label style="height: 100px">
                            <input type='file' id="input" accept="image/png, image/bmp, image/jpg, image/jpeg" @change="handleInput" style="display: none">
                            <el-image style="width: 100px;height: 100px" fit="cover" v-model:src="ruleForm.avatar"></el-image>

                        </label>
                        <span id="msg" style="font-size: 15px;margin:auto auto 0 0;display: none;color: yellow">头像上传成功！</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleButton">上传头像</el-button>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
                    </el-form-item>

                    <!--        <el-form-item label="选择上传头像" prop="avatar">-->
                    <!--            <el-input width="300" type="file" v-model="ruleForm.avatar" @change="upload(ruleForm.avatar)">-->
                    <!--            </el-input>-->
                    <!--            <el-image :id="ruleForm.avatar" />-->
                    <!--        </el-form-item>-->
                </el-form>
            </div>

        </div>

    </div>

</template>

<script setup lang="ts">
    import store from '@/store';
    import base64 from '@/components/base64';
    import { reactive, ref ,onMounted} from 'vue';
    import type { ElForm } from 'element-plus';
    import request from "../../utils/request";
    // import sha1 from 'js-sha1';
    const server ='http://127.0.0.1:3001'
    let input=ref();
    let msg = ref();
    // const test = '123123124';
    // console.log(sha1(test));
    type FormInstance = InstanceType<typeof ElForm>

    // const uploadImg = async (e:any)=>{
    //     ruleForm.avatar = await base64.getBase64(e.target.files[0]);
    //     console.log(ruleForm.avatar)
    // };
    const formSize = ref('');
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
        name: '',
        user:'',
        pwd:'',
        checkpwd: '',
        gender: '未知',
        avatar:'',
        avatar_img:''
    })
    onMounted(()=>{
        input.value = document.getElementById('input');
        msg.value = document.getElementById('msg');
    })




    const validatepwd = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入密码！'))
        } else {
            if (ruleForm.checkpwd !== '') {
                if (!ruleFormRef.value) return;
                ruleFormRef.value.validateField('checkpwd', () => null)
            }
            callback()
        }
    }
    const validatepwd2 = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请再次输入密码！'))
        } else if (value !== ruleForm.pwd) {
            callback(new Error("两次密码不一致！"))
        } else {
            callback()
        }
    }

    const check=(rule:any,value:any,callback:any)=>{
        const ph =/^[1][3,4,5,6,7,8][0-9]{9}$/;
        const em = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!ph.test(value)&&!em.test(value)){
            callback(new Error('格式错误,请检查！'))
        }else {
            callback()
        }
    }//格式矫正

    const checkavatar=(rule:any,value:any,callback:any)=>{
        if (value === '') {
            callback(new Error('请传入头像，且最大不超过1M！'))
        }else {
            callback()
        }
    }
    const rules = reactive({
        user:[
            {
                required:true,
                message:'账号不能为空！',
                trigger:'blur'
            },
            {
                validator:check,
                trigger: 'blur'
            }
        ],
        name:[
            {
                required: true,
                message: '昵称不能为空',
                trigger: 'blur',
            },
            {
                min: 1,
                max: 5,
                message: '昵称字符数限制为1到5个字符',
                trigger: 'blur',
            },
        ],
        pwd: [{ validator: validatepwd, trigger: 'blur' }],
        checkpwd: [{ validator: validatepwd2, trigger: 'blur' }],
        gender: [
            {
                required: false,
            },
        ],
        avatar:[
            // {
            //     required:true,
            //     message:'请上传头像',
            //     tirgger:'blur'
            // },
            // {
            //     validator:checkavatar,
            //     tirgger: 'blur'
            // }
        ]
    })

    const handleButton=()=>{
      if(!input.value.files[0]){
        alert('请先选择图片！')
      }else if (input.value.files[0].size > 1024*2048) {
        alert('文件体积过大！')
      } else {
        uploadPic()
        // failure('图片格式错误')
      }
      function uploadPic () {
        let formData = new FormData()
        // 服务端接收文件的参数名，文件数据，文件名
        formData.append('avatar', input.value.files[0], input.value.files[0].name);
        request.post('/web/avatar_upload',formData).then((res:any)=>{
              ruleForm.avatar_img=res.data;
              msg.value.style.display='block';
            }
          // 这里返回的是你图片的地址
          //sever 是你的服务器名前缀，如果接口返回的地址是自带前缀的要自行调整
          //一般来讲接口返回的应该是一个不带前缀的url，因为开发环境和运行环境不能受限制
        ).catch((err:any)=>console.log(err))
      }
      console.log(input.value.files[0])
    }
    const handleInput=async (e:any)=>{
      if (e.target.files[0]){
        if ( e.target.files[0].size>1024000){
          alert("图片大小最高为1M！")
        }else {
          ruleForm.avatar = <string>await base64.getBase64(e.target.files[0]);
          console.log(e.target.files);
        }
      }
    }
    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                console.log(ruleForm);
                store.dispatch("postRegister",
                    {
                        name:ruleForm.name,
                        user:ruleForm.user,
                        pwd:ruleForm.pwd,
                        gender:ruleForm.gender,
                        avatar:ruleForm.avatar_img
                    });
            } else {
                console.log('error submit!');

                return false
            }
        })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

</script>

<style lang="scss" scoped>
    ::v-deep .el-form-item--default{
        margin-bottom: 10px;

    }
    ::v-deep .el-form-item__label{
        color: black;

    }
    .register {

        text-align: center;
        width: 100%;
        height: 400px;

    }
    .register_box{
        text-align: left;
        width: 400px;
        margin: auto;
        border:3px solid cornflowerblue;
        box-shadow: 10px 10px 5px #888888;
        border-radius: 5px;
    }

</style>