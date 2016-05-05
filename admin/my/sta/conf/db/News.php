<?php
class News {
    public static $TYPE = array(
        'news' => array(
            'name'  => 'News',
            'allTypes' => array(1, 2),
            'child' => array( 
                1 => array(//模型
                    'value' => 1,
                    'brief' => 'News',
                    'name'  => 'news',
                ),
                2 => array(//通知
                    'value' => 2,
                    'brief' => 'Notice',
                    'name'  => 'notice'
                ),
            ),
        )
    );
}