<?php
return array(
'APP_DEBUG'=>false,// 是否开启调试模式
'SHOW_PAGE_TRACE'=>false,
'DB_TYPE'=>'mysql',
'DB_HOST'=>'localhost',
'DB_NAME'=>'3dying',//数据库名
'DB_USER'=>'3dying',
'DB_PWD'=>'123456',
'DB_PREFIX'=>'cd_',//数据库的前缀
'URL_MODE'=>'3',//URL模式：0普通模式 1PATHINFO 2REWRITE 3兼容模式,若系统不支持，选三为宜
'TAKEN_ON'=>true,//TOKEN_ON 令牌验证配置为 true 
'SESSION_AUTO_START' =>true,// 是否自动开启Session
);
