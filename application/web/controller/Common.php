<?php


namespace app\web\controller;


use think\Controller;

class Common extends Controller
{
    protected $request; //处理参数
    protected $validater;   //验证数据和参数
    protected $params;  //过滤后符合要求的参数

}