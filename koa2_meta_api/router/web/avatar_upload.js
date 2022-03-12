const Router = require('koa-router');
const router = new Router();
const {returnMsg,queryResult,jwtVer} =require('../../utils');
const multer = require('@koa/multer');
const path = require('path');


const storage=multer.diskStorage({
    destination:path.join(__dirname,"../../static/avatar"),
    filename:(req,file,cb)=>{
        let myFileName = `${file.fieldname}_${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`;
        cb(null,myFileName);
    }
});
const limits={
    fieldSize:1024 * 2048,
    fields:1,
    files:1
};
let upload = multer({storage,limits});

router.post('/',upload.single('avatar'),ctx=>{
    ctx.body='/avatar/'+ctx.file.filename;
});


module.exports = router;