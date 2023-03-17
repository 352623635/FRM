<?php


namespace app\web\controller;



use app\web\model\Essay_cri;
use app\web\model\User;
use think\Controller;

use app\web\model\Essay;
use think\Db;

class EssayTk extends Controller
{
    public function _empty($name){
        return '<p style="color: red;font-size: 18px"><b>此方法不存在：</b></p><br>'.$name.
            '<br><img src="http://8.130.10.7:3001/err/404" alt="">';
    }

    public function essay_index(){
        $EssayIndex['new']= Essay::order('update_time', 'desc')->limit(0,4)->select();
        $EssayIndex['hot']= Essay::order('hot','desc')->limit(0,4)->select();
        $EssayIndex['self']= Essay::where('type','like','关于自我')->limit(0,4)->order('hot','desc')->select();
        $EssayIndex['teach']= Essay::where('type','like','教育')->limit(0,4)->order('hot','desc')->select();
        $EssayIndex['since']= Essay::where('type','like','科普')->limit(0,4)->order('hot','desc')->select();
        $EssayIndex['mood']= Essay::where('type','like','情绪')->limit(0,4)->order('hot','desc')->select();
        $EssayIndex['none']= Essay::where('type','like','无')->limit(0,4)->order('hot','desc')->select();
        return json($EssayIndex);
    }

    public function essay_body(){
        $essay_id = request()->param('id');
        $EssayBody['essay']= Essay::where('essay_id',$essay_id)->select();
        $EssayBody['cri']= Essay_cri::where('essay_id',$essay_id)->order('update_time','desc')->select();
        if(count($EssayBody['essay'])==0){
            $result=['code'=>400,'msg'=>'文章不存在或已被删除！'];
            return json($result);
        }else{
            $EssayBody['author']= User::where('id',$EssayBody['essay'][0]['uid'])->field('name,avatar')->find();
            return json($EssayBody);
        }
    }

    public function essay_cri(){
        $essay_id = request()->param('id');
        return Essay_cri::where('essay_id',$essay_id)->select();
    }
}