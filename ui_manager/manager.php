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
<div>
    <div ui-view></div>
</div>
<div id="navigate">
    <div class="item"><a href="#/county">区县管理</a></div>
    <div class="item"><a href="#/manager">小区经理管理</a></div>
    <div class="item"><a href="#/user">用户管理</a></div>
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
<script src="js/service_code.js"></script>
<script src="js/main.js"></script>
</body>
</html>