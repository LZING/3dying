<?php 


function escape($str){


preg_match_all("/[\x80-\xff].|[\x01-\x7f]+/",$str,$newstr);


$ar = $newstr[0];


$reString = '';


foreach($ar as $k=>$v){


   if(ord($ar[$k])>=127){


    $tmpString=bin2hex(iconv("GBK","ucs-2//IGNORE",$v));


    if (!eregi("WIN",PHP_OS)){


     $tmpString = substr($tmpString,2,2).substr($tmpString,0,2);


    }


    $reString.="%u".$tmpString;


   }else{


    $reString.= rawurlencode($v);


   }


}


return $reString;


}


?>


<!DOCTYPE html>


<html lang="zh-CN">


    <head>


    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


    <title><?php echo $this->result['title'];?></title>


    <meta name="keywords" content="">


    <meta name="description" content="">


    <meta http-equiv="X-UA-Compatible" content="IE=edge">


    <meta http-equiv="cache-control" content="no-cache"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


    <link rel="stylesheet" href="../Public/css/list/bootstrap.css">


     <script type="text/javascript" src="../Public/js/jquery.js"></script>


     <script type="text/javascript" src="../Public/js/boostrap.min.js"></script>





    <script type="text/javascript" src="http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js"></script>


    <link rel="stylesheet" href="../Public/css/list/model.css">


    <link rel="stylesheet" href="../Public/css/user/introjs.css">


    </head>


    <body>


    <div id="header" class="navbar navbar-inverse">


         <div class="inner">


             <div class="navbar-header">


                 <a class="navbar-brand" href="/"><img src="../Public/image/logo3.png" alt="" height="37"></a>


             </div>


             <div class="row">


                 <div class="model-info pull-left">


                    <ul class="nav nav-pills">


                        <li>


                            <a href="/user/index/typelist?id=<?php echo $this->user['id']?>" class="avatar">


                                <img src="<?php echo $this->user['thumb']?>" onerror="this.src='/Public/images/rr.jpg'" height="32">


                            </a>


                        </li>


                        <li>


                            <a href="/user/index/typelist?id=<?php echo $this->user['id']?>" class="model-uploader-name"><?php echo $this->user['username']?></a>


                        </li>


                        <li class="dropdown-toggle"><h1 class="model-name"><?php echo $this->result['title'];?></h1>


                        </li>


                    </ul>


                </div>


                <div class="nav-title pull-right" id="urlname" data="<?php echo escape(ltrim($this->obj[0]['path'], '.'));?>">


                    <div class="collapse navbar-collapse">


                        <div class="toolbar">


                            <ul class="nav nav-pills nav-menu">


                                <li>


                                    <a href="javascript:void(0);" class="i-vote" style="height:32px;padding-left:36px;"><?php echo $this->result['like'];?></a>


                                </li>


                                <li style="margin:0 10px;height:1px;"></li>


                                <li>


                                    <a href="javascript:void(0);" class="toolbar-comment"  title="评论">


                                        <i class="i-comment"></i>


                                    </a>


                                </li>     


                                <li>


                                    <a href="javascript:void(0);" class="toolbar-star" title="收藏">


                                        <i class="i-star <?php if($this->collect){echo 'active';}?>"></i>


                                    </a>


                                </li>
								

                                <li class="dropdown-toggle iframe_in">


                                    <a href="#" class="toolbar-embed" title="在自己的网站中嵌入此模型">


                                        <i class="i-embed"></i>


                                    </a>


                                    <div class="embed-code-wrapper dropdown-menu" >


                                        <div class="pull-left">


                                            <input id="embed-code" class="embed-code" type="text" value='<iframe src="http://www.3dying.com/list/index/detail/?id=<?php echo $this->result['id'];?>" allowfullscreen="true" width="600" height="450"></iframe>'>


                                        </div>


                                    </div>


                                </li>
								<?php if ($_SESSION['user']){?>

                                <li class="dropdown-toggle">


                                    <a href="#" class="toolbar-download" data-toggle="dropdown" title="下载">


                                        <i class="i-download"></i>


                                    </a>


                                    <div class="download-list-wrapper dropdown-menu" style="width: 190px;max-height: 300px;overflow-y: scroll;">


                                        <ul class="download-list nav nav-pills nav-stacked">


                                        <?php foreach ($this->atta as $value) {?>


                                            <li><a target="_blank" href="/down?id=<?php echo $value['id'];?>" data-download-type="1" title="<?php echo $value['name'];?>" class="download-type"><?php echo mb_substr($value['name'], 0, 16,'utf8');?></a></li>


                                        <?php }?>


                                        </ul>


                                    </div>


                                </li>
								<?php }?>

                            </ul>  


                        </div> 


                    </div> 


                </div> 


            </div>


        </div>


    </div>


    <div id="main">





    <div style="position:relative;top:0;left:0;color: #777777;" id="cvdiv">


        <canvas id="cv"  style="position: absolute; left: 0px; top: 0px; z-index: 0;" ></canvas>


    </div>


    <div style="text-align: center;margin-top:-70px;" id="real_menu">


        <div class="btn-group dropup" id="menu1" >


        


        <div class="btn-group">


          <button id="btnGroupDrop1" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">


            文件


            <span class="caret"></span>


          </button>


          <ul class="dropdown-menu" role="menu" aria-labelledby="btnGroupDrop1">


            <?php foreach ($this->obj as $value) {?>
<?php //echo escape(ltrim($value['path'],'.'));?>

              <li><a model="<?php echo substr($value['path'],1);?>" href="javascript:void(0);" class="models"><?php echo $value['name'];?></a></li>


            <?php }?>


          </ul>


        </div>


        <div class="btn-group">


          <button id="btnGroupDrop1" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">


            模式


            <span class="caret"></span>


          </button>


          <ul class="dropdown-menu" role="menu" aria-labelledby="btnGroupDrop1">


             <li><a href="javascript:void(0);" class="changemodel" ref='0' >点状分布</a></li>


              <li><a href="javascript:void(0);" class="changemodel" ref='1' >线框分布</a></li>


              <li><a href="javascript:void(0);" class="changemodel" ref='2' >平面分布</a></li>


              <li><a href="javascript:void(0);" class="changemodel" ref='3' >光滑分布</a></li>


              <li><a href="javascript:void(0);" class="changemodel" ref='4' >背景分布</a></li>


          </ul>


        </div>


        


        


        


        </div>


        


    </div>


    <script>


$(function(){


	 $(".iframe_in").hover(function() {


		 $(".embed-code-wrapper").show();


		}, function() {


			$(".embed-code-wrapper").hide();


	});


    $("#real_menu").hover(function() {


		$(this).css('margin-top','-95px');


	


		}, function() {


			$(this).delay(11500).css('margin-top','-70px');


		});


})


</script>


    <!-- Split button -->





    <script type="text/javascript" src="../Public/js/jsc3d.js"></script>


    <script type="text/javascript" src="../Public/js/jsc3d.webgl.js"></script>


    <script type="text/javascript" src="../Public/js/jsc3d.touch.js"></script>


   





    </div>


    <div id="comment-wrapper" class="panel panel-default" style="height: 550px; display: none;">


        <div id="comment-count" class="panel-heading"><strong>共<?php echo $this->comment[0];?>条评论</strong></div>


        <div class="panel-body row">


            <div id="comment-box" class="col-lg-12">


                <textarea name="content" id="comment-input" cols="30" rows="5"></textarea>


                <input type="button" id="submit-content" value="发表评论" class="btn btn-info btn-block">


            </div>


            <div id="comments" class="col-lg-12" style="max-height: 300px;">


                


                <?php foreach($this->comment[1] as $value) {?>


                <div class="comment">


                    <div class="comment-info row">


                        <div class="comment-auther col-lg-4">


                            <a href="javascript:void(0);"><?php echo $value['username'];?></a>


                        </div>


                        <div class="comment-time col-lg-8"><?php echo date('Y-m-d H:i');?></div>


                    </div>


                    <div class="comment-cnt"><?php echo $value['content'];?></div>


                </div>


                <?php } ?>


            </div>


        </div>


    </div>





     <script type="text/javascript">


    window.onload=function()//用window的onload事件，窗体加载完毕的时候


    {





       //do something


        $(function(){


        	


        	$('#cvdiv').css("height", $(window).get(0).innerHeight);


            $('#cv').attr("width", $(window).get(0).innerWidth);


            $('#cv').attr("height", $(window).get(0).innerHeight);


            var canvas = document.getElementById('cv');


            var viewer = new JSC3D.Viewer(canvas);


            viewer.setParameter('SceneUrl', unescape($('#urlname').attr('data')));


            viewer.setParameter('InitRotationX', 20);


            viewer.setParameter('InitRotationY', 20);


            viewer.setParameter('InitRotationZ', 0);


//           viewer.setParameter('ModelColor', '#CAA618');


            viewer.setParameter('BackgroundColor1', '#E5D7BA');


            viewer.setParameter('BackgroundColor2', '#383840');


            viewer.setParameter('RenderMode', 'textureflat');


            viewer.setParameter('MipMapping', 'on');


          //  viewer.setParameter('Renderer', 'webgl');


            viewer.init();


            viewer.update();





            


            $(".models").click(function(){


                var models = $(this).attr('model');


                viewer.replaceSceneFromUrl(unescape(models));


                $("#files").html($(this).html()+'<span class="caret"></span>');


                viewer.update();


            });


            $(".changemodel").click(function(){


                viewer.setParameter('Renderer', 'webgl');


                modes = parseInt($(this).attr('ref'));


                name  = $(this).html();


                switch(modes) {


                case 0:


                    viewer.setRenderMode('point');


                    break;


                case 1:


                    viewer.setParameter('Renderer', '');


                    viewer.setRenderMode('wireframe');


                    break;


                case 2:


                    viewer.setRenderMode('flat');


                    break;


                case 3:


                    viewer.setRenderMode('smooth');


                    break;


                case 4:


                    viewer.setRenderMode('texturesmooth');


                    var scene = viewer.getScene();


                    if(scene) {


                        var objects = scene.getChildren();


                        for(var i=0; i<objects.length; i++)


                            objects[i].isEnvironmentCast = true;


                    }


                    break;


                default:


                    viewer.setRenderMode('flat');


                    break;


                }


                $("#model_form").html(name+'<span class="caret"></span>');


                viewer.update();


            });


        })


    }


    </script>


<script>


var view = $("#viewer-frame");


function resizeCanvas() {


    view.css("width", $(window).get(0).innerWidth);


    view.css("height", $(window).get(0).innerHeight);


}


resizeCanvas();


$(window).resize(resizeCanvas);


var like = <?php echo $this->result['like'];?>;


var user_id = <?php echo isset($_SESSION['user']['id']) ? $_SESSION['user']['id'] : 0;?>;


var username = '<?php echo isset($_SESSION['user']['id']) ? $_SESSION['user']['username'] : "";?>';


var times = '<?php echo date('Y-m-d H:i');?>';


$(function(){


    var id = <?php echo $this->result['id'];?>;


    $(".i-vote").click(function(){


        $.get('/list/index/vote',{id:id},function(data){


            if (data==1) {


                $(".i-vote").html(like+1);


            }


        });


    });


    $(".toolbar-comment").click(function(){


        if ($("#comment-wrapper").is(":visible")) {


            $("#comment-wrapper").hide();


        } else {


            $("#comment-wrapper").show();


        }


        


    });


    $("#submit-content").click(function(){


        if (user_id <=0) {


            alert('请您先登录');


            return false;


        }


        if ($.trim($("#comment-input").val()) == '') {


           alert('请填写内容');


           return false;


        }


        $.get('/list/index/comment',{id:id,content:$("#comment-input").val()},function(data){


            


            if (data==1) {


                $("#comments").prepend('<div class="comment"><div class="comment-info row"><div class="comment-auther col-lg-4"><a href="javascript:void(0);">'+username+'</a></div><div class="comment-time col-lg-8">'+times+'</div></div><div class="comment-cnt">'+$("#comment-input").val()+'</div></div>');


            }else if(data==0){


                alert('请您先登录');


            } else if(data==2) {


                alert('内容不能为空');


            } else{


                alert("评论错误");


            }


        });


    });


    $(".i-star").click(function(){


        if (user_id <=0) {


            alert('请您先登录');


            return false;


        }


        $.get('/list/index/collect',{id:id},function(data){


            if (data==1) {


                if ($(".i-star").hasClass('active')) {


                    $(".i-star").removeClass('active');


                } else {


                    $(".i-star").addClass('active');


                }


            }else{


                alert('请您先登录');


            }


        });


    });


});





document.oncontextmenu=function(event) {


    if (document.all) 


        window.event.returnValue = false;// for IE


    else 


        event.preventDefault();


}


 


</script>


</body></html>


