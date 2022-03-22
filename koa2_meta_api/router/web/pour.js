const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult} =require('../../utils');

router.get('/pour_index', async (ctx, next) => {

    let PourIndex={
        "new":[],
        "hot":[],
    };
    const sql1 = `select * from (select * from ms_pour where update_time <= str_to_date(now(),'%Y-%m-%d %H:%i:%s') order by update_time desc) as total limit 0,8`;
    const sql2 = `select * from (select * from ms_pour order by hot desc) as total limit 0,4`;
    // const sql2 = `select * from ms_pour order by hot desc`
    PourIndex.new=await queryResult(sql1);
    PourIndex.hot=await queryResult(sql2);
    ctx.body=PourIndex;
});

router.get('/pour_body', async (ctx, next) => {
    const id =ctx.query.id;
    let PourBody={
        'obj':[],
        'cri':[]
    };
    const sql1 = `select * from ms_pour where pour_id=${id}`;
    const sql2 = `select * from ms_pour_cri where pour_id=${id} order by 'like' desc`;
    PourBody.obj=await queryResult(sql1);
    PourBody.cri=await queryResult(sql2);
    ctx.body=PourBody;
});

router.get('/pour_cri', async (ctx, next) => {
    const id =ctx.query.id;
    const sql1 = `select * from ms_pour_cri where pour_id=${id} order by 'like' desc`;
    ctx.body=await queryResult(sql1);
});

module.exports = router;