<?php
namespace Manager\Controller;
use Think\Controller\RestController;
class AuthController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function login_post(){
        $Manager = M("Manager");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $managerData = $Manager->where( 'username="'.$_POST["username"].'"')->find();
        if($managerData["password"] == md5($_POST["password"]) ){
            $_SESSION["manager"] = $managerData;
            echo $this->response(array("code"=>200,"manager"=>$managerData),'json');
        }
        else{
            echo $this->response(array("code"=>400),'json');
        }
    }
    
    public function logout_get(){
        $_SESSION["manager"] = null;
        echo $this->response(array("code"=>200),'json');
    }
}