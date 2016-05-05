<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head><title>3dying管理后台</title>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<META http-equiv=Pragma content=no-cache>
<META http-equiv=Cache-Control content=no-cache>
<META http-equiv=Expires content=-1><LINK href="../Public/images/cp.css" type=text/css rel=stylesheet>
<script type="text/javascript" src="../Public/js/jquery.js"></script>
</head>

<script type="text/javascript">
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '__PUBLIC__';
</script>
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
<script>
$(function(){
    $(".forbid").click(function(){
        if(confirm("确定禁言？")){
            $.post("/SJZws/index/forbid/",{
                id:this.id
            },function(data){
                if(data == 1){
                    alert("禁言成功");
                    location.reload();
                } else{ 
                    alert("禁言失败");
                    location.reload();
                }
            })
        }
    });
    
    $(".resum").click(function(){
        var id = $(this).attr('id');
        $.post("/SJZws/index/resume",{
            id:id
        },function(data){
            if(data == 1){
                alert("设置成功");
                location.reload();
            }
            else{ 
                alert("设置失败");
                location.reload();
            }
        })
});
    $(".upgrade").click(function(){
        if(confirm("确定升级？")){
            $.post("/SJZws/index/upgrade/",{
                id:this.id
            },function(data){
                if(data == 1){
                    alert("升级成功");
                    location.reload();
                } else{ 
                    alert("升级失败");
                    location.reload();
                }
            })
        }
    });
    $(".unupgrade").click(function(){
        if(confirm("确定降级？")){
            $.post("/SJZws/index/unupgrade/",{
                id:this.id
            },function(data){
                if(data == 1){
                    alert("降级成功");
                    location.reload();
                } else{ 
                    alert("降级失败");
                    location.reload();
                }
            })
        }
    });
})

<?php if ($this->msg){
	if ($this->msg['code']){
		echo "alert(".$this->msg['msg'].")";
		echo "location.reload();";
	}
}?>
</script>
<style>
.add {
	border:none;
}
.tit {
	width:134px;
	height:22px;
	float:left;
	display:block;
	line-height:18px;
	text-align:right;
}
.tited{
    font-size: 15px;
}
</style>
<BODY topMargin=10 marginheight="10" marginwidth="10">
<TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
<TBODY>
<TR>
<TD align=right></TD></TR></TBODY></TABLE>
<TABLE class=tableoutline cellSpacing=1 cellPadding=4 width="100%" boder="0">
<FORM action=comment.php method=post>
<TBODY>
<TR class=tbhead align=middle>
<TD width="5%" noWrap>id# </TD>
<TD width="8%">用户名</TD>
<TD width="5%">权限</TD>
<TD width="7%" noWrap>注册时间</TD>
<TD width="5%" noWrap>email</TD>
<TD width="12%" noWrap>vip</TD>
<TD width="6%" noWrap>score</TD>
<TD width="9%" noWrap>头像 </TD>
<TD width="15%" noWrap>设置</TD>
</TR>
      <?php foreach($this->user as $key=>$value){ ?>
		<TR class=firstalt>
		  <TD noWrap align=middle><?php echo $value['id'];?></TD>
          <TD noWrap align=middle><a href="/user/index/typelist?id=<?php echo $value['id'];?>" target="_blank"><?php echo $value['username'];?></TD>
          <TD noWrap align=middle><?php echo $value['admin'] ? "<span style='color:blue'>管理员</span>" : "普通会员";?></TD>
          <TD noWrap align=middle><?php echo date('Y-m-d',$value['rtime']);?></TD>
          <TD noWrap align=middle><?php echo $value['email'];?></TD>
          <TD noWrap align=middle><?php echo $value['vip'];?></TD>
          <TD noWrap align=middle><?php echo $value['score'];?></TD>
          <TD noWrap align=middle>
               <img style="width: 40px;" src="<?php echo $value['thumb'];?>" />
           </TD>
           <TD noWrap align=middle> 
           <?php if($value['forbid'] == 0 ){?>
               <a href="javascript:void(0);" class="forbid" id="<?php echo  $value['id'];?>">禁言</a>
               <?php }else {?>
               <a href="javascript:void(0);" class="resum" id="<?php echo  $value['id'];?>">恢复</a>
               <?php }?>
              丨 <a href="/SJZws/index/repwd/?uid=<?php echo $value['id']?>">改密</a>
              丨 
              <?php if($value['admin'] == 0 ){?>
               <a href="javascript:void(0);" class="upgrade" id="<?php echo  $value['id'];?>">升级</a>
               <?php }else {?>
               <a href="javascript:void(0);" class="unupgrade" id="<?php echo  $value['id'];?>">降级</a>
               <?php }?>
            
           </TD>
</TR>
<?php } ?>
<TR class=tbhead align=middle>
<TD align=middle colSpan=12  width=1080>&nbsp;</TD></TR></FORM></TABLE>
<TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
<TBODY>
<TR>
<TD><?php echo $this->page;?></TD> 
<TD align=right></TD></TR></TBODY></TABLE><BR>
<CENTER>3dying</CENTER></BODY></html>