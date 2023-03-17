<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]
namespace think;


if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    //设置允许跨域的请求头为任意请求头
    header("Access-Control-Allow-Headers: *");
    // 允许的跨域请求类型
    header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE,OPTIONS,PATCH');
    //让浏览器能访问到Authorization的响应头
    header('Access-Control-Expose-Headers: Authorization');


//    //设置允许跨域的原始域名为任意域名 由于前端与后端部署在同一服务器上，所以此处可省略
//    header('Access-Control-Allow-Origin: *');
    exit;

}

// 加载基础文件
require __DIR__ . '/../thinkphp/base.php';

// 支持事先使用静态方法设置Request对象和Config对象

// 执行应用并响应
Container::get('app')->run()->send();
