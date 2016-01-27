<?php
//复制模块时，记得改 namespace 和 class
namespace Admin\Controller;
use Think\Controller\RestController;
class ManagerController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function manager_get(){
        $Manager = M("Manager");
        $Model = M();
        
        if( isset( $_GET['id'] ) ){
            $managerData = $Manager->where( 'id='.$_GET['id'] )->find();
            $data = array('manager'=>$managerData);
        }
        else{
            $where =  ' where manager.village_id=village.id';
            if( isset( $_GET['county_id'] ) ){
                $where = $where.' AND village.county_id='.$_GET['county_id'];
            }
            $data = $Model->query('select manager.* from village,manager'.$where);
        }
        
        echo $this->response($data,'json');
    }
    
    public function manager_post(){
        $Manager = M("Manager");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $_POST["password"] = md5($_POST["password"]);
        $Manager -> add($_POST);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function manager_put(){
        $Manager = M("Manager");
        $_PUT = json_decode (file_get_contents('php://input'),true);

        if( isset($_PUT["password"]) && $_PUT["password"] != ""){
            $_PUT["password"] = md5($_PUT["password"]);
        }
        else{
            unset($_PUT["password"]);
        }
        $Manager ->where('id='.$_GET['id'])->save($_PUT);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function manager_delete(){
        $Manager = M("Manager");
    
        $Manager ->where('id='.$_GET['id'])->delete();
        echo $this->response(array("code"=>"200"),'json');
    }
   
}