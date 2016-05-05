<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<title>软件站  </title>
<meta content="text/html; charset=utf8" http-equiv="Content-Type"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="-1"/>
<link rel="stylesheet" href="../Public/images/cp.css" type="text/css"/>
<script src="../Public/js/jquery.js"></script>
</head>
<body leftmargin="10" topmargin="10" marginwidth="10" marginheight="10" >
<script type="text/javascript">
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '__PUBLIC__';
</script>
<script >
$(function(){
    $(".tbnav").click(function(){        
         if($(this).next("tr").is(":visible")){
		    $(this).find("img").attr("src","../Public/images/collapse.gif");
			$(this).next("tr").hide();

		 }
		 else{
		     $(this).find("img").attr("src","../Public/images/expand.gif");
		     $(this).next("tr").show();
		 }
    });
})

</script>

<table width="100%" border="0" cellspacing="4" cellpadding="1">
 <tr>
  <td align="center">
   <b><a href="__APP__" target="blank">3dying</a></b>
  </td>
 </tr>
</table>
<table width="100%" border="0" cellspacing="1" cellpadding="1">
  <tr class="tbnav" style="cursor: hand" >
    <td><img id="nav_img_2" src="../Public/images/expand.gif" align="absmiddle" />图片管理</td>
  </tr>
  <tr id="nav_tr_2" >
      <td>
         <table width="100%" cellpadding="0" cellspacing="1" border="0">
                      <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
                        <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;<a href="/admin/index/image" target="content">首页播放图片</a>
                        </td>
                     </tr>
                     <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
                        <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;<a href="/admin/index/imagelist" target="content">图片列表</a>
                        </td>
                     </tr>
                                    
         </table>    
      </td>
  </tr>
  <tr class="tbnav" style="cursor: hand" >
    <td><img id="nav_img_4" src="../Public/images/expand.gif" align="absmiddle"/>会员</td>
  </tr>
  <tr id="nav_tr_4" >
     <td>
         <table width="100%" cellpadding="0" cellspacing="1" border="0">
                     <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
                        <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;<a href="/admin/index/user/" target="content">会员列表</a>                        
                        </td>
                     </tr>
                     
                      
         </table>    
     </td>
  </tr>
  <tr class="tbnav" style="cursor: hand" >
      <td><img id="nav_img_3" src="../Public/images/expand.gif" align="absmiddle"/>模型管理</td>
  </tr>
  <tr id="nav_tr_3" >
    <td>
        <table width="100%" cellpadding="0" cellspacing="1" border="0">
            
            <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
              <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/admin/index/atta/" target="content">模型列表</a> </td>
            </tr>
            <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
              <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/user/upload/ad_upload/" target="content">添加模型</a> </td>
            </tr>
        </table>
    </td>
  </tr>
  
<!--  <tr class="tbnav" style="cursor: hand" >
<!--       <td><img id="nav_img_13" src="../Public/images/expand.gif" align="absmiddle"/>下载</td> -->
<!--   </tr> -->
<!--   <tr id="nav_tr_13" > -->
<!--       <td> -->
<!--           <table width="100%" cellpadding="0" cellspacing="1" border="0"> -->
 <!--             <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
<!--                   <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="__APP__/AdminDownload/downloadList" target="content">下载列表</a> </td> -->
<!--               </tr> -->
 <!--             <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
<!--                   <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="__APP__/AdminDownload/addDownload" target="content">添加下载</a> </td> -->
<!--               </tr> -->
<!--           </table> -->
<!--       </td> -->
<!--   </tr> -->
   <tr class="tbnav" style="cursor: hand" >
      <td><img id="nav_img_13" src="../Public/images/expand.gif" align="absmiddle"/>留言管理</td>
  </tr>
  <tr id="nav_tr_13" >
      <td>
          <table width="100%" cellpadding="0" cellspacing="1" border="0">
              <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="__APP__/AdminMessage/message" target="content">留言列表</a> </td>
              </tr>
          </table>
      </td>
  </tr>
   <tr class="tbnav" style="cursor: hand" >
      <td><img id="nav_img_13" src="../Public/images/expand.gif" align="absmiddle"/>关于我们</td>
  </tr>
  <tr id="nav_tr_13" >
      <td>
          <table width="100%" cellpadding="0" cellspacing="1" border="0">
              <tr class="firstalt" onmouseover="this.className='secondalt'" onmouseout="this.className='firstalt'">
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;<a href="__APP__/Admin/contact" target="content">关于我们</a> </td>
              </tr>
          </table>
      </td>
  </tr>
</table>
<br />
<center>
  3dying管理后台
</center>
</body>
</html>