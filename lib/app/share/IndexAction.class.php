<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';
require_once APP . '/share/include/ShareVar.class.php';
require_once APP . '/detail/include/DetailBaseAction.class.php';
require_once THINKPHP . '/app/detail/DetailNamespace.class.php';

class IndexAction extends DetailBaseAction{
   
    public static $TYPE = NULL;
    public static $URL  = NULL;
    public static $ARTICLE = NULL;
    private $_params = array();
    
    public function init() {
        parent::init();
    }
    public function defaultAction() {
        self::$TYPE = (int)HttpNamespace::getGET('type', 1);
        if (empty(self::$CATEGORY) || empty(self::$PUID)) {
            $this->_error();
        }
        self::$ARTICLE = DetailNamespace::getArticle(self::$CATEGORY, self::$PUID);
        if (empty(self::$ARTICLE)) {
            $this->_error();
        }
        self::$ARTICLE['title'] = self::$ARTICLE['title'] . ' - 大头狗日记';
        self::$URL = 'http://datougou.cn' . UrlNamespace::detailUrl(self::$MAJORY['id'], self::$PUID);
        $this->_bulidUrl();
        DetailNamespace::increaseShareTimes(self::$CATEGORY, self::$PUID);
        HttpNamespace::redirect($this->_getUrl()) ;
    }
    
    private function _bulidUrl() {
        if (!array_key_exists(self::$TYPE, ShareVar::$SHARE_TYPE)) {
            return false;
        }
        if (self::$TYPE == ShareVar::XINLANG_WEIBO) {
            $this->_setParams('title', self::$ARTICLE['title'] . ' - '.mb_substr(strip_tags(self::$ARTICLE['content']), 0, 50, 'utf-8'));
            $this->_setParams('url', self::$URL);
            $this->_setParams('pic', '');
            $this->_setParams('ralateUid', '');
         } elseif (self::$TYPE == ShareVar::QQ_KONGJIAN) {
            $this->_setParams('title', self::$ARTICLE['title']);
            $this->_setParams('url', self::$URL);
            $this->_setParams('pics', '');
            $this->_setParams('summary', mb_substr(strip_tags(self::$ARTICLE['content']), 0, 90, 'utf-8'));
        } elseif (self::$TYPE == ShareVar::TX_WEIBO) {
            $this->_setParams('title', self::$ARTICLE['title']);
            $this->_setParams('url', self::$URL);
            $this->_setParams('pic', '');
            $this->_setParams('summary', mb_substr(strip_tags(self::$ARTICLE['content']), 0, 90, 'utf-8'));
            $this->_setParams('site','');
     
        }
    }
    
   
    private function _getUrl() {
        return ShareVar::$SHARE_TYPE[self::$TYPE]['url'] . http_build_query($this->_params);
    }
    private function _setParams($key, $value) {
        $this->_params[$key] = $value;
    }
}