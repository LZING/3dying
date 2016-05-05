function setLogin() {
    $(document).ready(function() {
        $("#edit_main_login").bind("focus", function() {
            $(this).val() == this.defaultValue && $(this).val(""), $(this).css("color", "black")
        }), $("#edit_main_login").bind("blur", function() {
            "" == $(this).val() && $(this).val(this.defaultValue), $(this).css("color", "rgb(217, 217, 217)")
        }), $("#button_main_forget_password").bind("click", function() {
            window.location = "retrieve_password.html"
        }), $("#edit_main_password_mask").bind("click", function() {
            $(this).hide(), $("#edit_main_password").trigger("focus")
        }), $("#edit_main_password").bind("focus", function() {
            $("#edit_main_password_mask").hide()
        }), $("#edit_main_password").bind("blur", function() {
            "" == $(this).val() && $("#edit_main_password_mask").show()
        }), $("#button_main_register_hint").bind("click", function() {
            window.location = "register.html"
        }), $("#button_main_login").bind("click", function() {
            if ($("#edit_main_username").val() == '') {
                $(".main_login_error").html('请填写用户名').show();
                return false;
            }
            if ($("#edit_main_password").val() == '') {
                $(".main_login_error").html('密码不能为空').show();
                return false;
            }
            $.ajax({type: "post",url: "/user/login",dataType: "text",data: {username: $("#edit_main_username").val(),password: $("#edit_main_password").val(),expires: $("#checkbox_main_keep_login").attr("checked") ? 30 : 0},success: function(data) {
                data = eval('('+data+')');
                if (data.code == 0) {
                    location.href = '/';
                } else {
                    $(".main_login_error").html(data.msg).show();
                }
            }})
        })
    })
}
function checkInput() {
    if (!$("#agreement:checked").size() > 0)
        return !1;
    $(".label_error_info").text("");
    var a = $.trim($("#edit_register_username").val());
    if ("" == a)
        return $("#edit_register_username").focus(), $("#label_username_error").text("用户名不能为空"), !1;
    if (a.length < 4 || a.length > 20)
        return $("#edit_register_username").focus(), $("#label_username_error").text("用户名长度4-20位"), !1;
    var b = $("#edit_register_email").val();
    if ("" == b)
        return $("#edit_register_email").focus(), $("#label_email_error").text("邮箱不能为空"), !1;
    var c = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    if (!c.test(b))
        return $("#edit_register_email").focus(), $("#label_email_error").text("邮箱格式错误"), !1;
    var d = $("#edit_register_password").val();
    if ("" == d)
        return $("#edit_register_password").focus(), $("#label_password_error").text("密码不能为空"), !1;
    for (var e = 0; e < d.length; e++) {
        var f = d.charAt(e);
        if (!(f >= " " && "~" >= f))
            return $("#edit_register_password").focus(), $("#label_password_error").text("非字母,数字或符号"), !1
    }
    if (d.length < 6 || d.length > 20)
        return $("#edit_register_password").focus(), $("#label_password_error").text("密码长度4-20位"), !1;
    var g = $("#edit_register_password_again").val();
    if (d != g)
        return $("#edit_register_password_again").focus(), $("#label_password_again_error").text("密码不一致"), !1;
    //var h = $("#edit_register_captcha").val();
    //return "" == h ? ($("#edit_register_captcha").focus(), $("#label_captcha_error").text("验证码不能为空"), !1) : !0
    return true;
}
function register() {
    checkInput() && ($("#button_submit").unbind("click"), $.ajax({type: "post",url: "/user/register",dataType: "text",data: {username: $.trim($("#edit_register_username").val()),password: $("#edit_register_password").val(),email: $("#edit_register_email").val()},success: function(data) {
            data = eval('('+data+')'); 
            if ("0" == data.code) {
                location.href = '/';
            }else if ("3" == data.code) {
                $(".label_error_info").text(""), $("#edit_register_email").focus(), $("#label_email_error").text(data.msg);
            }else if ("4" == data.code) {
                $(".label_error_info").text(""), $("#edit_register_password").focus(), $("#label_password_error").text(data.msg);
            }else if ("5" == data.code) {
                $(".label_error_info").text(""), $("#edit_register_username").focus(), $("#label_username_error").text(data.msg);
            }
            $("#button_submit").bind("click", register)
        }}))
}
var captchaHelper = null;
$(document).ready(function() {
    $("#agreement:checked").on("click", function() {
        $("#button_submit").toggleClass("disable")
    }), setLogin(), $("#button_submit").bind("click", register)
});