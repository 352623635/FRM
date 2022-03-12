const { port,host}=require('./utils');
const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors');


const Router = require('koa-router');
const router = new Router();
const manage = require('./router/manage');
const web = require('./router/web');
const err = require('./router/err');
const static = require('koa-static');
const path = require('path');
const bodyParser =require('koa-bodyparser');

app.use(cors());
app.use(bodyParser());
router.use('/manage',manage.routes(),router.allowedMethods());
router.use('/web',web.routes(),router.allowedMethods());
router.use('/err',err.routes(),router.allowedMethods());

app.use(static(path.join(__dirname,'static')));
//静态资源重写路径 前缀/404.png

app.use(async (ctx,next)=>{
    await next();
    if (parseInt(ctx.status)===404){
        ctx.response.redirect('/err/404')
    }

});
app.use(router.routes()).use(router.allowedMethods());




app.listen(port,()=>{
    console.log(`${host}:${port}`)
});


