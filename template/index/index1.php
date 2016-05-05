<?php $this->load('Public/header.php');?>
    <!--header头部结束-->
    <div class="clear"></div>
    <div class="banner"><!--banner开始-->
        <div class="sequence-theme">
            <div id="sequence">
                <img class="sequence-prev" src="/Public/images/bt-prev.png" alt="Previous Frame" />
                <img class="sequence-next" src="/Public/images/bt-next.png" alt="Next Frame" />
                <ul class="sequence-canvas">
                    <li class="animate-in">
                        <h2 class="title">3D鹰-专业3D模型上传，下载,分享</h2>
                        <h3 class="subtitle">3D YING, professional model of 3D upload and download share network</h3>
                        <img class="model" src="/Public/images/model1.png" alt="Model 1" />
                    </li>
                    <li>
                        <h2 class="title">3D起义-颠覆3D模型界的大改革</h2>
                        <h3 class="subtitle">3DYING, subversion uprising, creative inspiration</h3>
                        <img class="model" src="/Public/images/model2.png" alt="Model 2" />
                    </li>
                    <li>
                        <h2 class="title">3D鹰，创造灵感，激发无限潜能</h2>
                        <h3 class="subtitle">3DYING,Create inspiration, inspire their potential</h3>
                        <img class="model" src="/Public/images/model3.png" alt="Model 3" />
                    </li>
                </ul>
                <ul class="sequence-pagination">
                    <li><img src="/Public/images/tn-model1.png" alt="Model 1" /></li>
                    <li><img src="/Public/images/tn-model2.png" alt="Model 2" /></li>
                    <li><img src="/Public/images/tn-model3.png" alt="Model 3" /></li>
                </ul>

            </div>
        </div>
    </div><!--banner结束-->
<div class="clear"></div>
<div class="fenlei"><!--fenlei开始-->
    <div class="fenleis"><!--fenleis开始-->
        <div class="fenleis-one">
            <div class="tp"><a href="/list?type=1"><img alt="个性创意3D模型" src="/Public/images/1.gif" /></a></div>
            <div class="tp"><a href="/list?type=9"><img alt="艺术3D模型" src="/Public/images/2.gif" /></a></div>
            <div class="tp"><a href="/list?type=13"><img alt="设计3D模型" src="/Public/images/3.gif" /></a></div>
        </div>
        <div class="clear"></div>
        <div class="fenlei-one">
            <div class="tp"><a href="/list?type=8"><img alt="3D工具模型" src="/Public/images/4.gif" /></a></div>
            <div class="tp"><a href="/list?type=11"><img alt="3D玩具模型" src="/Public/images/5.gif" /></a></div>
            <div class="tp"><a href="/list?type=12"><img alt="3D建筑模型" src="/Public/images/6.gif" /></a></div>
        </div>
    </div><!--fenleis结束-->
    <div class="clear"></div>
    <div class="gg"><div style="margin:0 auto; width:1080px; height:24px;"><img src="/Public/images/gg00.jpg" /></div></div>
</div><!--fenlei结束-->
<div class="content"><!--content内容板块开始-->
<div class="content-one"><!--content-one开始-->
    <div class="one"><!--one第一行开始-->
        <div class="pic"><img align="middle" src="/Public/images/ying.jpg" /></div>
        <div class="special"><!--个性图片开始-->
            <div class="special-pic">
                <div style="float:left;"><a title="个性创意3D模型" href="/list?type=1"><img src="/Public/images/gx1.jpg" /></a></div>
                <div style="float:left;"><a title="艺术化3D模型" href="/list?type=9"><img src="/Public/images/gx2.jpg" /></a></div>
                <div style="float:left;"><a title="设计类3D模型" href="/list?type=13"><img src="/Public/images/gx3.jpg" /></a></div>
                <div style="float:left;"><a title="3D工具模型" href="/list?type=8"><img src="/Public/images/gx4.jpg" /></a></div>
                <div style="float:left;"><a title="3D建筑模型" href="/list?type=12"><img src="/Public/images/gx5.jpg" /></a></div>
            </div>
            <div class="clear"></div>
            <div class="titles"><span class="ying">#&nbsp;3D鹰&nbsp;#</span><span class="read">做一个用心的记录者</span>&nbsp;
                <span class="heart">记录每一个设计者成功的瞬间 随年华老去，我们开始慢慢接纳遗憾和不完美。@</span></div>
        </div><!--个性图片结束-->
        <div class="clear"></div>
        <div class="titless"><img src="/Public/images/cy.jpg" /></div>
        <div class="title-one">
            <div class="logo1"><img alt="公司logo" src="/Public/images/logo1.jpg" /></div>
            <div class="ad">好东西，齐分享！-3D鹰</div>
            <div class="wx"><a href=""><img alt="公司微信" src="/Public/images/wx.jpg" /></a></div>
        </div>
        <div class="clear"></div>
        <div class="chanpin"><!--chanpin开始-->
            <?php foreach($this->chuangyi as $key => $value) { ?>
            <div class="cp-one"><!--cp-one开始-->
                <div class="cp-pic"><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><img src="<?php echo $value['thumb'];?>" /></a></div>
                <div class="clear"></div>
                <div class="cp-title">
                    <h1><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><?php echo mb_substr($value['title'],0,10,'utf-8');?></a></h1>
                    <p><?php echo mb_substr($value['intro'],0,40,'utf-8');?></p>
                </div>
            </div><!--cp-one结束-->
            <?php } ?>
        </div><!--chanpin结束-->
        <div class="clear"></div>
        <div class="more">
            <h2><a href="/list/?type=1">查看更多</a></h2>
            <p>点击可以查看更多模型</p>
        </div>
        <div class="clear"></div>
        <div class="gg2"><img src="/Public/images/art.jpg" /></div>
        <div class="gg3">
            <div class="gg3-lf"><img src="/Public/images/gg13.jpg" /><p>创意是一种组合!是一种错觉！<br />是传统的叛逆,是打破常规的哲学<br />爱创意，纯真自我！</p></div>
            <div class="gg3-rt"><img src="/Public/images/gg33.jpg" /></div>
        </div>
        <div class="clear"></div>
        <div class="title-two"><img src="/Public/images/title2.jpg" /></div>
        <div class="chanpin"><!--chanpin开始-->
            <?php foreach($this->yishu as $key => $value) { ?>
                <div class="cp-one"><!--cp-one开始-->
                    <div class="cp-pic"><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><img src="<?php echo $value['thumb'];?>" /></a></div>
                    <div class="clear"></div>
                    <div class="cp-title">
                        <h1><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><?php echo mb_substr($value['title'],0,10,'utf-8');?></a></h1>
                        <p><?php echo mb_substr($value['intro'],0,40,'utf-8');?></p>
                    </div>
                </div><!--cp-one结束-->
            <?php } ?>
        </div><!--chanpin结束-->
        <div class="clear"></div>
        <div class="more">
            <h2><a href="/list/?type=9">查看更多</a></h2>
            <p>点击可以查看更多模型</p>
        </div>
        <div class="clear"></div>
        <div class="gg2"><img src="/Public/images/art.jpg" /></div>
        <div class="gg2"><!--轮换banner开始-->
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="980" height="425"><param name="movie" value="/Public/swf/xixi.swf?images=images/gg8.jpg|images/gg88.jpg|images/gg8.jpg&amp;titles=放飞心灵 <br />3DYING|给灵魂插上翅膀 <br />3DYING|简约高端模型<br />3DYING"/><param name="quality" value="high"><embed src="/Public/swf/xixi.swf?images=../Public/images/gg8.jpg|../Public/images/gg88.jpg|../Public/images/gg888.jpg&amp;titles=给灵魂插上翅膀 <br />3DYING|寻找自己的灵感 <br />3DYING|敢于付诸实践 <br />3DYING" width="980" height="425" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed><param name="wmode" value="Opaque"></object>

        </div><!--轮换banner结束-->
        <div class="titless"><img src="/Public/images/title3.jpg" /></div>
        <div class="gg2"><img src="/Public/images/design.jpg"></div>
        <div class="chanpin"><!--chanpin开始-->
            <?php foreach($this->sheji as $key => $value) { ?>
                <div class="cp-one"><!--cp-one开始-->
                    <div class="cp-pic"><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><img src="<?php echo $value['thumb'];?>" /></a></div>
                    <div class="clear"></div>
                    <div class="cp-title">
                        <h1><a href="/list/index/detail/?id=<?php echo $value['id'];?>"><?php echo mb_substr($value['title'],0,10,'utf-8');?></a></h1>
                        <p><?php echo mb_substr($value['intro'],0,40,'utf-8');?></p>
                    </div>
                </div><!--cp-one结束-->
            <?php } ?>
        </div><!--chanpin结束-->
        <div class="clear"></div>
        <div class="more">
            <h2><a href="/list/?type=13">查看更多</a></h2>
            <p>点击可以查看更多模型</p>
        </div>
    </div><!--one第一行结束-->
</div><!--content-one结束-->
<div class="clear"></div>
<div class="content-one"><!--content-one第三行开始-->
    <div class="one" style="border-top:2px solid #b68f4a;"><!--one开始-->
        <div class="words"><!--words开始-->
            <ul>
                <li style="font-size:20px; color:#3f3e3c; font-weight:bold; margin-right:30px;">3D鹰的信念坚持</li>
                <li>海纳百川故能成其大</li>
                <li>滴水入海故能成就永恒</li>
                <li>客户的满意是我们永恒不变的追求</li>
                <li>重质量树形象以顾客至上</li>
                <li>抓素质严管理求持续发展</li>
                <li>追求卓越缔造完美</li>
                <li>成功来自创新发展来自合作</li>
                <li>乐业敬业专业</li>
                <li>与时俱进超越自我</li>
                <li>事无大小追求完美</li>
                <li>3D鹰的信念坚持做最完美的自己</li>
                <li>坚持才能成功胜利</li>
            </ul>
        </div><!--words结束-->
        <div class="clear"></div>
        <div class="gg3">
            <div class="gg3-lf"><img src="/Public/images/art1.jpg" /><p>与众不同的个性自我<br />随心境演绎别样人生<br />爱艺术，个性自主</p></div>
            <div class="gg3-rt"><img src="/Public/images/gg6.jpg" /></div>
        </div>
        <div class="clear"></div>
        <div class="gg2" style="text-align:center;"><img align="middle" src="/Public/images/gg9.jpg" /></div>
        <div class="gg5">
            <P class="dl" style="font-size:25px;">登录3D鹰-3DYING</P>
            <p>最新最酷的3D设计师社交网站，提供3D模型上传、3D模型在线展示、3D模型外链分享,游戏美术,3d设计师交流论坛,3d建模师,3d模型在线展示,
                支持多种流行格式的3D模型直接上传，并可在线展示，以及插入到任何网页中。</p>
        </div>
    </div><!--one结束-->
</div><!--content-one第三行结束-->
</div><!--content内容板块结束-->
<div class="clear"></div>
<?php $this->load('Public/footer.php');?>