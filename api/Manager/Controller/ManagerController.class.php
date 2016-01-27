<?php
//复制模块时，记得改 namespace 和 class
namespace Manager\Controller;
use Think\Controller\RestController;
class ManagerController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    
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
        $managerData = $Manager  ->where('id='.$_GET['id'])->find();
        echo $this->response(array("code"=>"200",'manager'=>$managerData),'json');
    }
   
}