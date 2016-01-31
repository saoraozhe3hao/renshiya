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
        $model = M();
       
        if( isset( $_GET['id'] ) ){
            $where =  'id='.$_GET['id'];
            $classData = $Class->where($where )->find();
            $instanceData = $Instance->where('class_id='.$_GET['id'] ) ->select();
            $CommentData = $model->query('select comment.* from ser_ban_instance instance,comment'.
                ' where instance.class_id='.$_GET['id'].' AND comment.service_id=instance.id AND comment.comment_to='.$classData['publish_id']);
            $data = array('class'=>$classData,'instance'=>$instanceData,'comment'=>$CommentData);
        }
        else{
            $where =  'status=1';
            if( isset( $_GET['field'] ) &&  $_GET['field'] != "" ){
                $where = $where.' AND field='.$_GET['field'];
            }
            if( isset( $_GET['category'] )  &&  $_GET['category'] != "" ){
                $where = $where.' AND category='.$_GET['category'];
            }
            if( isset( $_GET['subject'] )  &&  $_GET['subject'] != "" ){
                $where = $where.' AND subject='.$_GET['subject'];
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
        $UserBill = M("User_bill");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $clsassData = $Class->where( 'id='.$_POST['classId'] )->find();
        $data = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$clsassData['publish_id'],
            "class_id"=>$clsassData['id'],
            "status"=>0,
            "turnover"=>0
        );
        $insertId = $Instance->add($data);
        
        //每一个服务实例，双方分别记录订单
        $claimBill = array(
            'user_id'=>$_SESSION["user"]['id'],
            'type'=>0,
            "service_type"=>"ser_ban",
            "service_id"=>$insertId,
            "event"=>"报班",
            "turnover"=>0,
            "balance"=>$_SESSION["member"]['balance']
        );
        $UserBill->add($claimBill);
         
        $publishBill = array(
            'user_id'=>$clsassData['publish_id'],
            'type'=>0,
            "service_type"=>"ser_ban",
            "service_id"=>$insertId,
            "event"=>"班被报",
            "turnover"=>0,
            "balance"=> 0
        );
        $UserBill->add($publishBill);
        echo $this->response(array("status"=>"200"),'json');
    }
}