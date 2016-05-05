$(document).ready(function() {
    $("#edit_search").bind("focus", function() {
        $(this).val() == this.defaultValue && $(this).val(""), $(this).css("color", "black")
    }), $("#edit_search").bind("blur", function() {
        "" == $(this).val() && $(this).val(this.defaultValue), $(this).css("color", "rgb(174, 174, 174)")
    }), $("#edit_search").onkeyup = function(a) {
        var b = a || window.event;
        13 == b.keyCode && $("#button_search").trigger("click")
    }, $("#button_search").bind("click", function() {
        var a = $("#edit_search").val();
        var type = $("#category").val();
        window.location = "/list/?q=" + a + '&type=' + type;
    }), $("#panel_login").on("mouseout", function() {
        var a = this;
        $(document).on("click", function() {
            $(a).hide(), $("#panel_login_border").css("borderColor", "white"), $(".login_mask").hide()
        })
    }), $("#panel_login").on("mouseover", function() {
        $(document).off("click")
    }), $("#panel_login_embed").on("mouseout", function() {
        var a = this;
        $(document).on("click", function() {
            $(a).hide(), $("#label_login_embed").css("borderColor", "white"), $(".login_mask").hide()
        })
    }), $("#panel_login_embed").on("mouseover", function() {
        $(document).off("click")
    }), $("#panel_account").on("mouseout", function() {
        var a = this;
        $(document).on("click", function() {
            $(a).hide(), $("#panel_account_border").css("borderColor", "white")
        })
    }), $("#panel_account").on("mouseover", function() {
        $(document).off("click")
    }), $(".label_login").bind("click", function() {
        $("#label_login_embed").css("border-color", "white"), $("#panel_login_embed").hide(), $("#panel_mask_login_embed").hide();
        var a = document.getElementById("mask_frame") || document.createElement("iframe");
        if ($(a).attr("id", "mask_frame"), $(a).attr("frameborder", "0"), $(a).attr("scrolling", "no"), $(a).attr("class", "login_mask"), $("#panel_login_border").append(a), $("#panel_login").is(":visible"))
            $("#panel_login_border").css("border-color", "white"), $("#panel_login").hide(), $("#panel_top_right_mask_login").hide(), $(".login_error").hide(), $("#mask_frame").hide();
        else {
            $("#panel_login_border").css({"border-color": "rgb(183, 183, 183)","border-width": "1px","border-style": "solid"}), $("#panel_login").show(), $("#panel_top_right_mask_login").show();
            var b = $("#panel_login").position().top, c = $("#panel_login").position().left, d = $("#panel_login").width(), e = $("#panel_login").height() + 2;
            $("#mask_frame").css({width: d,height: e,top: b,left: c}).show()
        }
        return !1
    }), $(".label_account").bind("click", function() {
        return $("#panel_account").is(":visible") ? ($("#panel_account_border").css("border-color", "white"), $("#panel_account").hide(), $("#panel_top_right_mask_account").hide()) : ($("#panel_account_border").css({"border-color": "rgb(183, 183, 183)","border-width": "1px","border-style": "solid"}), $("#panel_account").show(), $("#panel_top_right_mask_account").show()), !1
    })
});
