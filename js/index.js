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
                // стилизация селектов
                if ($('.form').eq(curIndex).find('select').length > 0) {
                    $('.form').eq(curIndex).find('select').chosen({disable_search_threshold:20});
                }
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