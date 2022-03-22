const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');
const nodemailer = require('nodemailer');


const mailTransport = nodemailer.createTransport({
    service : '163',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'lfpmeta@163.com',
        pass : 'OASSFPOPDOURZQHJ'
    },
});


router.post('/email', async ctx=> {
    // if(ctx.session!=''){
    //     if (Date.now()-ctx.session.code[0]<6000){
    //         ctx.body=returnMsg(400,'验证码发送频繁，请一分钟后再试！')
    //         return;
    //     }
    // }
    const {email} = ctx.request.body;
    const code = Math.random().toString().slice(2,6);
    const time = Date.now();
    const options = {
        from        : '"Meta Smile开发者" <lfpmeta@163.com>',
        to          : email,
            // ' "用户2" <邮箱地址2>',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : '一封来自Meta Smile的邮件',
        text          : '一封来自Meta Smile的邮件',
        html           : `<p>欢迎注册Meta Smile</p><p>您的验证码是:${code}</p>`,
        // attachments :
        //     [
        //         {
        //             filename: 'img1.png',            // 改成你的附件名
        //             path: 'public/images/img1.png',  // 改成你的附件路径
        //             cid : '00000001'                 // cid可被邮件使用
        //         },
        //         {
        //             filename: 'img2.png',            // 改成你的附件名
        //             path: 'public/images/img2.png',  // 改成你的附件路径
        //             cid : '00000002'                 // cid可被邮件使用
        //         },
        //     ]
    };

    try{
        await mailTransport.sendMail(options);
        ctx.session.code = [time,code];
        ctx.body=returnMsg(200,'发送成功！');
    }catch (e) {
        ctx.body=e;
    }
});







module.exports = router;