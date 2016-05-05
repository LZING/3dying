<?php foreach($article as $key => $value) {?>
<div class="module">
  <div class="module_header"><h2><a href="" class="cur"><?php echo $value['category_name'];?></a></h2>
    <!-- <ul class="category">
      <li><a data-cid="101" href="">tt</a></li>
      <li><a data-cid="102" href="">tt</a></li>
      <li><a data-cid="103" href="">tt</a></li>
      <li><a data-cid="106" href="">tt</a></li>
    </ul> -->
  </div>
  <div class="module_slider">
    <ul class="module_slider_cont" style="width: 500%;">
      <li style="width: 20%;">
      <div class="module_imgNewsTwoCol">
         <?php if (!empty($value['image'])) {?>
          <div class="module_imgNewsTwoCol_col">
            <a href="" title="">
              <img class="lazy" data-original="" src="" alt="" width="130" height="105" style="display: inline;">
              <p>tt</p>
            </a>
          </div>
          <div class="module_imgNewsTwoCol_col">
            <a href="" title="">
              <img class="lazy" data-original="" src="" alt="" width="130" height="105" style="display: inline;">
              <p>tttt</p>
            </a>
          </div>
          <?php }?>
        </div>
        <ul class="module_list ">
        <?php foreach ($value['article'] as $v){?>
          <li><a href="<?php echo UrlNamespace::detailUrl($v['majory_id'], $v['puid'])?>">
          <?php if (isset($v['diary_book'])) {?>
            <i class="diaryBook"><?php echo $v['diary_book'];?></i>
          <?php } else {?>
            <i class="cmtNum"><?php echo $v['comment_times'];?></i>
          <?php }?>
            <i class="channel">[<?php echo $v['majory'];?>]</i><?php echo $v['title'];?></a>
          </li>
        <?php }?>
         </ul>
        <div class="module_button"><a href="<?php echo UrlNamespace::categoryUrl($value['category_id']);?>">进入<?php echo $value['category_name']?>频道</a></div>
      </li>
     </ul>
  </div>
  <?php if (!empty($value['ad'])) {?>
    <ul class="module_list adv">
      <li><a href="">tetesttesttesttestst</a></li>
      <li><a href="">testtesttesttest</a>|<a href="">testtesttesttest</a></li>
    </ul>
   <?php }?>
</div>
<?php }?>