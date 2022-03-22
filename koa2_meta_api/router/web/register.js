const Router = require('koa-router');
const router = new Router();
const {returnMsg,query,queryResult} =require('../../utils');

router.post('/', async  ctx => {


    let {name,code,pwd,gender,user,avatar}=ctx.request.body;
    const mark = null;
    const ph =/^[1][3,4,5,6,7,8][0-9]{9}$/;
    const em = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;


    // ctx.body={phone,email}
    const sql = `SELECT * FROM ms_user where email='${user}' or phone='${user}' or name='${name}'`;
    let sql1=``;
    if(ph.test(user)){
        sql1=`INSERT INTO ms_user (name,pwd,gender,phone,avatar,mark) VALUES ('${name}','${pwd}','${gender}','${user}','${avatar}',${mark})`;

    }else if(em.test(user)){
        sql1=`INSERT INTO ms_user (name,pwd,gender,email,avatar,mark) VALUES ('${name}','${pwd}','${gender}','${user}','${avatar}',${mark})`;
        console.log(ctx.session.code);
        if (Date.now()-ctx.session.code[0]>300000){
            ctx.body=returnMsg(400,'验证码已过期，请重新发送！');
            return;
        }else if (code.toString()!==ctx.session.code[1]){
            ctx.body = returnMsg(400,'验证码错误，请重新输入！');
            return;
        }
    }
    if(ph.test(user)||em.test(user)){

        let isFirst= await queryResult(sql);

        if(isFirst==''){
            let result= await queryResult(sql1);
            ctx.body=returnMsg(200,"注册成功")
        }else {
            ctx.body=returnMsg(400,"昵称、手机号或邮箱已被注册！")
        }

    }else {
        ctx.body=returnMsg(400,"失败","账号类型错误，既不是手机号也不是邮箱！")
    }
});

router.post('/test',async ctx=>{
    ctx.body=ctx.session.code;
})

module.exports = router;