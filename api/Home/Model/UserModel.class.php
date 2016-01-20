<?php
namespace Home\Model;
use Think\Model;
//继承框架Model，里面有select()等方法
class UserModel extends Model {
    public function getInfo(){
        return 'hello world';
    }
}