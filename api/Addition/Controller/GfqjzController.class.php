<?php
//复制模块时，记得改 namespace 和 class
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
        //使用空模型访问数据库
        $Model = M();
        
       
        if( isset( $_GET['id'] ) ){
            //查询详情
            $pasitionData = $Position->where( 'status=0 AND id='.$_GET['id'] )->find();
            $instanceData = $Instance->where('position_id='.$_GET['id'].' AND TO_DAYS(serve_date)>TO_DAYS(NOW())' )->order('serve_date')->select();
            $CommentData = $Model->query('select comment.* from add_gfqjz_instance instance,comment'.
                ' where instance.position_id='.$_GET['id'].' AND comment.service_id=instance.id AND comment.comment_to='.$pasitionData['publish_id']);
            $data = array('time'=>time(),'position'=>$pasitionData,'instance'=>$instanceData,'comment'=>$CommentData);
        }
        else{
            //查询列表
            $data = $Position->where('status=0')->select();
        }
        //转JSON
        echo $this->response($data,'json');
    }
    
    public function position_post(){
        $Position = M("Add_gfqjz_position");
        $_POST = json_decode (file_get_contents('php://input'),true);
    
        $data = array(
            'publish_id'=>$_SESSION["user"]['id'],
            'address'=>$_POST['address'],
            "description"=>$_POST['description'],
            "spot"=>$_POST['spot'],
            "day_flag"=>$_POST['day_flag'],
            "reward"=>$_POST['reward'],
            "term"=>$_POST['term'],
            "number"=>$_POST['number'],
            "status"=>0
        );
        $Position->add($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function position_put(){
        $Position = M("Add_gfqjz_position");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $data = array(
            'publish_id'=>$_SESSION["user"]['id'],
            'address'=>$_PUT['address'],
            "description"=>$_PUT['description'],
            "spot"=>$_PUT['spot'],
            "day_flag"=>$_PUT['day_flag'],
            "reward"=>$_PUT['reward'],
            "term"=>$_PUT['term'],
            "number"=>$_PUT['number'],
            "status"=>0
        );
        $Position ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function position_delete(){
        $Position = M("Add_gfqjz_position");
        $_PUT = json_decode (file_get_contents('php://input'),true);
        
        $data = array(
            "status"=>1
        );
        $Position ->where('id='.$_GET['id'])->save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function instance_post(){
        $Position = M("Add_gfqjz_position");
        $Instance = M("Add_gfqjz_instance");
        $UserBill = M("User_bill");
        $_POST = json_decode (file_get_contents('php://input'),true);
        
        $positionData = $Position->where( 'status=0 AND id='.$_POST['positionId'] )->find();
        
        $InstanceData = array(
            'claim_id'=>$_SESSION["user"]['id'],
            'publish_id'=>$positionData['publish_id'],
            "position_id"=>$positionData['id'],
            "status"=>0,
            "turnover"=>$positionData['reward']
        );
        foreach($_POST["serve_dates"] as $k=>$v){
            //每认领一天，生成一个服务实例
            $InstanceData['serve_date'] = $v;
            $insertId = $Instance->add($InstanceData);
            
            //每一个服务实例，双方分别记录订单
            $claimBill = array(
                'user_id'=>$_SESSION["user"]['id'],
                'type'=>0,
                "service_type"=>"add_gfqjz",
                "service_id"=>$insertId,
                "event"=>"认领高峰期兼职",
                "turnover"=>$positionData['reward'],
                "balance"=>$_SESSION["member"]['balance']
            );
            $UserBill->add($claimBill);
            
            $publishBill = array(
                'user_id'=>$positionData['publish_id'],
                'type'=>0,
                "service_type"=>"add_gfqjz",
                "service_id"=>$insertId,
                "event"=>"高峰期兼职被认领",
                "turnover"=>-$positionData['reward'],
                "balance"=> 0
            );
            $UserBill->add($publishBill);
        }
        
        echo $this->response(array("code"=>"200"),'json');
    }

    public function instance_delete(){
        $Instance = M("Add_gfqjz_instance");
        
        $Instance ->where('id='.$_GET['id'])->delete();
        echo $this->response(array("code"=>"200"),'json');
    }
}