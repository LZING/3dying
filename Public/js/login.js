function login(data) {
    if (data.username == '') {
        $(".login_error").html('请填写用户名').show();
        return false;
    }
    if (data.password == '') {
        $(".login_error").html('密码不能为空').show();
        return false;
    }
    $.ajax({type: "post",url: "/user/login",dataType: "text",data: data}).success(function(data) {
        data = eval('('+data+')');
        if (data.code == 0) {
            location.href = '/';
        } else {
            $(".login_error").html(data.msg).show();
        }
    })
}
$(document).ready(function() {
    $(".edit_login").bind("focus", function() {
        $(this).val() == this.defaultValue && $(this).val(""), $(this).css("color", "black")
    }), $(".edit_login").bind("blur", function() {
        "" == $(this).val() && $(this).val(this.defaultValue), $(this).css("color", "rgb(217, 217, 217)")
    }), $(".edit_password_mask").bind("click", function() {
        $(this).hide(), $(".edit_password").trigger("focus")
    }), $(".edit_password").bind("focus", function() {
        $(".edit_password_mask").hide(), $(this).on("keydown", function(a) {
            if ("13" == a.which) {
                var b = {name: $(".edit_username").val(),password: $(".edit_password").val()};
                login(b)
            }
        })
    }), $(".edit_password").bind("blur", function() {
        "" == $(this).val() && $(".edit_password_mask").show()
    }), $(".button_forget_password").bind("click", function() {
        window.location = "retrieve_password.html"
    }), $(".button_register_hint").bind("click", function() {
        window.location = "register.html"
    }), $(".button_login").bind("click", function() {
        var a = {username: $(".edit_username").val(),password: $(".edit_password").val(),expires: $(".checkbox_keep_login").attr("checked") ? 30 : 0};
        login(a)
    }), $(".weibo_login,.oauth_weibo").bind("click", function() {
        $.ajax({type: "get",url: "/request/oauthLogin",dataType: "text",data: {loginType: "1"},success: function(a) {
                window.location = a
            }})
    }), $(".qq_login,.oauth_qq").bind("click", function() {
        $.ajax({type: "get",url: "/request/oauthLogin",dataType: "text",data: {loginType: "2"},success: function(a) {
                window.location = a
            }})
    })
});