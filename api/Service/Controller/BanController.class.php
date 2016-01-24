<?php
namespace Service\Controller;
use Think\Controller\RestController;
class BanController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function class_get(){
        $Class = M("Ser_ban_class");
        $Instance = M("Ser_ban_instance");
       
        if( isset( $_GET['id'] ) ){
            $where =  'id='.$_GET['id'];
            $classData = $Class->where($where )->find();
            $instanceData = $Instance->where('class_id='.$_GET['id'] ) ->select();
            $data = array('class'=>$classData,'instance'=>$instanceData);
        }
        else{
            $where =  'status=1';
            if( isset( $_GET['field'] ) ){
                $where = $where.' AND field='.isset( $_GET['field'] );
            }
            if( isset( $_GET['category'] ) ){
                $where = $where.' AND category='.isset( $_GET['category'] );
            }
            if( isset( $_GET['subject'] ) ){
                $where = $where.' AND subject='.isset( $_GET['subject'] );
            }
            $data = $Class->where($where)->select();
        }
        echo $this->response($data,'json');
    }
    
    public function class_post(){
        $Class = M("Ser_ban_class");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $data = $_POST;
        $data["publish_id"] = $_SESSION["user"]['id'];
        $data["status"] = 1;

        $Class->add($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function class_put(){
        $Class = M("Ser_ban_class");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $data = $_PUT;
        
        $Class ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function class_delete(){
        $Class = M("Ser_ban_class");
        $_DELETE = json_decode (file_get_contents('php://input'),true);
        
        $data = array(
            "status"=>5
        );
        $Class ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function instance_post(){
        $Class = M("Ser_ban_class");
        $Instance = M("Ser_ban_instance");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $clsassData = $Class->where( 'id='.$_POST['classId'] )->find();
        $data = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$clsassData['publish_id'],
            "class_id"=>$clsassData['id'],
            "status"=>0,
            "turnover"=>0
        );
        $Instance->add($data);
        echo $this->response(array("status"=>"200"),'json');
    }
}