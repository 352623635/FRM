<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\facade\Route;

Route::get('think', function () {
    return 'hello,ThinkPHP5!';
});
Route::get('index','index/index/index');

Route::get('hello/:name', 'index/index/hello');

Route::post('/api/login','web/login/index');

Route::get('/api/essay_index','web/essay_tk/essay_index');
Route::get('/api/essay_body','web/essay_tk/essay_body');
Route::get('/api/essay_cri','web/essay_tk/essay_cri');



