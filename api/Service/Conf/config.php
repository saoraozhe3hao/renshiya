<?php
return array(
	//'配置项'=>'配置值'
	'name'=>'hfzq',
    'URL_MODEL'             =>  1,       // URL访问模式,可选参数0、1、2、3,代表以下四种模式：
    // 0 (普通模式); 1 (PATHINFO 模式); 2 (REWRITE  模式); 3 (兼容模式)  默认为PATHINFO 模式
    //PATHINFO模式下，URL格式为：phpdemo/index.php/home/index/index，即访问Home/Controller/IndexController.class.php下的function index
    //普通模式下，URL格式为 /phpdemo/index.php?m=home&c=index&a=index
    //REWRITE模式下，URL格式为 /phpdemo/home/index/index.html
    //兼容模式下,URL格式为 /phpdemo/index.php?s=/home/index/index.html
    
    //配置数据库信息
    'DB_TYPE'=>'mysql',
    'DB_HOST'=>'localhost',
    'DB_NAME'=>'renshiya',
    'DB_USER'=>'root',
    'DB_PWD'=>'',
    'DB_PORT'=>'3306',
    'DB_PREFIX'=>''
    
);