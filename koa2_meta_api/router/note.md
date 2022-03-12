#koa2开发接口笔记
##day1
```
-koa初始化
$ npm init -y
$ npm i koa2 -S
$ npm i nodemon -D
$ npm install requirejs
$ npm i koa-router
//热更新，配置启动项,package的scripts内，nodemon app.js

```
```js
//新建app.js
//安装require
const Koa = require('koa2');
//基本都使用require引入
const app = new Koa();

app.use(async (ctx,next)=>{
    ctx.body="ssss";
    //next()指向下一个行为，与await组合使用可以更进一步控制行为进程
});


app.listen(3001,()=>{
    console.log(`3001`)
});

//洋葱模型
```

```js
//用ultils.js管理地址
let host ='127.0.0.1';
let port ='3001';
module.exports={
    host,port
};
//在app.js种引入使用
const { port,host}=require('./utils');
app.listen(port,()=>{
    console.log(`${host}:${port}`)
});
```

```js
//路由拆分
//app.js
const manage = require('./index');
router.use('/manage', manage.routes(), router.allowedMethods());


const web = require('./index');
router.use('/web', web.routes(), router.allowedMethods());

//分页面
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'sssss'
// ctx.router available
});


module.exports = router;
```

```js
//路由重定向
router.redirect('/','/manage')
```

```
跨域
http:// 127.0.0.1 :8080
即使是同一台服务器，当前端与后端运行于不同的端口下，都要进行跨域处理

后端解决跨域问题相对简单

$ npm i koa2-cors
```

```js
//配置静态文件地址与返回静态文件的区别
app.use(static(path.join(__dirname,'static')));
//静态资源重写路径 前缀/404.png,前端可以直接使用文件
//app.js
app.use(async (ctx,next)=>{
    await next();
    if (parseInt(ctx.status)===404){
        ctx.response.redirect('/err/404')
    }

});
//404
//可以直接展示文件，不分前后端
const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

router.get('/404', (ctx, next) => {
    let filePath = path.join(__dirname,"../../static/404.png");
    let file = fs.readFileSync(filePath);
    let mimeTypes = mime.lookup(filePath);
    ctx.set('content-type',mimeTypes);
    ctx.body=file;

});


module.exports = router;
```

``` 
//安装mysql支持
$ npm install mysql
```

```js
//链接池设定utils.js
let host ='127.0.0.1';
let port ='3001';
const mysql = require('mysql');
const  pool = mysql.createPool(({
    host :'127.0.0.1',
    port :3306,
    database:'ms_user_info',
    user:'lfp',
    password:'lfp680'
}));
const query=(sql,callback)=>{
    pool.getConnection(function (err,connection) {
        connection.query(sql,function (err,rows) {
            callback(err,rows);
            connection.release()
        })
    })
};
module.exports={
    host,port,query
};
```
```js
//web的index.js内示例如何书写

const Router = require('koa-router');
const router = new Router();
const {query} = require('../../utils');

router.get('/', async  (ctx, next) => {
    let result=await new Promise((resolve,reject)=>{
        query(`SELECT * FROM ms_user`,(err,rows)=>{
            if (err) reject(err);
            resolve(rows)
        })
    });

    ctx.body=result

});


module.exports = router;
```

```
引入bodyparser
$ npm install koa-bodyparser
```

#####注册逻辑
1.检测name、phone以及email传入数据是否完整；
2.检测信息是否重复；
3.若无头像，则赋予默认头像，若有头像，则赋予头像；生成token，将部分信息返回给前端；
#####登录逻辑
1.检测值是否完整；
2.检测pwd是否对应；
3.生成token并进行双向传递
#day2
```js
ctx.body=ctx.request.query;//post
ctx.body=ctx.request.body;//get
```
```
token由本地上传，进行鉴权，存储在session中；
每一个接口都需要token
```

```js
const jwt = require('jsonwebtoken');
const token = ctx.request.headers.token;
let result=jwt.verify(token,'meta_smile');
ctx.body=result;
//token 解包
```

#day3
#####前端封装token
```js
//vue二次封装axios在请求头中加入token，所有需要token的接口都用同样的方式
//不需要token的位置不需要引用这个封装，可以直接用axios，例如登录和注册
import axios from "axios";
let request= axios.create({
    baseURL:"http://127.0.0.1:3001",
    timeout:6000
});

request.interceptors.request.use(
    config=>{
        if(sessionStorage.token){
            config.headers.token=sessionStorage.token;
        }
        return config;
    },error => {
        console.log(error);
        return error;
    }
);
export default request;

//引用方式
import request from 'xxx/request';
request.get(url,{prams:{data}} );

```
#####修改用户信息逻辑
1.用token中携带的信息进行查值，可以省去传值步骤也更安全，要求前端将token封装进headers；
2.查出pwd与传入的信息共同生成新的token；
3.检测传入值，不允许含有空值；
4.数据更新，再取出数据，并返回信息；
5.细节：不允许重复信息


#####图片上传逻辑
1.token信息；
2.协定字段，一般为xxx_时间戳；
3.判断文件是否符合规则：
    大小，上传数量，图片名字设置，图片存入路径，用户信息；
4.前端：组件调用，传入时要求格式
```js
//重中之重，图片上传

```

#day4
######图片上传接口开发
```
引入multer
$ npm install @koa/multer multer
```
```js
const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');
const multer = require('@koa/multer');
const path = require('path');



const storage=multer.diskStorage({
    destination:path.join(__dirname,"../../static/avatar"),
    filename:(req,file,cb)=>{

        let myFileName = `${file.fieldname}_${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`;
        cb(null,myFileName);
    }
});
const limits={
    fieldSize:1024 * 2048,
    fields:1,
    files:1
};
let upload = multer({storage,limits});

router.post('/',upload.single('avatar'),ctx=>{
    
    ctx.body='/avatar/'+ctx.file.filename;
});


module.exports = router;
```

```
postman中的传值方式为，body中，form-data选择图片
```
```html
//前端组件代码
<template>
    <el-upload
            ref="upload"
            class="upload-demo"
            action="http://127.0.0.1:3001/web/essay_img_upload"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            name="essay"
    >
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload"
        >upload to server</el-button
        >
        <template #tip>
            <div class="el-upload__tip" style="color: red">
                limit 1 file, new file will cover the old file
            </div>
        </template>
    </el-upload>
</template>

<script setup>
    import { ref } from 'vue'
    const upload = ref();

    const handleExceed = (files) => {
        upload.value.clearFiles();
        upload.value.handleStart(files[0])
    };
    const submitUpload = () => {
        upload.value.submit()
    }
</script>

```

```
//tinymce富文本编辑器中，将此接口修改为下面这个形式
//可以实现将图片上传并返回正确的url值，但是缺点时不可以笼统的复制某个文本，因为此时不能上传图片
images_upload_handler: function (blobInfo, success, failure) {
                        if (blobInfo.blob().size > 1024*2048) {
                            failure('文件体积过大')
                        }
                        // if (self.accept>= 0) {
                        //     uploadPic()
                        // }
                        else {
                            uploadPic()
                            // failure('图片格式错误')
                        }
                        function uploadPic () {
                            let formData = new FormData()
                            // 服务端接收文件的参数名，文件数据，文件名
                            formData.append('essay', blobInfo.blob(), blobInfo.filename());
                            request.post('/web/essay_img_upload',formData).then((res) => {
                                // 这里返回的是你图片的地址
                                success(server+res.data)
                        //sever 是你的服务器名前缀，如果接口返回的地址是自带前缀的要自行调整
                        //一般来讲接口返回的应该是一个不带前缀的url，因为开发环境和运行环境不能受限制
                            })
                                .catch(() => {
                                    failure('上传失败')
                                })
                        }
                    },
```

```
富文本编辑器生成的html代码必定包含双引号，在传入后端的时候会出现冲突
```
#day5
#####今日踩坑：
######1.mysql8之中不支持order by，要使用group by


#day6

```
//git 命令

git init    或者  git clone [url]
//初始化本地

ssh-keygen -t rsa -C "youremail@example.com"
//远程连接，发送密钥然后在github的setting中，找到ssh新建连接，将_rsa.pub复制进去

git remote add origin git@github.com:tianqixin/runoob-git-test.git
//连接远程仓库

git branch
//列出分支，后接名字可以创建分支

git checkout test
//切换分支

git merge test
//分支合并

git add .
git commit -m ""
got push
```

#####服务器运行的koa2接口框架处于冷处理而不是热更新