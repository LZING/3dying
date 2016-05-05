<?php
class ShowCommentWidget extends Widget{     

    public function render($data){    

       echo <<<EOT
           <link media="screen" rel="stylesheet" href="../Public/css/colorbox.css" /> 
    	   <script src="../Public/js/jquery.min.js"></script> 
    	   <script src="../Public/js/jquery.colorbox.js"></script>
    	  <script>
		$(document).ready(function(){
			$(".example8").colorbox({
			  'width':660,
              'height':400,
              'opacity': 0,
              'inline' : true,
              'href':"#inline_example1,.setting_leadership"
               });
		});
	</script>
    
    <div style='display:none'> 
		<div id='inline_example1' style='padding:10px; background:#fff;'> 
	    <div id='contentHtml'></div>
               <textarea style="width: 400px;height: 150px;" id='replayContent'></textarea>
                <input name="sub" value="提交" class="subed" type="button" />
		</div> 
		</div> 
	</div> 
    	
EOT;
    }     

}  
?>