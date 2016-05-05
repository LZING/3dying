<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head><title>3dying管理后台</title>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<META http-equiv=Pragma content=no-cache>
<META http-equiv=Cache-Control content=no-cache>
<META http-equiv=Expires content=-1><LINK href="../Public/images/cp.css" type=text/css rel=stylesheet>
</head>

<script type="text/javascript">
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '__PUBLIC__';
</script>
{:W('ShowComment',array('count'=>5))}
<script>
$(function(){
    $(".example8").click(function(){
        $("#inline_example1").html($(this).next("#more_inf").html());
    });
})
</script>
<script>
$(function(){
    $(".settingLeadership").click(function(){
        var leadership;
        var id;
        id=$(this).prev("select").attr("class");
        leadership=$(this).prev("select").val();
        $.post(APP+"/AdminUser/editLeadership",{leadership:leadership,id:id},function(data){
       	 data = eval("("+data+")");
         if(data.error==1){
             alert("修改失败");
             location.reload();
         }
         else{
             location.reload();
         }
        });
    });
    $(".settingAdmin").click(function(){
        var privates;
        var id;
        id=$(this).prev("select").attr("class");
        privates=$(this).prev("select").val();
        $.post(APP+"/AdminUser/editAdmin",{privates:privates,id:id},function(data){
       	 data = eval("("+data+")");
         if(data.error==1){
             alert("修改失败");
             //location.reload();
         }
         else{
             location.reload();
         } 
        });
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
<TD>[<A href="__URL__/members">All User</A>]
   <?php foreach($allType as $key=>$value) { ?>
       [<A href="__URL__/members/?type=<?php echo $value['value']?>"><?php echo $value['name'];?></A>] 
   <?php } ?>
</TD>
<TD align=right></TD></TR></TBODY></TABLE>
<TABLE class=tableoutline cellSpacing=1 cellPadding=4 width="100%" boder="0">
<FORM action=comment.php method=post>
<TBODY>
<TR class=tbhead align=middle>
<TD width="5%" noWrap>id# </TD>
<TD width="8%">Username</TD>
<TD width="7%" noWrap>English Name</TD>
<TD width="5%" noWrap>Chinese Name</TD>
<TD width="12%" noWrap>Member Type </TD>
<TD width="6%" noWrap>Degree</TD>
<TD width="6%" noWrap>Title </TD>
<TD width="8%" noWrap>Email </TD>
<TD width="9%" noWrap>Phone </TD>
<TD width="10%" noWrap>Homepage</TD>
<TD width="8%" noWrap>State & Setting</TD>
<TD width="8%" noWrap>More</TD>
</TR>
      <?php foreach($result as $key=>$value){ ?>
		<TR class=firstalt>
		  <TD noWrap align=middle><?php echo $value['id'];?></TD>
          <TD noWrap align=middle><?php echo $value['username'];?></TD>
          <TD noWrap align=middle><?php echo $value['english_name'];?></TD>
          <TD noWrap align=middle><?php echo $value['chinese_name'];?></TD>
          <TD noWrap align=middle>
              <select class="<?php echo $value['id'];?>" style="width: 95px;">
              <?php foreach ($allType as $k => $v) {?>
                  <option value="<?php echo $v['value']?>" <?php if($value['leadership']==$v['value']){ ?> selected="" <?php } ?> ><?php echo $v['name'];?></option>
              <?php }?>
              </select>
              <input class="settingLeadership" type="button" value="更改" />
          </TD>
          <TD noWrap align=middle><?php echo $newDegree[$value['degree']];?></TD>
          <TD noWrap align=middle><?php echo $newTitles[$value['titles']];?></TD>
          <TD noWrap align=middle><?php echo $value['email'];?></TD>
          <TD noWrap align=middle><?php echo $value['phone'];?></TD>
		  <TD noWrap align=middle><a href="<?php echo $value['homepage'];?>" target="_blank"><?php echo $value['homepage'];?></a> </TD>
		
		  <td align=middle noWrap>
          <?php if($value['privite']!=3){ ?>
            <select class="<?php echo $value['id'];?>">
                <option <?php if($value['privite']==0){ ?> selected="" <?php } ?>  value="0">禁用</option>
                <option <?php if($value['privite']==1){ ?> selected="" <?php } ?> value="1">普通</option>
                <option <?php if($value['privite']==2){ ?> selected="" <?php } ?> value="2">管理员</option>
            </select>
            <input class="settingAdmin" type="button" value="更改" />
          <?php } ?>
          </td>
          <td align="middle"  nowrap="" >
              <a class='example8' href="javascript:void(0);" >More</a>
              <div id="more_inf" style="display: none;">
                  <strong style="font-size: 18px;color: #06C;"><?php echo $value['English_name'];?></strong><br>
                  <img style="max-width: 300px;"  src="__ROOT__/<?php echo $value['image'];?>" />
                  
                  <p style="width:570px;" class="tited"><strong>Research</strong><br> 
                        <?php echo $value['research_main'];?>     
                  </p>
                  <p style="width:570px;" class="tited"><strong>Brief</strong><br> 
                        <?php echo html_entity_decode($value['brief']);?>     
                  </p>
              </div>
          </td>
		
 	    
</TR>
<?php } ?>
<TR class=tbhead align=middle>
<TD align=middle colSpan=12  width=1080>&nbsp;</TD></TR></FORM></TABLE>
<TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
<TBODY>
<TR>
<TD>{$page}</TD> 
<TD align=right></TD></TR></TBODY></TABLE><BR>
<CENTER>3dying管理后台</CENTER></BODY></html>