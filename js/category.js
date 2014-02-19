(function($) {

    $(document).ready(function() {

        // переключение вкладок
        $('.category-menu a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.category-menu li').index(curLi);
                $('.category-menu li.active').removeClass('active');
                curLi.addClass('active');
                $('.category-content.active').removeClass('active');
                $('.category-content').eq(curIndex).addClass('active');
                $('.category-btns').each(function() {
                    $(this).find('.category-add-link.active').removeClass('active');
                    $(this).find('.category-add-link').eq(curIndex).addClass('active');
                });
            }
            return false;
        });

        // сортировка
        $('.category-content table th a').click(function() {
            var curTable = $(this).parents().filter('table');
            var curRows = curTable.find('tbody tr');
            var curCol = curTable.find('thead th').index($(this).parent());
            var isDigital = $(this).hasClass('digital');
            curTable.find('th span').removeClass('active')
            $(this).parent().find('span').toggleClass('up').addClass('active');
            var isUp = $(this).parent().find('span').hasClass('up');
            curRows.sort(function(a, b) {
                if (isDigital) {
                    var compA = Number($(a).find('td').eq(curCol).text().toUpperCase().replace(',', '.'));
                    var compB = Number($(b).find('td').eq(curCol).text().toUpperCase().replace(',', '.'));
                } else {
                    var compA = $(a).find('td').eq(curCol).text().toUpperCase();
                    var compB = $(b).find('td').eq(curCol).text().toUpperCase();
                }
                if (isUp) {
                    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
                } else {
                    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                }
            });
            curTable.find('tbody').html(curRows);
            return false;
        });

        // импорт
        $('.category-import-link').click(function() {
            windowOpen($('.window-import').html());

            $('.window .fileupload').fileupload({
                url: 'js/jquery.fileupload/server/php/',
                acceptFileTypes: /(\.|\/)(xls|dba)$/i,
                autoUpload: true
            });

            return false;
        });

    });

    // открытие окна
    function windowOpen(contentWindow) {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        var curScrollTop = $(window).scrollTop();

        $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container">' + contentWindow + '<a href="#" class="window-close"></a></div></div>')
        recalcWindow();

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function() {
            windowClose();
            return false;
        });

        $('body').bind('keypress keydown', keyDownBody);
    }

    // функция обновления позиции окна
    function recalcWindow() {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        if ($('.window-container').width() < windowWidth) {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        } else {
            $('.window-container').css({'left': 0});
        }
        if ($('.window-container').height() < windowHeight) {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        } else {
            $('.window-container').css({'top': 20});
            $('.window-overlay').css({'min-height': $('.window-container').height() + 40});
        }
    }

    // обработка Esc после открытия окна
    function keyDownBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    // закрытие окна
    function windowClose() {
        $('body').unbind('keypress keydown', keyDownBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'auto'});
        var curScrollTop = $('.wrapper').data('scrollTop');
        $(window).scrollTop(curScrollTop);
    }

})(jQuery);