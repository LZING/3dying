<html><HEAD><TITLE>3dying管理后台</TITLE>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<META http-equiv=Pragma content=no-cache>
<META http-equiv=Cache-Control content=no-cache>
<META http-equiv=Expires content=-1>
<LINK href="../Public/images/cp.css" type=text/css rel=stylesheet>
<script src="../Public/js/jquery.min.js" ></script>
<script type="text/javascript">
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '__PUBLIC__';
</script>

</HEAD>
<BODY topMargin=10 marginheight="10" marginwidth="10">
   
        <FORM name="form1" action="__URL__/contact_post" method="post" enctype="multipart/form-data" >
        
            <TABLE class=tableoutline cellSpacing=1 cellPadding=4 width="100%" align=center border=0>
            <TBODY>
                <TR id=cat>
                    <TD class=tbhead colSpan=2><B>Contact Us </B></TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">Image:</TD>
                        <TD width="67%">
                        	<img class="banner_img" src="__ROOT__/<?php echo $result['image'];?>" style="width:958px;height:110px">
                        </TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">UpdateImage:</TD>
                        <TD>
                            <input id="image" name="image" style="width: 300px;height: 21px;" type="file" value="" />（jpg,jpeg,jif <3M）
                        </TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">Tel:</TD>
                        <TD width="67%">
                        	<input id="tel" name="tel" style="width: 300px;height: 21px;" type="text" value="<?php echo $result['tel'];?>" />
                        </TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">Fax:</TD>
                        <TD width="67%">
                        	<input id="fax" name="fax" style="width: 300px;height: 21px;" type="text" value="<?php echo $result['fax'];?>" />
                        </TD>
                    </TR>
                    
                    <TR class=firstalt nowrap>
                        <TD width="33%">Email:</TD>
                        <TD width="67%">
                        	<input id="email" name="email" style="width: 300px;height: 21px;" type="text" value="<?php echo $result['email'];?>" />
                        </TD>
                    </TR>
                    <TR class=firstalt>
                        <TD vAlign=top width="33%">Postcode:</TD>
                        <TD>
                        		<input id="postcode" name="postcode" style="width: 300px;height: 21px;" type="text" value="<?php echo $result['postcode'];?>" />                      
                        </TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">Belong To:</TD>
                        <TD width="67%">
                        	<textarea id="belong" name="belong" style="width: 500px;height: 150px;"><?php echo $result['belong'];?></textarea>
                        </TD>
                    </TR>
                    <TR class=firstalt nowrap>
                        <TD width="33%">Address:</TD>
                        <TD width="67%">
                        	<textarea id="address" name="address" style="width: 500px;height: 150px;"><?php echo $result['address'];?></textarea>
                        </TD>
                    </TR>
                    <TR class=tbhead>
                    <TD align=middle colSpan=2> <input id="submit" type="submit" value="Sbumit"/><INPUT class=bginput accessKey=r type=reset value="Rest" name=""> </TD>
            </TR>
            </TBODY>
            </TABLE>
        </FORM>
    
    <BR>
    
    
    
    <TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
    <TBODY>
    <TR>
    <TD>{$page}</TD>
    <TD align=right></TD></TR></TBODY></TABLE>
    
    
    
    
    
    <CENTER>3dying管理后台</CENTER>
</BODY>
</html>