const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');
const jwt = require('jsonwebtoken');

router.post('/',async ctx=>{
    const {user}=ctx.request.body;
    const sql1 = `select name,avatar,id from ms_user where id=${user}`;
    ctx.body=(await queryResult(sql1))[0];
})//主页评论模块的简单信息；

router.get('/user_self',async ctx=>{
    let id='';
    if (jwtVer(ctx.request.headers.token)){
        id=jwtVer(ctx.request.headers.token).id
    }else {
        ctx.body=returnMsg(400,'登录信息过期或用户不存在，请重新登录！');
        return ;
    }
    const sql = `SELECT name,email,phone,gender,mark,avatar FROM ms_user WHERE id=${id}`;
    const result=await queryResult(sql);
    ctx.body= result;
})
//个人主页信息
router.post('/mood', async (ctx, next) => {
    const {user}=ctx.request.body;
    let Mood={
        "date":[],
        "report":[],
        "mark":{},
        "suggest":[]
    };
    const sql1 = `select * from ms_mood where uid=${user}`;
    const data = await queryResult(sql1);
    for(let i=0;i<data.length;i++){
        let date =new Date(data[i].update_time);
        Mood.report.push(data[i].mood);
        Mood.date.push(date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate());
        Mood.suggest.push(data[i].suggest)
    }
    const sql2 = `select mark from ms_user where id=${user}`;
    Mood.mark=await queryResult(sql2);
    ctx.body=Mood;
});
//个人情绪表
router.post('/user_update',async ctx=>{
    let id='';
    if (jwtVer(ctx.request.headers.token)){
        id=jwtVer(ctx.request.headers.token).id
    }else {
        ctx.body=returnMsg(400,'登录信息过期或用户不存在，请重新登录！');
        return ;
    }
    const name=ctx.request.body.name;
    const gender=ctx.request.body.gender;
    const avatar=ctx.request.body.avatar;
    if(!name||!gender||!avatar){
        ctx.body=returnMsg(400,'存在空值，请前端检查代码！');
        return
    }
    const check_sql=`SELECT id FROM ms_user WHERE name='${name}'`;
    const check =await queryResult(check_sql);
    if (check.length>1||(check.length===1&&check[0].id!==id)){
        ctx.body=returnMsg(400,'昵称已被占用，请检查后重新传入！');
        return ;
    }
    //不允许信息重复

    const sql= `SELECT pwd FROM ms_user WHERE id=${id}`;
    //用token携带的id查出pwd，将pwd拉入token中
    const pwd = (await queryResult(sql))[0].pwd;
    let token = jwt.sign(
        {id,pwd},'meta_smile',{expiresIn: '10h'}
    );
    //更新值，包括刚刚生成的token
    const sql1 = `UPDATE ms_user SET name='${name}',gender='${gender}',avatar='${avatar}',ms_token='${token}'  WHERE id=${id}`;
    await queryResult(sql1);
    // 取出值，包括刚刚存入的token
    const sql2=`SELECT name,email,phone,gender,mark,avatar,ms_token FROM ms_user WHERE id=${id}`;
    const result=await queryResult(sql2);
    ctx.body=returnMsg(200,'修改信息成功！',result);
    //在前端要求所有字段
});
//个人主要信息更新，同时也会更新token值，会返回前端session中要求的所有数据
router.get('/user_all_text',async ctx =>{
    const id = ctx.query.id;
    let Text={
        essay:[],
        pour:[]
    }
    const sql = `SELECT essay_id,title,type,preface,hot FROM ms_essay WHERE uid=${id}`;
    const sql1 = `SELECT * FROM ms_pour WHERE uid=${id}`;
    Text.essay = await queryResult(sql);
    Text.pour =await queryResult(sql1);
    ctx.body=Text;
})


module.exports = router;