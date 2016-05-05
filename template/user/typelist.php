<div id="panel_libs" class="panel_pageturner panel_main">
<?php foreach($this->list as $key => $value){?>
    <div class="panel_lib_one <?php if($key%3==0){echo 'panel_lib_first';}?>">
        <div class="panel_img_lib">
            <a href="/user/?type=<?php echo $value['type_id'];?>&id=<?php echo $this->user['id'];?>" class="img_lib label_click" id="img_lib0">
            <?php foreach($value['list'] as $k => $model){?>
                <img class="img_lib_one img_lib_<?php echo $k > 1 ? DecBin($k) : '0'.DecBin($k);?>" src="<?php echo $model['thumb'];?>">
                <?php }?>
            </a>
        </div>
        <a href="/user/?type=<?php echo $value['type_id'];?>&id=<?php echo $this->user['id'];?>" id="label_lib0" class="label_lib label_click"><?php echo $value['type_name']?>(<?php echo $value['count'];?>)</a>
    </div>
    <?php }?>
</div>