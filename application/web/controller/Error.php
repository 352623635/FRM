<?php


namespace app\web\controller;


use think\Controller;

class Error extends Controller
{
    public function index(){
        return "<p style='color: red;font-size: 18px'><b>控制器不存在，请检查路径!</b></p><br><img src='http://8.130.10.7:3001/err/404' alt=''>";
    }
}