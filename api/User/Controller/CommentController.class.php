<?php
namespace User\Controller;
use Think\Controller\RestController;
class CommentController  extends RestController {
    
    protected $allowMethod    = array('get','post','put','delete'); 
    protected $allowType      = array('json'); 
    protected $defaultType = "json";
    
    public function comment_get(){
        $Commentl = M("Comment");
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : $_SESSION["user"]['id'];
       
        $data = $Commentl->where('comment_to='.$user_id)->select();
        echo $this->response($data,'json');
    }
}