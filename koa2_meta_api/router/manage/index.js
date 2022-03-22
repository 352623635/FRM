const Router = require('koa-router');
const code = require("./code");
const router = new Router();


router.use('/code',code.routes(),code.allowedMethods());


module.exports = router;