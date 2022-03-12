const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

router.get('/404', (ctx, next) => {
    let filePath = path.join(__dirname,"../../static/404.png");
    let file = fs.readFileSync(filePath);
    let mimeTypes = mime.lookup(filePath);
    ctx.set('content-type',mimeTypes);
    ctx.body=file;

});


module.exports = router;