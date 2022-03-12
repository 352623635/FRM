const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body='sssss'
// ctx.router available
});


module.exports = router;