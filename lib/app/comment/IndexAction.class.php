<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';


class IndexAction extends CommonAction{
    
    public function init() {
        parent::init();
    }
    public function defaultAction() {
        $content = addslashes(HttpNamespace::getPOST('content'));
        $puid = HttpNamespace::getPOST('puid');
        $backUrl = UrlNamespace::detailUrl(self::$MAJORY['id'], $puid);
        if (empty(self::$CATEGORY)) {
            $error = ErrorConfig::EMPTY_VALUE;
            if (strpos($backUrl,'?') === false) {
                $backUrl .= '?error=' . $error;
            }
            $backUrl .= '&error=' . $error;
            HttpNamespace::redirect($backUrl);
        }
        if (empty($content)) {//error = 1
            $error = ErrorConfig::EMPTY_VALUE;
            if (strpos($backUrl,'?') === false) {
                $backUrl .= '?error=' . $error;
            }
            $backUrl .= '&error=' . $error;
            HttpNamespace::redirect($backUrl);
        }
        if (isset($_SESSION['login']) && $_SESSION['login']) {
            $userId = $_SESSION['user']['id'];
            $nick_name = addslashes($_SESSION['user']['nick_name']);
        } else {
            $userId = 0;
            $nick_name = '匿名用户';
        }
        $ua = 0;
        $sql = "INSERT INTO " . self::$CATEGORY['table'] . "_comment (`puid`,`user_id`,
               `nick_name`,`content`,`times`,`ua`)VALUES({$puid},{$userId},'".$nick_name."',
               '".$content."',".time().",{$ua})";
        if (DBMysqli::getInstance()->execute($sql) > 0) {
            $sql = "UPDATE " .self::$CATEGORY['table'] . " set comment_times=comment_times+1,weight=weight+1 WHERE puid={$puid}";
            DBMysqli::getInstance()->execute($sql);
        }
     
        HttpNamespace::redirect($backUrl);
    }
}