(function($) {

    $(document).ready(function() {

        // переключение вкладок
        $('.form-tabs a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.form-tabs li').index(curLi);
                $('.form-tabs li.active').removeClass('active');
                curLi.addClass('active');
                $('.form.active').removeClass('active');
                $('.form').eq(curIndex).addClass('active');
            }
            return false;
        });

        // checkbox
        $('.form-agreement span input:checked').parent().addClass('checked');
        $('.form-agreement div').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

    });

})(jQuery);