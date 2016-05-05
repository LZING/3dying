/**
 * Created by leiting on 14/8/27.
 */
(function (arg) {

    var self = arg;

    self.umxoutline = function(){

        this.outLineRender = null;
    };

    var UMXOT = self.umxoutline.prototype;

    UMXOT.createOutline = function () {
        //创建小画板容器div
        var setPM = function (e) {
            if(e){
                e.style.padding = "0px";
                e.style.margin = "0px";
            }
        };

        var toggleorender = function () {
            var target = event.target;
            $(target).parent().next().slideToggle();
        };
        var orendercontanier = document.createElement("div");
        orendercontanier.style.position = "absolute";
        setPM(orendercontanier);
        orendercontanier.style.bottom = "0px";
        orendercontanier.style.left = "20px";

        //创建小画板的开关div
        var orendertool = document.createElement("div");
        setPM(orendertool);
        orendertool.style.height = "30px";
        orendertool.style.width = "300px";

        //创建开关的按钮
        var otimg = document.createElement("img");
        otimg.src = "images/mxView/outline_white.png";
        otimg.style.width = "24px";
        otimg.style.height = "24px";
        otimg.style.cursor = "pointer";
        otimg.style.float = "left";
        otimg.style.marginLeft = "10px";
        otimg.style.marginTop = "5px";
        orendertool.appendChild(otimg);

        //创建小画板div
        var orender = document.createElement("div");
        setPM(orender);
        orender.style.height = "150px";
        orender.style.width = "300px";
        orender.style.background = "#666";

        orendercontanier.appendChild(orendertool);
        orendercontanier.appendChild(orender);
        document.body.appendChild(orendercontanier);
        otimg.addEventListener("click",toggleorender);
        this.outLineRender = orender;

        var eventPool = getumxEventInstance();
        //给小画板增加更改主题的监听事件
        eventPool.addListener("changeoutlinetheme", this.changeTheme);

        return orender;
    };

    UMXOT.changeTheme = function () {
        var args = arguments;
        if(args[1]){
            if(args[1] == "black"){

                $(this.outLineRender).prev().children()[0].src = "images/mxView/outline_white.png";

            }
            if(args[1] == "white"){

                $(this.outLineRender).prev().children()[0].src = "images/mxView/outline_black.png";

            }
        }
    }

})(window);