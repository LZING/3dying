<?php
class ShareVar {
    const XINLANG_WEIBO = 1;
    const QQ_KONGJIAN = 3;
    const TX_WEIBO    = 2;
    public static $SHARE_TYPE = array(
        self::XINLANG_WEIBO => array(
            'name' => '新浪微博',
            'class'=> 's-sina',
            'url' => 'http://service.weibo.com/share/share.php?',
            'params' => array(
                'title','pic','url','content',
            ),
        ),
        self::QQ_KONGJIAN => array(
            'name' => 'QQ空间',
            'class'=> 's-QZone',
            'url' => 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
            'params' => array(
                'title','pics','url','summary',
            ),
        ),
        self::TX_WEIBO => array(
            'name' => '腾讯微博',
            'class'=> 's-weblog',
            'url' => 'http://share.v.t.qq.com/index.php?c=share&a=index&',
            'params' => array(
                'title','pic','url','site',
            ),
        ),
    );
    
   
}