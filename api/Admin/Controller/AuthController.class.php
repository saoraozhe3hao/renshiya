<?php
namespace Admin\Controller;
use Think\Controller\RestController;
class AuthController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function login_post(){
        $Admin = M("admin");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $adminData = $Admin->where( 'username="'.$_POST["username"].'"')->find();
        if($adminData["password"] == md5($_POST["password"]) ){
            $_SESSION["admin"] = $adminData;
            echo $this->response(array("code"=>200,"admin"=>$adminData),'json');
        }
        else{
            echo $this->response(array("code"=>400),'json');
        }
    }
    
    public function logout_get(){
        $_SESSION["admin"] = null;
        echo $this->response(array("code"=>200),'json');
    }
}