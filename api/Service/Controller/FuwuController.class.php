<?php
namespace Service\Controller;
use Think\Controller\RestController;
class FuwuController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function item_get(){
        $Item = M("Ser_fuwu_item");
       
        if( isset( $_GET['id'] ) ){
            $where =  'id='.$_GET['id'];
            $itemData = $Item->where($where )->find();
            $data = array('class'=>$itemData);
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
            $data = $Item->where($where)->select();
        }
        echo $this->response($data,'json');
    }
    
    public function item_post(){
        $Item = M("Ser_fuwu_item");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $data = $_POST;
        $data["publish_id"] = $_SESSION["user"]['id'];
        $data["status"] = 1;

        $Item->add($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function item_put(){
        $Class = M("Ser_fuwu_item");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $data = $_PUT;
        
        $Class ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function item_delete(){
        $Item = M("Ser_fuwu_item");
        $_DELETE = json_decode (file_get_contents('php://input'),true);
        
        $data = array(
            "status"=>5
        );
        $Item ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function instance_post(){
        $Item = M("Ser_fuwu_item");
        $Instance = M("Ser_fuwu_instance");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $itemData = $Item->where( 'id='.$_POST['itemId'] )->find();
        $data = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$itemData['publish_id'],
            "item_id"=>$itemData['id'],
            "status"=>0,
            "turnover"=>0
        );
        $Instance->add($data);
        echo $this->response(array("status"=>"200"),'json');
    }
}