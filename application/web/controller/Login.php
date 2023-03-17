<?php


namespace app\web\controller;


use app\web\model\User;
use Firebase\JWT\JWT;


class Login extends Common
{
    public function index(){
        $user=$this->request->param('user');
        $pwd =$this->request->param('pwd');

        //密匙
        $payload = [
            'iss'=>'meta',                //签发人(官方字段:非必需)
            'exp'=>time()+3600*24*7,     //过期时间(官方字段:非必需)
            'aud'=>'admin',              //受众(官方字段:非必需)
            'nbf'=>time(),               //生效时间(官方字段:非必需)
            'iat'=>time(),               //签发时间(官方字段:非必需)
            'admin_id'=>$user,        //自定义字段
            'admin'=>true                //自定义字段
        ];
        $token = JWT::encode($payload,'meta','HS256');
        if (preg_match("/^[1][3,4,5,6,7,8][0-9]{9}$/",$user)){
            $result = User::where('phone',$user)->find();
        }else if (preg_match("/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/",
           $user)){
            $result = User::where('email',$user)->find();
        }else{
            $result=['code'=>400,'msg'=>'账号格式错误！'];
            return json($result);
        }
        if($result['pwd']==$pwd){
            User::where('id',$result['id'])->update(['ms_token'=>$token]);
            $data = User::where('id',$result['id'])->field('name,id,ms_token,avatar')->find();
            $result0 = ['code'=>200,'msg'=>'登录成功！','data'=>$data];
            return json($result0);
        }else{
            $result0=['code'=>400,'msg'=>'账号与密码不匹配！'];
            return json($result0);
        }

    }
}