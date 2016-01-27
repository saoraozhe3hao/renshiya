<?php
//复制模块时，记得改 namespace 和 class
namespace Admin\Controller;
use Think\Controller\RestController;
class VillageController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function village_get(){
        $Village = M("Village");
        
        if( isset( $_GET['id'] ) ){
            $villageData = $Village->where( 'id='.$_GET['id'] )->find();
            $data = array('village'=>$villageData);
        }
       else if( isset( $_GET['county_id'] ) ){
            $where = "county_id=".$_GET['county_id'];
            $data = $Village->where( $where )->select();
        }
        
        echo $this->response($data,'json');
    }
    
    public function village_post(){
        $Village = M("Village");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $Village -> add($_POST);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function village_put(){
        $Village = M("Village");
        $_PUT = json_decode (file_get_contents('php://input'),true);

        $Village ->where('id='.$_GET['id'])->save($_PUT);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function village_delete(){
        $Village = M("Village");
    
        $Village ->where('id='.$_GET['id'])->delete();
        echo $this->response(array("code"=>"200"),'json');
    }
   
}