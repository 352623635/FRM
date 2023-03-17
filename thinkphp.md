#布置与url
###先打开debug
```php
//config/app.php
//路径构成
//域名/模块/类/方法/参数名/参数
 protected $beforeActionList=[

    ];//键值对设置是否调用被保护的方法
    //->success('msg','url')自动跳转
 protected function first(){

 }

 public function _empty($name){
        return '方法不存在'.$name;
    }
//空方法返回
 public function select(){
        $data=Db::table('ms_user')->select();
        return(json($data));
    }

    public function select1(){
        $user = new User();
        $data=$user::select();
        }
```

```php
$user = new User();
$user->create_time = date('Y-m-d H:i:s');
$user->save()
//或者
$user->save([
'create_time' => date('Y-m-d H:i:s')
]);
//后者更快速

//二位数组进行批量新增
$dataAll = [
[
'create_time' => date('Y-m-d H:i:s')
],
[
'create_time' => date('Y-m-d H:i:s')
]
];

$user->save($dataAll);

//条件查询
$user->where('name','判断','值')

//增save();删delete();查where()->find();
//对单条数据进行操作
$anyone = User::where('name', '值')->find();
$anyone ->name1 = '值';
$anyone ->save();
//或者
$anyone ->save([
    'name1'=> '值'
],['name','值']);
//后面一组是查询条件
//批量更新
$list = [
['id'=>1, 'name'=>'值', 'email'=>''],
['id'=>2, 'name'=>'值', 'email'=>''],
];//第一个值为查询条件
$user ->save($list);

```
```php
$user = User::all([79, 118, 128]);
//或者
$user = User::whereIn(id,[1,2,3]);
//批量查询
//排序
->order('id', 'asc')->limit(2)->select();
//列出某些值
->value('username');
//赋值查询
whereIn('id',[79,118,128])->column('username','id');
//字段查询
->field('name,avatar')

//模型内额外新增特征值
//在 User 模型端，创建一个对外的方法，如下：
public function getStatusAttr($value)
{
$status = [-1=>'删除', 0=>'禁用', 1=>'正常', 2=>'待审核'];
return $status[$value];
}
//然后，在控制器端，直接输出数据库字段的值即可得到获取器转换的对应值；
$user = User::get(21);
echo $user->status;//获取
echo $user->getData('status')//反获取

//获取器可以拿来作为数据重写
//数组长度
count(arr);
```
```php
//引入jwt
//composer require firebase/php-jwt
```