<?php
namespace User\Controller;
use Think\Controller\RestController;
class AuthController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function register_post(){
        $User = M("User");
        $Member = M("Member");
        //获取请求体并转为数组，直接用$_POST获取不到，true表示转为数组
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $userData = array(
            'username'=>$_POST["username"],
            'password'=>md5($_POST["password"]),
            'phone'=>$_POST["phone"],
            "village_id"=>1
        );
        //增
       $userId = $User->add($userData);
       
       $memberData = array(
           'user_id'=>$userId
       );
       //增
       $Member->add($memberData);
       
       $userData = $User->where( 'id='.$userId)->find();
       $memberData = $Member->where( 'user_id='.$userId)->find();
       $_SESSION["user"] = $userData;
       $_SESSION["member"] = $memberData;
       echo $this->response($userData,'json');
    }
    
    public function login_post(){
        $User = M("User");
        $Member = M("Member");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $userData = $User->where( 'username="'.$_POST["username"].'"')->find();
        if($userData["password"] == md5($_POST["password"]) ){
            $_SESSION["user"] = $userData;
            $memberData = $Member->where( 'user_id='.$userData['id'])->find();
            $_SESSION["member"] = $memberData;
            echo $this->response(array("code"=>200,"user"=>$userData),'json');
        }
        else{
            echo $this->response(array("code"=>400),'json');
        }
    }
    
    public function logout_get(){
        $_SESSION["user"] = null;
        echo $this->response(array("code"=>200),'json');
    }
}