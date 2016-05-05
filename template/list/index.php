<?php $this->load('Public/header.php');?>
    <div class="content"><!--content内容板块开始-->
        <div class="content-one"><!--content-one开始-->
            <div class="list-fl"><!--栏目分类开始-->
                <span class="mxfl">模型分类：</span>
                <a class="mx" href="/list">全部模型</a>
                <?php $nowtype['name']='全部'; foreach($this->type as $key => $value) {
                    if($value['id'] == $this->cate_id) {
                        $nowtype = $value;
                    }
                    ?>
                <a class="mx" href="/list/?type=<?php echo $value['id'];?>"><?php echo $value['name'];?>模型</a>
                <?php }?>
            </div><!--栏目分类结束-->
            <div class="one"><!--one第一行开始-->
                <div class="present">您当前的位置：<a class="list-sy" href="/">首页</a>&gt;&gt;<a class="list-wz" href=""><?php echo $nowtype['name'];?>模型</a></div>
                <div class="clear"></div>
                <div class="chanpin"><!--chanpin开始-->
                    <?php foreach($this->list as $key => $value) { ?>
                    <div class="cp-two">
                        <div class="two-pic"><a href="/list/index/detail/?id=<?php echo $value['id'];?>" title="<?php echo $value['title'];?>" target="_blank"><img src="<?php echo $value['thumb'];?>"></a></div>
                        <div class="cp-titless">
                            <h1><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><?php echo mb_substr($value['title'], 0 , 10, 'utf8');?></a></h1>
                            <p><?php echo mb_substr($value['intro'], 0 , 25, 'utf8');?></p>
                        </div>
                    </div>
                    <?php } ?>
                </div><!--chanpin结束-->
                <div class="clear"></div>
                <div class="page-page"><!--page开始-->
                    <?php echo $this->page;?>
                </div><!--page结束-->
            </div><!--one第一行结束-->
        </div><!--content-one结束-->
    </div>
    <div class="clear"></div>
<?php $this->load('Public/footer.php');?>