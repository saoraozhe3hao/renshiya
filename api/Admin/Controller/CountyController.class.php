<?php
//复制模块时，记得改 namespace 和 class
namespace Admin\Controller;
use Think\Controller\RestController;
class CountyController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function county_get(){
        $County = M("County");
        
        if( isset( $_GET['id'] ) ){
            $countyData = $County->where( 'id='.$_GET['id'] )->find();
            $data = array('county'=>$countyData);
        }
        else {
            $where =  '';
            if( isset( $_GET['province'] ) ){
                $where = $where.'province="'.$_GET['province'].'"';
            }
            if( isset( $_GET['city'] ) ){
                $where = $where.' AND city="'.$_GET['city'].'"';
            }
            $data = $County->where($where)->select();
        }
        
        echo $this->response($data,'json');
    }
    
    public function county_post(){
        $County = M("County");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $County -> add($_POST);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function county_put(){
        $County = M("County");
        $_PUT = json_decode (file_get_contents('php://input'),true);

        $County ->where('id='.$_GET['id'])->save($_PUT);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function county_delete(){
        $County = M("County");
    
        $County ->where('id='.$_GET['id'])->delete();
        echo $this->response(array("code"=>"200"),'json');
    }
   
}