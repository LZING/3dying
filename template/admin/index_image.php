<!DOCTYPE html>
<html>
<head>
<title>SWFUpload Demos - Simple Demo</title>
<link href="../Public/swf/css/default2.css" rel="stylesheet" type="text/css" />
<link href="../Public/images/cp.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="../Public/js/jquery.js"></script>
<script type="text/javascript" src="../Public/swf/swfupload/swfupload.js"></script>
<script type="text/javascript" src="../Public/swf/swfupload/swfupload.queue.js"></script>
<script type="text/javascript" src="../Public/swf/js/fileprogress.js"></script>
<script type="text/javascript" src="../Public/swf/js/handlers.js"></script>
<script type="text/javascript">
var swfu;
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '../Public';
window.onload = function() {
    var settings = {
        flash_url : PUBLIC+"/swf/swfupload/swfupload.swf",
        flash9_url : PUBLIC+"/swf/swfupload/swfupload_fp9.swf",
        upload_url: APP+"/swf/index/image",
        post_params: {"PHPSESSID" : "<?php echo session_id(); ?>", type : 'image','dir':''},
        file_size_limit : "10 MB",
        file_types : "*.gif;*.jpg;*.jpeg;*.png",
        file_types_description : "All Files",
        file_queue_limit : 0,
        custom_settings : {
            progressTarget : "fsUploadProgress",
            cancelButtonId : "btnCancel"
         },
         debug: false,
    
    // Button settings
        button_image_url: PUBLIC+"/swf/images/TestImageNoText_65x29.png",
        button_width: "65",
        button_height: "29",
        button_placeholder_id: "spanButtonPlaceHolder",
        button_text: '<span class="theFont">Hello</span>',
        button_text_style: ".theFont { font-size: 16; }",
        button_text_left_padding: 12,
        button_text_top_padding: 3,
        // The event handler functions are defined in handlers.js
        swfupload_preload_handler : preLoad,
        swfupload_load_failed_handler : loadFailed,
        file_queued_handler : fileQueued,
        file_queue_error_handler : fileQueueError,
        file_dialog_complete_handler : fileDialogComplete,
        upload_start_handler : uploadStart,
        upload_progress_handler : uploadProgress,
        upload_error_handler : uploadError,
        upload_success_handler : uploadSuccess,
        upload_complete_handler : uploadComplete,
        queue_complete_handler : queueComplete	// Queue plugin event
    };
    swfu = new SWFUpload(settings);
};
function uploadError(file, errorCode, message){
    alert("上传出错1");
}
function uploadSuccess(file, serverData, responseReceived){
    //serverData = serverData.replace(/(^\s*)|(\s*$)/g, "");
    if(responseReceived){
        if(parseInt(serverData)>=0 && parseInt(serverData)<=7){
            switch(parseInt(serverData)){
                case 1:{alert("上传文件超出大小！");break;}
                case 2:{alert("没有文件被上传！");break;}
                case 3:{alert("上传出错！");break;}
                case 4:{alert("Upload failed");break;}
                case 5:{alert("File has no name！");break;}
                case 6:{alert("上传文件格式不允许");break;}
                case 7:{alert("File could not be saved");break;}
            } 
        }else{
            var filelist=$('<a href="javascript:void(0);" class="del"><img style="width: 70px;height: 60px;margin-right: 10px;" src="'+serverData+'" /><input type="hidden" name="imagess[]" value="'+serverData+'"/>删除</a>');
            filelist.click(function(){
               $(this).remove();
            });
            if($("#image").find('img').length<5){
                $("#image").append(filelist);
            } else{
                $("#image").children('a:first-child').remove();
                $("#image").append(filelist);
            }
        }
    } else{
        alert("上传出错2");
    }
}
</script>
<style>
td {
font-family: Tahoma,MS Shell Dlg;
font-size: 12px;
}
</style>
<script>
$(function(){
    $("#submit").click(function(){
        if($("#type").val()==0){
            alert("请选择分类！");
            return false;
        }else if($("#image").find('img').length<1){
            alert("请上传图片");
            return false;
        }
    });
});
</script>
</head>
<body topMargin=10 marginheight="10" marginwidth="10">
  <form id="form1" action="" method="post" >
  <table class="tableoutline" cellspacing="1" cellpadding="4" width="100%" align="center" border="0">
    <tbody style="width: 1088px;">
        <tr id="cat">
        <td class="tbhead" colspan="2"><b>图片 </b></td>
        </tr>
        <tr class="firstalt" >
        <td width="80%">
        <td>
        	<div id="content">
      			<div class="fieldset flash" id="fsUploadProgress">
        			<span class="legend">Upload Queue</span>
      			</div>
        		<div id="divStatus">0 Files Uploaded</div>
       			<div>
      				<span id="spanButtonPlaceHolder"></span>
      				<input id="btnCancel" type="button" value="Cancel All Uploads" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
       			</div>
                <br />
              
                <div id="image">
                
                </div>
                <div id="image_url">
                
                </div>
               
                
                 <div>
                    <tr class="firstalt">
                    <td width="33%" style="font-size: 17px;color: blue;">添加链接和标题</td>
                    <td width="67%">
                    </td>
                    </tr>
                </div>
                <div>
                    <tr class="firstalt">
                    <td width="33%">Link_1 And Title_1:</td>
                    <td width="67%">
                   
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_0" name="link_0" type="text"  />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_0" name="title_0" type="text"  />
                    </td>
                    </tr>
                </div>
                <div>
                    <tr class="firstalt">
                    <td width="33%">Link_2 And Title_2:</td>
                    <td width="67%">
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_1" name="link_1" type="text" value="" />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_1" name="title_1" type="text" value="" />
                    </td>
                    </tr>
                </div>
                <div>
                    <tr class="firstalt">
                    <td width="33%">Link_3 And Title_3:</td>
                    <td width="67%">
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_2" name="link_2" type="text" value="" />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_2" name="title_2" type="text" value="" />
                    </td>
                    </tr>
                </div>
                <div>
                    <tr class="firstalt">
                    <td width="33%">Link_4 And Title_4:</td>
                    <td width="67%">
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_3" name="link_3" type="text" value="" />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_3" name="title_3" type="text" value="" />
                    </td>
                    </tr>
                </div>
                 <div>
                    <tr class="firstalt">
                    <td width="33%">Link_5 And Title_5:</td>
                    <td width="67%">
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_3" name="link_4" type="text" value="" />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_3" name="title_4" type="text" value="" />
                    </td>
                    </tr>
                </div>
                 <div>
                    <tr class="firstalt">
                    <td width="33%">Link_6 And Title_6:</td>
                    <td width="67%">
                    	<input style="width: 500px;height: 20px;font-size: 15px;" id="link_3" name="link_5" type="text" value="" />
                        <input style="width: 300px;height: 20px;font-size: 15px;" id="title_3" name="title_5" type="text" value="" />
                    </td>
                    </tr>
                </div>
                <div>
                    <tr class="tbhead">
                        <td align="middle" colspan="2">
                            <input id="submit" type="submit" value="Submit" />
                            <input class="bginput" accesskey="r" type="reset" value="Reset " name=""/>
                        </td>
                    </tr>
                </div>

            </div>
        </td>
        </td>
        </tr>
     
    </tbody>

</table>
  </form>
</body>
</html>

