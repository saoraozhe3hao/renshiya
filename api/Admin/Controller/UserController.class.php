<?php
//复制模块时，记得改 namespace 和 class
namespace Admin\Controller;
use Think\Controller\RestController;
class UserController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function user_get(){
        $User = M("User");
        $Member = M("Member");
        
        if( isset( $_GET['id'] ) ){
            $userData = $User->where( 'id='.$_GET['id'] )->find();
            $memberData = $Member->where( 'user_id='.$_GET['id'] )->find();
            $data = array('user'=>$userData,'member'=>$memberData);
        }
        else {
            $where =  'village_id='.$_GET['village_id'];
            $data = $User->where($where)->select();
        }
        
        echo $this->response($data,'json');
    }
    
    public function user_put(){
        $User = M("User");
        $Member = M("Member");
        $_PUT = json_decode (file_get_contents('php://input'),true);

        $User ->where('id='.$_GET['id'])->save($_PUT['user']);
        $Member ->where('user_id='.$_GET['id'])->save($_PUT['member']);
        echo $this->response(array("code"=>"200"),'json');
    }
   
    public function user_delete(){
        $User = M("User");
        
        $data = array( 'status'=>2 );
        $User ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
}