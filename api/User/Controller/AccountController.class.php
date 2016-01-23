<?php
namespace User\Controller;
use Think\Controller\RestController;
class AccountController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function user_get(){
        $User = M("User");
        $Member = M("Member");
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : $_SESSION["user"]['id'];
       
        $userData = $User->where('id='.$user_id)->find();
        $memberData = $Member->where('user_id='.$user_id)->find();
        
        echo $this->response(array('user'=>$userData,'member'=>$memberData),'json');
    }
}