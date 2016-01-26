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
<a href=""  ng-click="logout()">退出</a>
<div>
    <div ui-view></div>
</div>
<div id="navigate">
    <div class="item"><a href="#/user">本小区用户管理</a></div>
    <div class="item"><a href="#/mine">我的资料</a></div>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="//cdn.bootcss.com/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
<script>
    <?php  SESSION_START(); ?>
    window.manager = '<?php  if( isset( $_SESSION["manager"] ) ){ echo json_encode( $_SESSION["manager"] ) ; } ?>';
</script>
<script src="js/manager.js"></script>
</body>
</html>