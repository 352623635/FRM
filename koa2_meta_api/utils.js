let host ='127.0.0.1';
let port ='3001';
const mysql = require('mysql');
const  pool = mysql.createPool(({
    host :'127.0.0.1',
    port :3306,
    database:'ms_data',
    user:'lfp',
    password:'lfp680'
}));
const jwt = require('jsonwebtoken');
const query=(sql,callback)=>{
    pool.getConnection(function (err,connection) {
        connection.query(sql,function (err,rows) {
            callback(err,rows);
            connection.release()
        })
    })
};
// 数据库封装

const returnMsg = (code,msg,data)=>{
    return{
        code:code,
        msg:msg,
        data:data
    }
};
//返回数据打包

const queryResult=(sql)=>{
    return new Promise((resolve,reject)=>{
        query(sql,
            (err,rows)=>{
                if (err) console.log(err);
                resolve(rows)
            })
    });
}
//sql执行打包

const jwtVer=(token)=>{
    let id='';
    try{
        id = jwt.verify(token,'meta_smile');
        return id;
    }catch (err) {
        return false;
    }
}
module.exports={
    host,port,query,returnMsg
    ,queryResult,jwtVer
};