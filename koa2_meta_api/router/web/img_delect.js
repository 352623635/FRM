const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');
const fs = require('fs')
const path = require('path');
router.post('/',async (ctx)=>{

    const img_url = ctx.request.body.url;
    const n = img_url.lastIndexOf('/');
    const url = img_url.substring(0,n+1);
    if(fs.existsSync(path.join(__dirname,`../../static${img_url}`))){
        await fs.unlink(`${__dirname}../../../static${img_url}`,err => {
                if (err) throw err;
            })
        ctx.body=returnMsg(200,'删除成功！');
    }else {
        ctx.body=returnMsg(400,'文件不存在！');
    }
    // if (fs.existsSync(url)) {    //判断给定的路径是否存在

    //     files = fs.readdirSync(url);    //返回文件和子目录的数组
    //
    //     files.forEach(function (file, index) {
    //
    //         const curPath = path.join(url, file);
    //         if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
    //         } else {
    //
    //             if (file.indexOf(name) > -1) {    //是指定文件，则删除
    //                 fs.unlinkSync(curPath);
    //                 console.log("删除文件：" + curPath);
    //             }
    //         }
    //     });
    // } else {
    //     console.log("给定的路径不存在！");
    // }
})


module.exports = router;