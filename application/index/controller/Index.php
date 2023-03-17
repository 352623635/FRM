<?php
namespace app\index\controller;

class Index
{
    public function index()
    {
        return "这是主页面";
    }

    public function hello($name = 'ThinkPHP5')
    {
        return 'hello,' . $name;
    }
}
