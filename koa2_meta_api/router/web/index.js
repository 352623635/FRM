const Router = require('koa-router');
const router = new Router();
const {query} = require('../../utils');
const login = require('./login');
const register = require('./register');
const essay = require('./essay');
const pour = require('./pour');
const user = require('./user');
const avatar = require('./avatar_upload');
const essay_img_upload = require('./essay_img_upload');
const img_delect = require('./img_delect');

router.get('/', async  (ctx, next) => {
    let result=await new Promise((resolve,reject)=>{
        query(`SELECT * FROM ms_user`,(err,rows)=>{
            if (err) reject(err);
            resolve(rows)
        })
    });

    ctx.body=result

});

router.use('/login',login.routes(),login.allowedMethods());
router.use('/register',register.routes(),register.allowedMethods());
router.use('/essay',essay.routes(),essay.allowedMethods());
router.use('/pour',pour.routes(),pour.allowedMethods());
router.use('/user',user.routes(),user.allowedMethods());
router.use('/avatar_upload',avatar.routes(),avatar.allowedMethods());
router.use('/essay_img_upload',essay_img_upload.routes(),essay_img_upload.allowedMethods());
router.use('/img_delect',img_delect.routes(),img_delect.allowedMethods());
module.exports = router;