<?php
class ErrorConfig {
    
    const EMPTY_VALUE = 1;//空的
    const EXIST_VALUE = 2;//已经存在
    const OTHER       = 10;
    
    public static $COMMENT = array(
        self::EMPTY_VALUE => '请填写评论内容',
        self::OTHER       => '保存出错',
    );
}