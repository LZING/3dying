<?php
//ini_set("display_errors","On");
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ALL);
define('ROOT', dirname(__FILE__));
define('VISION', '0.2');
define('APP',      ROOT . '/lib/app');//action目录
define('MODEL',    ROOT . '/lib/model');//model模型目录
define('WEBROOT',  ROOT . '/webroot');//分发目录
define('CONFIG',   ROOT . '/config');//配置目录
define('COMMON',   ROOT . '/common');
define('PLUGIN',   ROOT . '/plugin');//插件目录
define('THINKPHP', ROOT . '/thinkphp');//核心目录
define('TPL', ROOT . '/template');//模板文件位置
//define('__APP__', 'http://www.3dying.com');//网站url
define('__APP__', 'http://127.0.0.1');//网站url
define('__ROOT__', '');//
require(THINKPHP . '/ThinkPHP.class.php');
//$content = file_get_contents(ROOT.'/Public/css/detail/style.css');
//echo str_replace('}', "}\n", $content);
//nginx  配置 fastcgi_param  PATH_INFO          $request_uri; 