<?php
class Convention {
    //默认执行动作请不要更改变量名
    const DEFAULT_CHANNEL = 'index';//默认分发频道
    const DEFAULT_ERROR_CHANNEL = 'error';//出错执行频道请不要更改
    const DEFAULT_MODULE = 'index';//默认执行module
    const DEFAULT_ACTION = 'default';//默认action 不要使用index
    const DEFAULT_CHARSET = 'utf8';//默认编码
    const DB_CHARSET      = 'utf8';// 数据库编码默认采用utf8
    const TMPL_CONTENT_TYPE     = 'text/html'; // 默认模板输出类型
    const TMPL_ENGINE_TYPE = 'php';
    const SESSION_AUTO_START = false;
    //
  
}