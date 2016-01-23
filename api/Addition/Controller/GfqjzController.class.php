<?php
namespace Addition\Controller;
use Think\Controller\RestController;
class GfqjzController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function position_get(){
        //根据表名创建模型
        $Position = M("Add_gfqjz_position");
        $Instance = M("Add_gfqjz_instance");
       
        if( isset( $_GET['id'] ) ){
            //查询详情
            $pasitionData = $Position->where( 'status=0 AND id='.$_GET['id'] )->find();
            $instanceData = $Instance->where('position_id='.$_GET['id'].' AND TO_DAYS(serve_date)>TO_DAYS(NOW())' )->order('serve_date')->select();
            $data = array('time'=>time(),'position'=>$pasitionData,'instance'=>$instanceData);
        }
        else{
            //查询列表
            $data = $Position->where('status=0')->select();
        }
        //转JSON
        echo $this->response($data,'json');
    }
    
    public function instance_post(){
        $Position = M("Add_gfqjz_position");
        $Instance = M("Add_gfqjz_instance");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $pasitionData = $Position->where( 'status=0 AND id='.$_POST['positionId'] )->find();
        $data = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$pasitionData['publish_id'],
            "position_id"=>$pasitionData['id'],
            "status"=>0,
            "turnover"=>$pasitionData['reward']
        );
        foreach($_POST["serve_dates"] as $k=>$v){
            $data['serve_date'] = $v;
           $Instance->add($data);
        }
        echo $this->response(array("status"=>"200"),'json');
    }
}