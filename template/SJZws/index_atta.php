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
    $(".delatta").click(function(){
        if(confirm("确定删除？")){
            $.post("/SJZws/index/delatta/",{
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
<TD align=right></TD></TR></TBODY></TABLE>
<TABLE class=tableoutline cellSpacing=1 cellPadding=4 width="100%" boder="0">
<FORM action=comment.php method=post>
<TBODY>
<TR class=tbhead align=middle>
<TD width="2%" noWrap>&nbsp;</TD>
<TD width="3%" noWrap>编号 </TD>
<TD width="12%">专辑名称</TD>
<TD width="12%">模型名称</TD>
<TD width="8%">类别</TD>
<TD width="5%" >上传者</TD>
<TD width="5%" >上传时间</TD>
<TD width="10%" >设置</TD>
</TR>
      <?php foreach($this->atta as $key=>$value){ ?>
		<TR class=firstalt>
		 <TD noWrap align=middle><?php echo $key+1;?></TD>
		  <TD noWrap align=middle><?php echo $value['id'];?></TD>
		  <TD noWrap align=middle><a href="/user/index/typelist?id=<?php echo $value['user_id'];?>" target="_blank"><?php echo $value['title'];?></a></TD>
          <TD noWrap align=middle><a href="/list/index/detail/?id=<?php echo $value['3d_id'];?>" target="_blank"><?php echo $value['name'];?></a></TD>
          <TD noWrap align=middle><a href="/user/?type=<?php echo $value['type_id']?>&id=<?php echo $value['user_id'];?>" target="_blank"><?php echo $value['type_name'];?></a></TD>

          <TD noWrap align=middle><a href="/user/index/typelist?id=<?php echo $value['user_id'];?>" target="_blank"><?php echo $value['username'];?></TD>
          <TD noWrap align=middle><?php echo date('Y-m-d H:i:s',$value['utime']);?></TD>
           <TD noWrap align=middle> 
               <a href="javascript:void(0);" class="delatta" id="<?php echo  $value['id'];?>">删除</a>
                | 
               <a href="/user/upload/ad_edit/?uid=<?php echo $value['user_id'];?>&id=<?php echo $value['3d_id'];?>">修改</a>
            
           </TD>
</TR>
<?php } ?>
<TR class=tbhead align=middle>
<TD align=middle colSpan=12  width=1080>&nbsp;</TD></TR></FORM></TABLE>
<TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
<TBODY>
<TR>
<TD noWrap align=middle><?php echo $this->page;?></TD> 
<TD align=right></TD></TR></TBODY></TABLE><BR>
<CENTER>3dying</CENTER></BODY></html>