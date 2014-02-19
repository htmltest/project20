(function($) {

    $(document).ready(function() {
        $('section, #map').height($(window).height() - $('header').height() - $('footer').height() + 4);

        // переключение вкладок
        $('.data-menu a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.data-menu li').index(curLi);
                $('.data-menu li.active').removeClass('active');
                curLi.addClass('active');
                $('.data-content.active').removeClass('active');
                $('.data-content').eq(curIndex).addClass('active');
            }
            return false;
        });

        // информация
        $('.data-detail-link a').click(function() {
            var curBlock = $(this).parent().parent();
            curBlock.find('.data-detail').toggle();
            var curText = $(this).html();
            $(this).html($(this).attr('rel'));
            $(this).attr('rel', curText);
            if (curBlock.find('.data-detail:visible').length > 0) {
                curBlock.find('.data-detail-inner').css({'max-height': $(window).height() - curBlock.find('.data-detail-inner').offset().top - $('footer').height() - 40});
                curBlock.find('.data-detail-inner').jScrollPane();;
            };
            return false;
        });

        $('.data-select-value').click(function() {
            var curSelect = $(this).parent();
            if (curSelect.hasClass('data-select-open')) {
                curSelect.removeClass('data-select-open');
            } else {
                $('.data-select-open').removeClass('data-select-open');
                curSelect.addClass('data-select-open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.data-select').length == 0) {
                $('.data-select-open').removeClass('data-select-open');
            }
        });

        $('.data-select ul li a').click(function() {
            var curSelect = $(this).parent().parent().parent();
            curSelect.find('.data-select-value em span').html($(this).html());
            curSelect.removeClass('data-select-open');
            curSelect.find('li.active').removeClass('active');
            $(this).parent().addClass('active');
            return false;
        });

        $('.data-region-favourite a').click(function() {
            var curBlock = $(this).parents().filter('.data-content');
            if (curBlock.find('.data-favourite').length == 0) {
                curBlock.append('<div class="data-favourite"></div>');
            }
            curBlock.find('.data-favourite').append('<div class="data-favourite-item"><a href="#">' + curBlock.find('.data-select-value').eq(0).find('em').html() + '</a> — ' + curBlock.find('.data-select-value').eq(1).find('em').html() + ' / ' + curBlock.find('.data-select-value').eq(2).find('em').html() + ' / ' + curBlock.find('.data-select-value').eq(3).find('em').html() + 'р-н</div>');
            return false;
        });

        // редактирование легенды
        $('.legend-edit-link a').click(function() {
            $('.legend-edit').show();
            return false;
        });

        $('.legend-edit-close').click(function() {
            $('.legend-edit').hide();
            return false;
        });

        $('.legend-opacity-value input:checked').parent().parent().addClass('active');
        $('.legend-opacity-value').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.legend-opacity-value input[name="' + curName + '"]').parent().parent().removeClass('active');
            $(this).addClass('active');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.legend-slider-handle:not(.legend-slider-handle-fix)').draggable({
            axis: 'x',
            containment: 'parent',
            drag: function() {
                var curLeft = Number($(this).css('left').replace('px', ''));
                $(this).find('.legend-slider-handle-value').html(Math.round((curLeft / $('.legend-slider-line').width()) * Number($('.legend-slider-items input[name="maxCount"]').val())));
            },
            stop: function() {
                var curLeft = Number($(this).css('left').replace('px', ''));
                if (curLeft > $('.legend-slider-line').width()) {
                    curLeft = $('.legend-slider-line').width() - 1;
                    $(this).css({'left':curLeft});
                }
                $(this).find('.legend-slider-handle-value').html(Math.round((curLeft / $('.legend-slider-line').width()) * Number($('.legend-slider-items input[name="maxCount"]').val())));
                updateLegend();
            }
        });

        $('.legend-slider-handle-color').wColorPicker({
            mode: 'click',
            generateButton: false,
            dropperButton: true,
            onSelect: function(color) {
                this.$el.css('backgroundColor', color);
                updateLegend();
            }
        });

        $('body').on('click', '.legend-slider-handle-del', function() {
            $(this).parent().remove();
            updateLegend();
        });

        $('.legend-slider-line').mousemove(function(e) {
            var curLeft = e.pageX - $('.legend-slider-line').offset().left;
            $('.legend-slider-handle-tmp').css({'left': curLeft});
            $('.legend-slider-handle-tmp .legend-slider-handle-value').html(Math.round((curLeft / $('.legend-slider-line').width()) * Number($('.legend-slider-items input[name="maxCount"]').val())));
        });

        $('.legend-slider-line .legend-slider-handle-tmp').click(function() {
            $('.legend-slider-items').append($(this).parent().html());
            $('.legend-slider-items .legend-slider-handle-tmp .legend-slider-handle-add').remove();
            $('.legend-slider-items .legend-slider-handle-tmp').append('<div class="legend-slider-handle-color" style="background:#f0f"></div><div class="legend-slider-handle-del"></div>');
            $('.legend-slider-items .legend-slider-handle-tmp .legend-slider-handle-color').wColorPicker({
                mode: 'click',
                generateButton: false,
                dropperButton: true,
                onSelect: function(color) {
                    this.$el.css('backgroundColor', color);
                    updateLegend();
                }
            });
            window.setTimeout(function() {
                $('.legend-slider-items .legend-slider-handle:last .legend-slider-handle-color').click();
            }, 300);
            $('.legend-slider-items .legend-slider-handle-tmp').draggable({
                axis: 'x',
                containment: 'parent',
                drag: function() {
                    var curLeft = Number($(this).css('left').replace('px', ''));
                    $(this).find('.legend-slider-handle-value').html(Math.round((curLeft / $('.legend-slider-line').width()) * Number($('.legend-slider-items input[name="maxCount"]').val())));
                },
                stop: function() {
                    var curLeft = Number($(this).css('left').replace('px', ''));
                    if (curLeft > $('.legend-slider-line').width()) {
                        curLeft = $('.legend-slider-line').width() - 1;
                        $(this).css({'left':curLeft});
                    }
                    $(this).find('.legend-slider-handle-value').html(Math.round((curLeft / $('.legend-slider-line').width()) * Number($('.legend-slider-items input[name="maxCount"]').val())));
                    updateLegend();
                }
            });
            $('.legend-slider-items .legend-slider-handle-tmp').removeClass('legend-slider-handle-tmp');
            updateLegend();
        });

        function updateLegend() {
            var newHTML = '';
            var prevText = '0';
            var elements = $('.legend-slider-items .legend-slider-handle');
            elements.sort(function(a, b) {
                var compA = Number($(a).find('.legend-slider-handle-value').text());
                var compB = Number($(b).find('.legend-slider-handle-value').text());
                return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
            });
            for (var i = 0; i < elements.length; i++) {
                var curText = Number($(elements[i]).find('.legend-slider-handle-value').html()) - 1;
                if (i == elements.length - 1) {
                    curText = $(elements[i]).find('.legend-slider-handle-value').html();
                }
                if (newHTML == '') {
                    newHTML = '<div class="legend-list-item">' +
                                    '<div class="legend-list-item-color" style="background-color:' + $(elements[i]).find('.legend-slider-handle-color').css('background-color') + '"></div>' +
                                    '<div class="legend-list-item-name">не зарегистрировано</div>' +
                                '</div>' + newHTML;
                } else {
                    newHTML = '<div class="legend-list-item">' +
                                    '<div class="legend-list-item-color" style="background-color:' + $(elements[i]).find('.legend-slider-handle-color').css('background-color') + '"></div>' +
                                    '<div class="legend-list-item-name">' + prevText + ' — ' + curText + '</div>' +
                                '</div>' + newHTML;
                }
                prevText = $(elements[i]).find('.legend-slider-handle-value').html();
            }
            $('.legend-list').html(newHTML);
        }

    });

    $(window).bind('load resize', function() {
        $('section, #map').height($(window).height() - $('header').height() - $('footer').height() + 4);
    });

})(jQuery);