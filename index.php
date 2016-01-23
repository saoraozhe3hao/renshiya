<?php 
    // 开启调试模式
    define('APP_DEBUG', true);
   //thinkPHP demo入口文件
   //定义以下常量后，初次访问该入口，会在PHP根目录下自动生成Think应用目录api
   define('APP_PATH', './api/');
   /*api目录下
    *  Common  存放当前项目的公共函数
    *  Home  存放当前项目的 MVC文件和配置文件
    *  Runtime  存放当前项目的运行时文件
    * */
   require_once 'ThinkPHP/ThinkPHP.php';
   // 运行流程，加载 ThinkPHP.php，加载核心Think类(包括框架配置文件)，加载应用配置文件，调用控制器
   //访问地址，见 api/Home/Conf/config.php中的配置
?>