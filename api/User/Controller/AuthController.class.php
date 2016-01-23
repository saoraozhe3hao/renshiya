<?php
namespace User\Controller;
use Think\Controller\RestController;
class AuthController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function register_post(){
        //根据表名创建模型
        $User = M("User");
        //获取请求体并转为数组，直接用$_POST获取不到，true表示转为数组
        $_POST = json_decode (file_get_contents('php://input'),true);
        $data = array(
            'username'=>$_POST["username"],
            'password'=>md5($_POST["password"]),
            'phone'=>$_POST["phone"],
            "village_id"=>1
        );
        //增
       $User->add($data);
       $userData = $User->where( 'username="'.$_POST["username"].'"')->find();
       $_SESSION["user"] = $userData;
       echo $this->response($userData,'json');
    }
    
    public function login_post(){
        $User = M("User");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $userData = $User->where( 'username="'.$_POST["username"].'"')->find();
        if($userData["password"] == md5($_POST["password"]) ){
            $_SESSION["user"] = $userData;
            echo $this->response(array("code"=>200,"data"=>$userData),'json');
        }
        else{
            echo $this->response(array("code"=>400),'json');
        }
    }
}