<style>
.panel_select_page {
padding: 50px 0 20px 0;
}
.panel_select_page {
position: relative;
float: left;
width: 100%;
height: 22px;
}
.page_button_disable {
background-color: #f4f4f4;
color: #afafaf;
}
.page_button {
position: relative;
float: right;
width: 49px;
height: 20px;
border: 1px solid #cdcdcd;
font-size: 13px;
line-height: 22px;
text-align: center;
}
.label_click {
cursor: pointer;
}
.panel_page_num {
position: relative;
height: 22px;
float: right;
margin-right: 10px;
}
.page_num_selected {
color: #8c8c8c;
}
.page_num {
position: relative;
float: left;
width: 30px;
text-align: center;
height: 22px;
line-height: 22px;
font-size: 13px;
}
.page_num_unselected {
color: #1da4de;
}
.page_button_last {
margin-right: 5px;
}
</style>
<div id="panel_lib">
    <ul class="thumbnails">
    <?php foreach($this->list as $key => $value) { 
            if(!$value['id']) continue;
        ?>
        <li class="thumbnail">
            <div class="model-thumbnail pr">
                <a class="model-link" href="/list/index/detail/?id=<?php echo $value['id'];?>" title="<?php echo $value['title'];?>" target="_blank">
                    <img class="cover" src="<?php echo $value['thumb'];?>">
                    <span class="private off"></span>
                </a>
                <div class="model-meta">
                    <span class="model-name active"><?php echo mb_substr($value['title'], 0 , 15, 'utf8');?></span>
                    
                    <div class="model-stats">
                        <ul>
                            <li class="priviledge hidden" title="对所有人可见"></li>
                            <li class="eye"><?php echo $value['read'];?></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tip_models" style="display: none;width:300px;right:-72px;">
                <div id="panel_share" style='width:300px;'>
                    <div class="label_share">转发</div>
                    <?php 
                    $url   = urlencode('http://www.3dying.com/list/index/detail/?id='.$value['id']);
                    $title = $value['title'];
                    $pic   = urlencode('http://www.3dying.com/'.$value['thumb']);
                    ?>
                    <a href="http://service.weibo.com/share/share.php?url=<?php echo $url;?>&type=6&count=0&appkey=&title=<?php echo $title;?>&pic=<?php echo $pic;?>&rnd=1397637334382"><div class="button_share button_share_tsina label_click"></div></a>
                    <a href="http://share.v.t.qq.com/index.php?c=share&a=index&url=<?php echo $url;?>&title=<?php echo $title;?>&pic=<?php echo $pic;?>&site=www.3dying.com"><div class="button_share button_share_tqq label_click"></div></a>
                    <a href="http://www.douban.com/share/service?href=<?php echo $url;?>&name=<?php echo $title;?>&image=<?php echo $pic;?>"><div class="button_share button_share_douban label_click"></div></a>
                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<?php echo $url;?>&title=<?php echo $title;?>&pics=<?php echo $pic;?>&site=www.3dying.com"><div class="button_share button_share_qzone label_click"></div></a>
          			<?php if ($this->checkid || $this->user_id==$value['user_id']){?>&nbsp;&nbsp;
          			<a href="javascript:void(0);" class="del3d"  id=<?php echo $value['id']?> style="color:#C7E42A;font-weight:bold;font-size:12px">删除</a> 
          			<a href="/user/upload/edit/?uid=<?php echo $this->user['id']?>&id=<?php echo $value['id']?>" style="color:#C7E42A;font-weight:bold;font-size:12px">修改</a><?php }?>
                </div>
                <?php if($this->show){ ?>
                <div class="button_models_collect button_models label_click" id="<?php echo $value['id'];?>">取消收藏</div>
                <?php } ?>
            </div>
        </li>
        <?php } ?>
    </ul>
</div>
<div class="panel_select_page">
<?php echo $this->page;?>
</div>

<script>
$(function(){

	$(".del3d").click(function(){
        if(confirm("确定删除？")){
            $.post("/user/index/del3d/",{
                id:this.id
            },function(data){
                if(data == 1){
                    alert("删除成功");
                    location.reload();
                } else{ 
                    alert("删除失败");
                    location.reload();
                }
            })
        }
    });
    
    $(".thumbnail").hover(function() {
		 $(this).find(".tip_models").show();
		}, function() {
			$(this).find(".tip_models").hide();
		});
    $(".button_models_collect").click(function(){
        var id=$(this).attr('id');
        $.get('/list/index/collect',{id:id},function(data){
            if (data==1) {
               location='/user/index/collect';
            }else{
                location='/user/index/collect';
            }
        });
    });
})
</script>
