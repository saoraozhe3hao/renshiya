<?php
namespace User\Controller;
use Think\Controller\RestController;
class BillController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function bill_get(){
        $Bill = M("User_bill");
       
        $data = $Bill->where('user_id='.$_SESSION["user"]['id'])->select();
        echo $this->response($data,'json');
    }
}