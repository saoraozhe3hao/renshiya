<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        //读取配置
        $name = C('name');
        $this->show($name,'utf-8');
		//生成地址
        echo '<br/>'.U("Index/index");
        
        //使用框架自带的模型访问数据库表 think_user
        $user = M('user');
        //查
        $data=$user->select();
        dump($data);
        
        //使用自定义模型UserModel.class.php访问数据库表 think_user
        $user = D('User');
        echo $user->getInfo();
        $data = array(
            'name'=>'hh'
        );
        //增
       // $user->add($data);
        //条件查询
        $data=$user->where('id=1')->select();
        dump($data);
        //eq, neq, gt, egt, lt, elt, between ,not between, in ,not in, like, not like 
        $where['id']=array('eq','1');
        $data=$user->where($where)->select();
        dump($data);
        //统计,count , max ,min ,avg ,sum
        echo $user ->max('id');
        //更新
        $update['name']='updateName';
        $user ->where('id=1')->save($update);
        //删除
        $user ->where('id=5')->delete();
        
        //使用空模型访问数据库
        $model = M();
        //查询
        $data = $model->query('select * from think_user');
        dump($data);
        //写入
        $model->execute('update think_user set name="hong"');
        
    }
}