const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');

router.get('/essay_index', async (ctx, next) => {

    let EssayIndex={
        "new":[],
        "hot":[],
        "self":[],
        "teach":[],
        "since":[],
        "mood":[],
        "none":[]
    };
    const sql1 = `select * from (select * from ms_essay where update_time <= str_to_date(now(),'%Y-%m-%d %H:%i:%s') order by update_time desc) as total limit 0,4`;
    const sql2 = `select * from (select * from ms_essay order by hot desc) as total limit 0,4`;
    const sql3 = `select * from (select * from ms_essay where type like '关于自我%' order by hot desc) as total limit 0,4`;
    const sql4 = `select * from (select * from ms_essay where type like '教育%' order by hot desc) as total limit 0,4`;
    const sql5 = `select * from (select * from ms_essay where type like '科普%' order by hot desc) as total limit 0,4`;
    const sql6 = `select * from (select * from ms_essay where type like '情绪%' order by hot desc) as total limit 0,4`;
    const sql7 = `select * from (select * from ms_essay where type like '无%' order by hot desc) as total limit 0,4`;
    EssayIndex.new=await queryResult(sql1);
    EssayIndex.hot=await queryResult(sql2);
    EssayIndex.self=await queryResult(sql3);
    EssayIndex.teach=await queryResult(sql4);
    EssayIndex.since=await queryResult(sql5);
    EssayIndex.mood=await queryResult(sql6);
    EssayIndex.none=await queryResult(sql7);
    ctx.body=EssayIndex;
});

router.get('/essay_body', async (ctx, next) => {
    const id =ctx.query.id;
    let EssayBody={
        'essay':[],
        'cri':[],
        'author':[]
    };
    const sql1 = `select * from ms_essay where essay_id=${id}`;
    const sql2 = `select * from ms_essay_cri where essay_id=${id} order by update_time desc`;
    EssayBody.essay=await queryResult(sql1);

    if (EssayBody.essay.length!==0){
        EssayBody.cri=await queryResult(sql2);
        const uid = EssayBody.essay[0].uid;
        const sql3 = `SELECT name,avatar,id FROM ms_user WHERE id=${uid}`;
        EssayBody.author=await queryResult(sql3);
        ctx.body=returnMsg(200,'成功',EssayBody);
    }else {
        ctx.body=returnMsg(400,'文章不存在或已被删除！')
    }


});

router.get('/essay_cri', async (ctx, next) => {
    const id =ctx.query.id;
    const sql1 = `select * from ms_essay_cri where essay_id=${id} order order by update_time desc`;
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

    const title = ctx.request.body.title;
    const text = ctx.request.body.text;
    const type = ctx.request.body.type;
    const preface = ctx.request.body.preface;
    if(!text||!title||!type||!preface){
        ctx.body=returnMsg(400,'存在空值，请前端检测代码！');
        return ;
    }
    const sql1 = `SELECT title FROM ms_essay WHERE title='${title}'`;
    const isDefined = await queryResult(sql1)
    if (isDefined==''){
        const sql = `INSERT INTO ms_essay (uid,title,text,type,preface) VALUES (${id},'${title}','${text}','${type}','${preface}')`;
        const result= await queryResult(sql);
        ctx.body=returnMsg(200,'上传成功',result);
    }else {
        ctx.body=returnMsg(400,'标题已存在，请修改后上传！');
    }

})
//文章上传
router.post('/essay_update',async ctx=>{
    let id='';
    if (jwtVer(ctx.request.headers.token)){
        id=jwtVer(ctx.request.headers.token).id
    }else {
        ctx.body=returnMsg(400,'登录信息过期或用户不存在，请重新登录！');
        return ;
    }
    const essay_id  = ctx.request.body.essay_id;
    const title = ctx.request.body.title;
    const text = ctx.request.body.text;
    const type = ctx.request.body.type;
    const preface = ctx.request.body.preface;
    if(!text||!title||!type||!preface){
        ctx.body=returnMsg(400,'存在空值，请前端检测代码！');
        return ;
    }
    const sql = `SELECT uid FROM ms_essay WHERE essay_id=${essay_id}`;//查询信息
    const sql1 = `SELECT title FROM ms_essay WHERE title='${title}'`;
    const uid_check = await queryResult(sql);
    const isDefined = await queryResult(sql1);
    if ((isDefined.length===1&&isDefined[0].title===title)||isDefined.length===0){
        if(id===uid_check[0].uid){
            const sql2 =`UPDATE ms_essay SET title='${title}',text='${text}',type='${type}',preface='${preface}'  WHERE essay_id='${essay_id}'`
            const result= await queryResult(sql2);
            ctx.body=returnMsg(200,'更新成功',result);
        }
        //查重，如果出现被占用就报错
        else {
            ctx.body=returnMsg(400,'您不是作者，无权编辑！');
        }
    }else {
        ctx.body=returnMsg(400,'标题已存在，请修改后上传！');
    }
})
//文章修改
router.post('/essay_delete',async ctx=>{
    let id='';
    if (jwtVer(ctx.request.headers.token)){
        id=jwtVer(ctx.request.headers.token).id
    }else {
        ctx.body=returnMsg(400,'登录信息过期或用户不存在，请重新登录！');
        return ;
    }
    const essay_id  = ctx.request.body.essay_id;
    if (!essay_id){
        ctx.body=returnMsg(400,'请传入值，不可留空！')
    }
    const sql = `SELECT uid FROM ms_essay WHERE essay_id in (${essay_id})`;//查询信息

    const uid_check = await queryResult(sql);
    if(id===uid_check[0].uid){
        const sql1 =`DELETE FROM ms_essay WHERE essay_id in (${essay_id})`;
        await queryResult(sql1);
        ctx.body=returnMsg(200,'删除成功！');
    }
    //查重，如果出现被占用就报错
    else {
        ctx.body=returnMsg(400,'您不是作者，无权编辑！');
    }
    ctx.body=essay_id
})
//文章删除
module.exports = router;