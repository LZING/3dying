<?php
class DetailBread {
    
    private static $_LINKS; //链接 [[text, url='']]
    
    public static function set($text, $url = '') {
        self::$_LINKS[] = array($text, $url);
    }
    
    public static function getHtml() {
        ///给面包屑最开始增加赶集网的链接
        array_unshift(self::$_LINKS, array('首页', __APP__));
        $html = ' <nav class="location">';
        
        $list = array();
        for($i=0; $i<count(self::$_LINKS); $i++) {
            if(!empty(self::$_LINKS[$i][1])) {
                $html .= '<a href="'. self::$_LINKS[$i][1]. '">'. self::$_LINKS[$i][0] .'</a>&gt;';
            }
            else {
                $html .= '<a>'. self::$_LINKS[$i][0] .'</a>';
            }
        } 
        $html .= '</nav>';
        return $html;
    }
}