function toggleBar(target) {
    $('.apps-range-bar div').not(target).css('visibility', 'hidden');
    if ($(target).css('visibility')=='hidden') {
        $(target).css('visibility', 'visible');
        $('#JsCloseBtn').show();
    } else {
        $(target).css('visibility', 'hidden');
        $('#JsCloseBtn').hide();
    }
}
$(function () {
    $(document).on('click', '#JsIndexLogin', function () {
        $.popup('.popup-index');
    });
    $(document).on('click', '.popup-index', function (e) {
        if (e.target && $(e.target).hasClass('popup-index')) {
            $.closeModal('.popup-index');
        }
    });
})
