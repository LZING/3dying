<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=7" />
    <meta name="keywords" content="3dsmax,3dmax,maya,3d模型,3d模型免费下载,游戏美术,3d设计师交流论坛,3d建模师,3d模型在线展示,网页嵌入3D模型,分享3D模型,上传3D模型,3d model">
    <meta name="description" content="3dying —— 最新最酷的3D设计师社交网站，提供3D模型上传、3D模型在线展示、3D模型外链分享。支持多种流行格式的3D模型直接上传，并可在线展示，以及插入到任何网页中。">
    <title>3dying ——最新最酷的3D设计师社交网站，提供3D模型上传、3D模型在线展示、3D模型外链分享</title>
    <?php
    if(is_array($this->cssfile) && !empty($this->cssfile)) {
        foreach($this->cssfile as $css) {
            echo '<link rel="stylesheet" type="text/css" href="../Public/' . $css . '?v='. VISION . '">';
        }
    }
    if(is_array($this->jsfile) && !empty($this->jsfile)) {
        foreach($this->jsfile as $js) {
            echo '<script type="text/javascript" src="../Public/' . $js . '?v='. VISION . '"></script>';
        }
    }
    ?>
<div id="page">
    <?php $this->load("user/widget/top_menu.php");?>
    <div id="panel_main">
<form method="post" id="form"  enctype="multipart/form-data">
        <div id="panel_main_inner">
            <div class="panel_main_top">
                <div class="panel_crumbs">
                    <div class="label_crumb label_click label_crumb_libs"><a href="/user/index/typelist">我的3D作品</a></div>
                    <div class="label_crumb_connector">&gt;</div>
                    <div class="label_crumb label_click label_crumb_lib">模型库</div>
                    <div class="label_crumb_connector">&gt;</div>
                    <div class="label_crumb label_crumb_last">上传</div>
                </div>
                <div class="panel_main_top_line"></div>
            </div>
            <div id="panel_info" data-intro="" data-step="1" data-position="right" class="">
                <div class="panel_one_info"><div class="label_info">*模型名</div>
                    <input class="edit_text" id="edit_name" name="title" maxlength="25" value="<?php echo $this->d3_arr['title'];?>">
                    <div class="label_error_info" id="label_name_error"></div>
                </div>
                <div class="panel_one_info">
                    <div class="label_info">类别</div>
                    <select class="edit_text" name="type" id="select_lib">
                        <?php foreach($this->type as $value) {
            
                     		if($this->d3_arr['type_id'] == $value['id']){
                     			echo '<option value="'.$value['id'].'" selected="selected">'.$value['name'].'</option>';
                     		}else {
                     			echo '<option value="'.$value['id'].'" >'.$value['name'].'</option>';
                     		}

                        }
                        ?>
                    </select>
                </div>
                <div class="panel_one_info">
                    <div class="label_info">下载权限</div>
                     <select class="edit_text" name="private" id="select_privacy">
                        <option value="1" <?php if($this->d3_arr['private']==1){echo 'selected="selected"';}?>>对所有人</option>
                        <option value="2" <?php if($this->d3_arr['private']==2){echo 'selected="selected"';}?>>vip</option>
                        <option value="3" <?php if($this->d3_arr['private']==3){echo 'selected="selected"';}?>>仅对我自己</option>
                    </select>
                </div>
                <div class="panel_one_info" id="download_privacy_tips">
                    <div class="label_info"></div>
                    <span class="edit_text">自己的模型本人始终可以下载。</span>
                </div>
                <div class="panel_one_info" id="panel_icon">
                    <div class="label_info">缩略图</div>
                    <div id="panel_select_icon">
                        <img id="img_icon" src="<?php echo $this->d3_arr['thumb'];?>">
                        <div id="label_icon_type">你可以上传JPG、JPEG、PNG文件。</div>
                        <div id="button_upload_icon" class="uploadify" style="height: 30px; width: 120px;">
                            <div id="button_upload_icon-button" class="uploadify-button " style="height: 30px; line-height: 30px; width: 76px;background-color: #F7F9FA;">
                                <input id="image" name="image" style="width: 300px;height: 21px;" type="file" value="" />
                            </div>
                        </div>
                        <div id="button_upload_icon-queue" class="uploadify-queue"></div>
                    </div>
                </div>
                <div class="panel_one_info">
                    <div class="label_info">描述</div>
                    <textarea name="intro" class="edit_text" id="textarea_introduce" maxlength="140" style="outline: none;"><?php echo $this->d3_arr['intro'];?></textarea>
                </div>
            </div>
            <div id="panel_upload_model" style="background-color:#FFFFFF">
                
                <div class="fieldset flash" id="fsUploadProgress">
                    <span class="legend">上传队列</span>
                </div>
                <div>
                    <span id="spanButtonPlaceHolder1"></span>
                        <input id="btnCancel" type="button" value="取消所有上传" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
                 </div>
                 <div id="video">
                 	<?php foreach ($this->atta_arr as $v){?>
                 	<div class="progressContainer green">
                 		<a class="progressCancel dellist" href="javascript:void(0);" style="visibility: visible;"></a>
                 		<div class="progressName"><?php echo $v['name'];?><input type="hidden" name="attachment[]" value="<?php echo $v['id']?>"></div>
                 	</div>
                 	<?php }?>
                 </div> 
            </div>
           <div id="button_upload_model" class="label_click" data-intro="点击开始上传" data-step="3">开始上传</div>
       </div>
</form>
   </div>
</div>
<script type="text/javascript">
var atta = <?php echo count($this->atta_arr);?>;
var swfu;
var PUBLIC = '../Public';
var swfu;
window.onload = function() {
    var settings1 = {
        flash_url : PUBLIC+"/swf/swfupload/swfupload.swf",
        flash9_url : PUBLIC+"/swf/swfupload/swfupload_fp9.swf",
        upload_url: "<?php echo __APP__;?>/swf",
        post_params: {uid : "<?php echo $this->user['id']; ?>", type : 'file', dir : '<?php echo date('H') . rand(1, 10000);?>'},
        file_size_limit : "1000 MB",
        file_upload_limit : 0,
        file_types :  "*.stl;*.obj;*.mtl;*.jpg;*.jpeg;*.png;*.tga;*.tif;*.bmp;*.npg;*.zip;*.7Z;*.rar;*.tar;*.zip;*.jar",
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
        button_placeholder_id: "spanButtonPlaceHolder1",
        button_text: '<span class="theFont" style="background-color: #49bcf3;">上传</span>',
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
        queue_complete_handler : queueComplete  // Queue plugin event
    };
    swfu = new SWFUpload(settings1);
};
function uploadError(file, errorCode, message){
    alert("已取消上传");
}
function uploadSuccess(file, serverData, responseReceived){

    if(responseReceived){
        if(parseInt(serverData)>=0 && parseInt(serverData)<=100){
            switch(parseInt(serverData)){
                case 1:{alert("上传文件超出大小！");break;}
                case 2:{alert("没有文件被上传！");break;}
                case 3:{alert("上传出错！");break;}
                case 4:{alert("上传失败");break;}
                case 5:{alert("文件名错误！");break;}
                case 6:{alert("上传文件格式不允许");break;}
                case 7:{alert("上传失败");break;}
                case 8:{alert("文件已经存在，请修改文件名");break;}
                default :{alert('上传失败');break;}
            } 
        }else{
            serverData = eval("("+serverData+")");
            var filelist = $('<div class="progressContainer green"><a class="progressCancel dellist" href="javascript:void(0);" style="visibility: visible;"></a><div class="progressName">'+serverData.name+'<input type="hidden" name="attachment[]" value="'+serverData.path+'"/></div><div class="progressBarStatus">上传成功</div></div>')
       
            $("#video").append(filelist);
            atta++;
        }
    } else{
        alert("上传出错2");
    }
    try {
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setComplete();
        progress.setStatus("Complete.");
        progress.toggleCancel(false);

    } catch (ex) {
        this.debug(ex);
    }
    return true;
}
$(function(){
    $("body").on('click','.dellist',function(){
        atta--;
        $(this).parent().remove(); 
    });
})
</script>
<script>
var flag = false;
$(function(){
    $("#button_upload_model").click(function(){
        if (flag) return false;
        if ($.trim($("#edit_name").val()) =='') {
            return $("#edit_name").focus(), $("#label_name_error").text("不能为空");
        }
        if(atta <=0) {
            alert('请上传附件');
            return false;
        }
        flag = true;
        $("#form").submit();
    });
	
})
</script>
<style>
.foot{
    overflow: visible;
    top:100px;
    position: relative;
}
</style>