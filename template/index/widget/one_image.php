<div class="oneImg" style="text-align: center;font-size: 0px;background-color: #eee;">
  <ul>
    <li style="background-color: #F2F2F2;border-bottom: 1px solid #F2F2F2;font-size: 16px;height: 50px;line-height: 36px;overflow: hidden;text-align: center;">
<?php if(isset($image) && !empty($image)) {?>
     <a href="<?php echo $image['href'];?>"><img alt="<?php echo $image['title']?>" src="<?php echo $image['url'];?>"></a> 
<?php }?>
    </li>
  </ul>
</div>
