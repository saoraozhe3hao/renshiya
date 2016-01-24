<?php
namespace User\Controller;
use Think\Controller\RestController;
class BillController  extends RestController {
    /*服务实例 与 账单的区别，不同服务实例的格式是不一样的，而账单的格式都是一样的。服务实例一条，对应服务双方两条账单*/
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function bill_get(){
        $Bill = M("User_bill");
       
        $data = $Bill->where('user_id='.$_SESSION["user"]['id'])->select();
        echo $this->response($data,'json');
    }
}