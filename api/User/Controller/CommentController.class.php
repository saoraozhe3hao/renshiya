<?php
namespace User\Controller;
use Think\Controller\RestController;
class CommentController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function comment_get(){
        $Comment = M("Comment");
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : $_SESSION["user"]['id'];
       
        $data = $Comment->where('comment_to='.$user_id)->select();
        echo $this->response($data,'json');
    }
    
    public function bill_comment_get(){
        $Comment = M("Comment");
         
        $data = $Comment->where('service_id='.$_GET['service_id'].' AND comment_by='.$_SESSION["user"]['id'])->find();
        echo $this->response($data,'json');
    }
    
    public function bill_comment_post(){
        $Comment = M("Comment");
        $_POST = json_decode (file_get_contents('php://input'),true);
        $Instance = M($_POST['service_type'].'_instance');
    
        $instanceData = $Instance ->where( 'id='.$_POST['service_id'] )->find();
        if($_SESSION['user']['id'] == $instanceData['claim_id']){
            $comment_to = $instanceData['publish_id'];
        }
        else{
            $comment_to = $instanceData['claim_id'];
        }
        
        $data = array(
            'service_type'=>$_POST['service_type'],
            'service_id'=>$_POST['service_id'],
            "comment_by"=>$_SESSION['user']['id'],
            "comment_to"=>$comment_to,
            "score"=>0,
            "content"=>$_POST['content']
        );
        $Comment->add($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function bill_comment_put(){
        $Comment = M("Comment");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $data = array(
            "score"=>0,
            "content"=>$_PUT['content']
        );
        $Comment -> where('id='.$_GET['id'])-> save($data);
        echo $this->response(array("code"=>"200"),'json');
    }
    
    public function bill_comment_delete(){
        $Position = M("Comment");
        $_PUT = json_decode (file_get_contents('php://input'),true);
    
        $Position ->where('id='.$_GET['id'])->delete();
        echo $this->response(array("code"=>"200"),'json');
    }
}