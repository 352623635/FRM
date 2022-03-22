const { port,host}=require('./utils');
const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors');
const session = require('koa-session');

const Router = require('koa-router');
const router = new Router();
const manage = require('./router/manage');
const web = require('./router/web');
const err = require('./router/err');
const static = require('koa-static');
const path = require('path');
const bodyParser =require('koa-bodyparser');

app.keys = ['secret'];   /*cookie的签名*/
const CONFIG = {
    key: 'koa:sess', /** 默认 */
    maxAge: 86400000,  /*  cookie的过期时间        【需要修改】  */
    overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true, /**  true表示只有服务器端可以获取cookie */
    signed: true, /** 默认 签名 */
    rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
};
app.use(session(CONFIG, app));

app.use(cors({ origin:  "http://localhost:8080", // 允许这个域名的 跨域请求
exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 3600,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

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


