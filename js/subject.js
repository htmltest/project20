(function($) {

    $(document).ready(function() {

        // переключение вкладок
        $('.subject-menu a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.subject-menu li').index(curLi);
                $('.subject-menu li.active').removeClass('active');
                curLi.addClass('active');
                $('.subject-content.active').removeClass('active');
                $('.subject-content').eq(curIndex).addClass('active');
            }
            return false;
        });

        // стилизация прокрутки
        $('.subject-list-inner').jScrollPane();

        // выбор животного
        $('body').on('click', '.subject-list-col-1 a', function() {
            var curRow = $(this).parent().parent();
            if (curRow.hasClass('active')) {
                curRow.removeClass('active');
            } else {
                $('.subject-list-row.active').removeClass('active');
                curRow.addClass('active');
            }
            return false;
        });

        // сортировка
        $('.subject-head a').click(function() {
            var curRows = $('.subject-list-row');
            var curCol = $('.subject-head').index($(this).parent());
            var isDigital = $(this).hasClass('digital');
            curRows.sort(function(a, b) {
                if (isDigital) {
                    var compA = Number($(a).find('.subject-list-col').eq(curCol).text().toUpperCase().replace(',', '.'));
                    var compB = Number($(b).find('.subject-list-col').eq(curCol).text().toUpperCase().replace(',', '.'));
                } else {
                    var compA = $(a).find('.subject-list-col').eq(curCol).text().toUpperCase();
                    var compB = $(b).find('.subject-list-col').eq(curCol).text().toUpperCase();
                }
                return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
            });
            $('.subject-list-content').html(curRows);
            return false;
        });

    });

})(jQuery);