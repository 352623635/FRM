const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');

router.get('/essay_index', async (ctx, next) => {

    let EssayIndex={
        "new":[],
        "hot":[],
        "type1":[]
    };
    const sql1 = `select * from (select * from ms_essay where update_time <= str_to_date(now(),'%Y-%m-%d %H:%i:%s') group by update_time desc) as total limit 0,4`;
    const sql2 = `select * from (select * from ms_essay group by hot desc) as total limit 0,4`;
    const sql3 = `select * from (select * from ms_essay where type like '自我治愈%' group by hot desc) as total limit 0,4`;
    EssayIndex.new=await queryResult(sql1);
    EssayIndex.hot=await queryResult(sql2);
    EssayIndex.type1=await queryResult(sql3);
    ctx.body=EssayIndex;
});

router.get('/essay_body', async (ctx, next) => {
    const id =ctx.query.id;
    let EssayBody={
        'essay':[],
        'cri':[]
    };
    const sql1 = `select * from ms_essay where essay_id=${id}`;
    const sql2 = `select * from ms_essay_cri where essay_id=${id} group by update_time desc`;
    EssayBody.essay=await queryResult(sql1);
    EssayBody.cri=await queryResult(sql2);
    ctx.body=returnMsg(200,'成功',EssayBody);
});

router.get('/essay_cri', async (ctx, next) => {
    const id =ctx.query.id;
    const sql1 = `select * from ms_essay_cri where essay_id=${id} group by update_time desc`;
    ctx.body=await queryResult(sql1);
});

router.post('/essay_upload',async ctx=>{
    let id='';
    if (jwtVer(ctx.request.headers.token)){
        id=jwtVer(ctx.request.headers.token).id
    }else {
        ctx.body=returnMsg(400,'登录信息过期或用户不存在，请重新登录！');
        return ;
    }
    const img=ctx.request.body.img;
    const title = ctx.request.body.title;
    const text = ctx.request.body.text;
    const type = ctx.request.body.type;
    const preface = ctx.request.body.preface;
    if(!img||!text||!title||!type||!preface){
        ctx.body=returnMsg(400,'存在空值，请前端检测代码！');
        return ;
    }
    const sql = `INSERT INTO ms_essay (uid,img,title,text,type,preface) VALUES (${id},'${img}','${title}','${text}','${type}','${preface}')`;
    const result= await queryResult(sql);
    ctx.body=result;
})

module.exports = router;