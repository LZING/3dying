<script>
    $(document).on('submit', '#loginDialog form', function () {
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            type: 'POST',
            dataType: 'json',
            success: function (obj) {
                if (obj.code != 0) {
                    isLogin = 0;
                    alert(obj.msg);
                } else {
                    isLogin = 1;
                    $('#loginDialog').modal('close');

                    var h ='<a href="/user/index/typelist" class="am-btn am-btn-success am-topbar-btn am-btn-sm">'+obj.name+'</a>';
                    $('.user-info').html(h);
                }
            },
            error: function (XHR) {
                isLogin = 0;
                alert(XHR.responseText);
            }
        });
        return false;
    });
</script>