<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head><title>3dying</title>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<META http-equiv=Pragma content=no-cache>
<META http-equiv=Cache-Control content=no-cache>
<META http-equiv=Expires content=-1>
<LINK href="../Public/images/cp.css" type=text/css rel=stylesheet>
<script type="text/javascript" src="../Public/js/jquery.js"></script>
</HEAD>
<script type="text/javascript">
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '__PUBLIC__';
</script>
<script>
$(function(){
    $(".delete").click(function(){
        if(confirm("确定删除图片？")){
            $.post("/admin/index/imagedelete/",{
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
    
    $(".setUp").click(function(){
        var id = $(this).prev('a').attr('id');
        
        $.post("/admin/index/setUpImage",{
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
})
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
<TD>[<A href="__URL__/imageList">图片</A>]</TD>
<TD align=right></TD></TR></TBODY></TABLE>
<TABLE class=tableoutline cellSpacing=1 cellPadding=4 width="100%" boder="0">
<FORM action=comment.php method=post>
<TBODY>
<TR class=tbhead align=middle>
<TD width="8%" noWrap>id </TD>
<TD width="18%">标题</TD>
<TD width="18%">连接</TD>
<TD width="8%" noWrap>时间</TD>
<TD width="10%" noWrap>设置 </TD>
<TD width="12%" noWrap>详细 </TD>
</TR>
    <?php 
        foreach($this->image as $key=>$value) { ?>
		<TR class=firstalt>
		   <TD noWrap align=middle> <?php echo  $value['id'];?> </TD>
           <TD noWrap align=middle> <?php echo  $value['title'];?> </TD>
           <TD noWrap align=middle> <?php echo  $value['link'];?> </TD>
           <TD noWrap align=middle> <?php echo  date("Y-m-d",$value['time']);?> </TD>
           <TD noWrap align=middle> 
               <a href="javascript:void(0);" class="delete" id="<?php echo  $value['id'];?>">删除</a>&nbsp;&nbsp;
               <a class="setUp" href="###">置顶</a>
           </TD>
		   <TD noWrap align=middle>
               <img style="width: 40px;" src="<?php echo $value['image'];?>" />
           </TD>
		</TR>
    <?php } ?>

<TR class=tbhead>
<TD align=middle colSpan=10>&nbsp;</TD></TR></FORM></TABLE>
<TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
<TBODY>
<TR>
<TD align=right></TD></TR></TBODY></TABLE><BR>
<CENTER>3dying</CENTER></BODY></html>