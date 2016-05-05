<?php
require_once APP . '/detail/include/DetailBaseAction.class.php';
require_once THINKPHP . '/app/detail/DetailNamespace.class.php';
require_once APP . '/detail/include/DetailBread.class.php';

class IndexAction extends DetailBaseAction{
    
    public static $ARTICLE = NULL;
    
    public function init() {
        $this->assign('css', array(
            'detail/global.css',
            'detail/style.css',
            'detail/responsive.css',
            'footer.css',
        ));
        parent::init();
    }
    public function defaultAction() {
        
        if (empty(self::$CATEGORY) || empty(self::$PUID)) {
            $this->_error();
        }
        self::$ARTICLE = DetailNamespace::getArticle(self::$CATEGORY, self::$PUID);
   
  
        if (empty(self::$ARTICLE)) {
            $this->_error();
        }
        //
        $code = self::getErrorCode();
        $result['error'] = isset(ErrorConfig::$COMMENT[$code]) ? ErrorConfig::$COMMENT[$code] : null;
        //内容
        $result['title'] = self::$ARTICLE['title'];
        $result['article'] = self::$ARTICLE;
        //评论
        $result['comment'] = DetailNamespace::getComment(self::$CATEGORY, self::$PUID);
        //增加阅读次数
        DetailNamespace::increaseReadTimes(self::$CATEGORY, self::$PUID);
        //顶部ad
        $result['ad_top']= $this->_getAdTop();
        //上面 下面 右侧的image
        $result['image'] = $this->_getImageTop();
        //面包屑
        $result['bread'] = $this->_setBread();
        //上一篇 下一篇
        $result['near'] = $this->_getNearArticle();
        //相关文章
        $result['related'] = $this->_getRelatedArticle();
        //全网热点
        $result['all_hot'] = IndexPageConfig::$TOP_ARTICLE;
        //频道热点
        $result['hot'] = CommonNamespace::getHotArticle(self::$CATEGORY['id'], self::$MAJORY['id'], 5);
        //频道最新
        
        $result['new'] = CommonNamespace::getNewArticle(self::$CATEGORY['id'], self::$MAJORY['id'], 5);
       
        $this->assign($result);
        $this->display();
    }
    
    /**
     * @brief 0 上一篇 ，1下一篇
     */
    private function _getNearArticle() {
        return DetailNamespace::getNearArticle(self::$CATEGORY, self::$PUID);
    }
    private function _getImageTop() {
        return null;
    }
    private function _getAdTop() {
        return array(
            0 => array(
                'title' => 'xapian的安装',
                'url'   => '/diary/index.php/detail/?majory=102&puid=162109',
            ),
        );
    }
    
    /**
     * @brief 相关文章
     */
    private function _getRelatedArticle() {
        //日记的话 推荐相关日记本
        return DetailNamespace::getRelateArticle(self::$CATEGORY, self::$ARTICLE);
    }
    private function _setBread() {
        DetailBread::set(self::$CATEGORY['name'], __APP__.'/category/?category=' . self::$CATEGORY['id']);
        DetailBread::set(self::$ARTICLE['majory'], __APP__.'/majory/?majory=' . self::$ARTICLE['majory_id']);
        DetailBread::set(self::$ARTICLE['title']);
        return DetailBread::getHtml();
    }
}