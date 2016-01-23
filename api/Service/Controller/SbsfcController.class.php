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
       
        if( isset( $_GET['id'] ) ){
            $routeData = $Route->where( 'status=0 AND id='.$_GET['id'] )->find();
            $instanceData = $Instance->where('route_id='.$_GET['id'].' AND TO_DAYS(serve_date)>TO_DAYS(NOW())' )->order('serve_date')->select();
            $data = array('time'=>time(),'route'=>$routeData,'instance'=>$instanceData);
        }
        else{
            $data = $Route->where('status=0')->select();
        }
        echo $this->response($data,'json');
    }
    
    public function instance_post(){
        $Route = M("Ser_sbsfc_route");
        $Instance = M("Ser_sbsfc_instance");
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
           $Instance->add($data);
        }
        echo $this->response(array("status"=>"200"),'json');
    }
}