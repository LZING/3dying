<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class IndexAction extends CommonAction{
    
    public function init() {
        $this->assign('css', array(
            'category/common.css',
            'footer.css',
        ));
        parent::init();
    }
    public function defaultAction() {
        $result['top_article'][] = array(
            'ad' => null,
            'image' => null,
            'article' =>self::mergeResult($this->getNewArticle(null, 3),
                 $this->getHotArticle(null, 3)),
        );
        $result['topic'] = IndexPageConfig::$TOPIC;
        $result['top_image'] = IndexPageConfig::$IMAGE_TOP;
        $result['mid_image'] = IndexPageConfig::$IMAGE_MID;
        $result['down_image'] = IndexPageConfig::$IMAGE_DOWN;
        foreach (self::$CATEGORY['majory'] as $value) {
            $result['article'][] = array(
                'ad' => null,
                'image' => null,
                'majory_id' => $value['id'],
                'majory_name'=> $value['name'],
                'article' => self::mergeResult($this->getNewArticle($value['id'], 4),
                                 $this->getHotArticle($value['id'], 4)),
            );
        }
        
        $this->assign('title', self::$CATEGORY['name']);
        $this->assign('result', $result);
        $this->display();
    }
    
    
}