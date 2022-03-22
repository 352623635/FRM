const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult} =require('../../utils');
const jwt = require('jsonwebtoken');

router.post('/', async (ctx, next) => {
    const {user,pwd}=ctx.request.body;
    let sql =``;
    let sql1 = ``;
    let user_title='';

    //token返回
    const ph =/^[1][3,4,5,6,7,8][0-9]{9}$/;
    const em = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if(user&&pwd){
        //是否为空
        if(ph.test(user)||em.test(user)){
            if(ph.test(user)){
                user_title='phone';
            }else if(em.test(user)){
                user_title='email'
            }
            //格式校验
            sql=`SELECT name,pwd,id,ms_token,avatar FROM ms_user where ${user_title}='${user}'`;
            const detail= await queryResult(sql);
            console.log(detail)
            if (detail==''){
                ctx.body=returnMsg(400,'账户不存在，请先注册');
                //是否已注册
            }else {
                const password = detail[0].pwd;
                const id = detail[0].id;
                let token = jwt.sign(
                    {id,pwd},'meta_smile',{expiresIn: '10h'}
                );
                if(pwd === password){
                    sql1=`UPDATE ms_user SET ms_token='${token}' where ${user_title}='${user}'`;
                    await queryResult(sql1);

                    const result = (await queryResult(sql))[0];
                    ctx.body=returnMsg(200,'登陆成功',result)
                }else {
                    ctx.body=returnMsg(400,'登陆失败,密码错误！')
                    //密码校验
                }
            }
        }
        else {
            ctx.body=returnMsg(400,'账号格式错误！');
        }
    }else {
        ctx.body=returnMsg(400,'账号或者密码为空！');
    }
});


module.exports = router;