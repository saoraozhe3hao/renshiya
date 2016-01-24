<?php
namespace Service\Controller;
use Think\Controller\RestController;
class SbsfcController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function route_get(){
        $Route = M("Ser_sbsfc_route");
        $Instance = M("Ser_sbsfc_instance");
        $model = M();
       
        if( isset( $_GET['id'] ) ){
            $routeData = $Route->where( 'status=0 AND id='.$_GET['id'] )->find();
            $instanceData = $Instance->where('route_id='.$_GET['id'].' AND TO_DAYS(serve_date)>TO_DAYS(NOW())' )->order('serve_date')->select();
            $CommentData = $model->query('select comment.* from ser_sbsfc_instance instance,comment'.
                ' where instance.route_id='.$_GET['id'].' AND comment.service_id=instance.id AND comment.comment_to='.$routeData['publish_id']);
            $data = array('time'=>time(),'route'=>$routeData,'instance'=>$instanceData,'comment'=>$CommentData);
        }
        else{
            $data = $Route->where('status=0')->select();
        }
        echo $this->response($data,'json');
    }
    
    public function route_post(){
        $Route = M("Ser_sbsfc_route");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $data = $_POST;
        $data["publish_id"] = $_SESSION["user"]['id'];
        $data["status"] = 0;

        $Route->add($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function route_put(){
        $Route = M("Ser_sbsfc_route");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $data = $_PUT;
        
        $Route ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function route_delete(){
        $Position = M("Ser_sbsfc_ruote");
        $_PUT = json_decode (file_get_contents('php://input'),true);
        
        $data = array(
            "status"=>1
        );
        $Position ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    
    public function instance_post(){
        $Route = M("Ser_sbsfc_route");
        $Instance = M("Ser_sbsfc_instance");
        $UserBill = M("User_bill");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $routeData = $Route->where( 'status=0 AND id='.$_POST['routeId'] )->find();
        $point = $_POST['point'];
        $data = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$routeData['publish_id'],
            "route_id"=>$routeData['id'],
            "status"=>0,
            "turnover"=>$routeData['price_'.$point],
            "destination"=>$routeData[ 'point_'.$point ]
        );
        foreach($_POST["serve_dates"] as $k=>$v){
            $data['serve_date'] = $v;
           $insertId = $Instance->add($data);
           
           //每一个服务实例，双方分别记录订单
           $claimBill = array(
               'user_id'=>$_SESSION["user"]['id'],
               'type'=>0,
               "service_type"=>"serv_sbsfc",
               "service_id"=>$insertId,
               "event"=>"认领上班顺风车",
               "turnover"=>-$routeData['price_'.$point],
               "balance"=>$_SESSION["member"]['balance']
           );
           $UserBill->add($claimBill);
           
           $publishBill = array(
               'user_id'=>$routeData['publish_id'],
               'type'=>0,
               "service_type"=>"serv_sbsfc",
               "service_id"=>$insertId,
               "event"=>"上班顺风车被认领",
               "turnover"=>$routeData['price_'.$point],
               "balance"=> 0
           );
           $UserBill->add($publishBill);
        }
        echo $this->response(array("status"=>"200"),'json');
    }
}