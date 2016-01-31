<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>认识呀</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/renshiya.css" rel="stylesheet">
</head>
<body ng-controller="topCtrl">
<ul class="nav nav-tabs nav-justified">
  <li ng-class="{active:$state.current.name=='find' || from == 'find'}"><a href="#/find">寻找</a></li>
  <li ng-class="{active:$state.current.name=='publish' || from == 'publish'}"><a  href="#/publish">发布</a></li>
  <li ng-class="{active:$state.current.name=='mine' || from == 'mine'}"><a href="#/mine">我的</a></li>
</ul>
<div>
    <div ui-view></div>
</div>
<div id="authentication">
    <div id="login" ng-show="popType == 'login'">
        <div class="form-group">
            <label>用户名：</label>
            <input type="text" class="form-control" ng-model="login_name">
        </div>
        <div class="form-group">
            <label>密码：</label>
            <input type="password" class="form-control" ng-model="login_pwd">
        </div>
        <input class="btn btn-default" type="button" value="登录" ng-click="login()">
        <a href="" ng-click="showPop('register')">注册</a>
    </div>
    <div id="register" ng-show="popType == 'register'">
        <div class="form-group">
            <label>用户名：</label>
            <input type="text" class="form-control" ng-model="register_name">
        </div>
        <div class="form-group">
            <label>密码：</label>
            <input type="password" class="form-control" ng-model="register_pwd">
        </div>
        <div class="form-group">
            <label>手机号码：</label>
            <input type="text" class="form-control" ng-model="register_phone">
            <input class="btn btn-default" type="button" value="获取验证码">
        </div>
        <div class="form-group">
            <label>验证码：</label>
            <input type="password" class="form-control" ng-model="register_code">
        </div>
        <input class="btn btn-default" type="button" value="注册" ng-click="register()">
        <a href="" ng-click="showPop('login')">登录</a>
    </div>
    <div id="userInfo" ng-show="popType == 'user_info'">
            <div><a href="" ng-click="showPop('')">关闭</a></div>
            <!--用户信息-->
            <div>
                {{checkUser.username}}
            </div>
            <!-- 评论 -->
            <div ng-repeat="comment in checkComments">
                {{comment.score}}  {{comment.content}} {{comment.time}}
            </div>
    </div>
</div>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="//cdn.bootcss.com/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
<script>
    <?php  SESSION_START(); ?>
    window.user = '<?php  if( isset( $_SESSION["user"] ) ){ echo json_encode( $_SESSION["user"] ) ; } ?>';

</script>
<script src="js/code.js"></script>
<script src="js/main.js"></script>
</body>
</html>