$(document).ready(function() {
    //select styler
    $('.js-select').styler();
    
    //input mask
    $('.js-tel-input').inputmask({mask: "+7 (999) 999-99-99", showMaskOnHover: false});

    //fancybox
    $('[data-fancybox]').fancybox({
        autoFocus: false,
        animationDuration: 450,
    });

    $.fancybox.defaults.backFocus = false;

    //header menu
    $(document).on('click', '.js-menu-open', function(){
        $('.js-mob-menu').addClass('active');
    })
    $(document).on('click', '.js-menu-close', function(){
        $('.js-mob-menu').removeClass('active');
    })

    //magnetic
    $(document).on('mousemove touch', function(e) {
        $('.js-magnetic').each(function() {
            magnetize(this, e);
        });
    });

    function magnetize(el, e) {
        var mX = e.pageX,
            mY = e.pageY;
        const item = $(el);

        const customDist = item.data('dist') * 20 || 120;
        const centerX = item.offset().left + (item.innerWidth() / 2);
        const centerY = item.offset().top + (item.innerHeight() / 2);
        
        var deltaX = Math.floor((centerX - mX)) * -0.45;
        var deltaY = Math.floor((centerY - mY)) * -0.45;

        var distance = calculateDistance(item, mX, mY);

        if (distance < customDist) {
            TweenMax.to(item, 0.5, {
                y: deltaY,
                x: deltaX,
                scale: 1.1
            });
            item.addClass('magnet');
        } else {
            TweenMax.to(item, 0.6, {
                y: 0,
                x: 0,
                scale: 1
            });
            item.removeClass('magnet');
        }
    }

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.innerWidth() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.innerHeight() / 2)), 2)));
    }

    //annual reports
    $(document).on('click', '.js-annual-reports-open', function(){
        $('.js-annual-reports').toggleClass('active');
    });
    $(document).on('click', '.js-annual-reports-close', function(){
        $('.js-annual-reports').removeClass('active');
    });
    $(document).click( function(e){
		if(!$('.js-annual-reports').is(e.target) && $('.js-annual-reports').has(e.target).length === 0 &&
        !$('.js-annual-reports-open').is(e.target) && $('.js-annual-reports-open').has(e.target).length === 0){
			$('.js-annual-reports').removeClass('active');
		}
	});
    $('.js-annual-reports-list').on('load scroll', function(){
        if ($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) {
            $(this).addClass('scroll-end');
        }else{
            $(this).removeClass('scroll-end');
        }
    })

    //team
    var teamContainer = $('.js-team-gallery'),
        teamItems = $('.js-team-img');

    $('.js-team-gallery').on('scroll', function(){
        teamItems.each(function(i, el){
            var top = $(el).position().top;
            var bottom = top + 175;
            var scroll = $(teamContainer).scrollTop() + 80;
            var sectionIndex = $(el).parent().index();
            if(scroll > top && scroll < bottom){
                $('.js-team-img.active').removeClass('active');
                $('.js-team-img').parent().eq(sectionIndex).find('.js-team-img').addClass('active');
                $('.js-team-item').removeClass('active');
                $('.js-team-item').eq(sectionIndex).addClass('active');
            }
        })
    })
    window.onload = function(){
        $('.js-team-gallery').trigger('scroll');
    };

    $('.js-team-img').hover(function(){
        var sectionIndex = $(this).parent().index();
        $('.js-team-img').addClass('hide');
        $(this).removeClass('hide').addClass('hover');
        $('.js-team-item').addClass('hide');
        $('.js-team-item').eq(sectionIndex).removeClass('hide').addClass('hover');
    }, function(){
        $('.js-team-img').removeClass('hide hover');
        $('.js-team-item').removeClass('hide hover');
    })

    //program tabs
    $(document).on('click', '.js-program-info-btn', function(){
        if(!$(this).hasClass('active')){
            var list = $(this).closest('.js-program-info'),
                curIndex = $(this).parent().index(),
                $this = $(this);

            if(window.matchMedia('(min-width: 992px)').matches){
                list.find('.js-program-info-btn').removeClass('active');
                $(this).addClass('active');
                list.find('.js-program-info-group').removeClass('active').eq(curIndex).addClass('active');
                list.find('.js-program-info-block').removeClass('active').eq(curIndex).addClass('active');
            }else{
                list.find('.js-program-info-btn').removeClass('active');0
                list.find('.program-info__mob').stop().slideUp(250);
                $(this).addClass('active');
                $(this).siblings('.program-info__mob').stop().slideDown(250, function(){
                    $('body').stop().animate({scrollTop: $this.offset().top - $('.header').innerHeight() - 10}, 250);
                    $('html').stop().animate({scrollTop: $this.offset().top - $('.header').innerHeight() - 10}, 250);
                });
            }
        }
    })

    //inline svg
    $('.js-svg-inline').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });

    //sliders
    var heroSlider = new Swiper('.hero-section__slider', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 20,
        grabCursor: true,
    });

    var partnersSlider = new Swiper('.home-partners__slider', {
        speed: 600,
        slidesPerView: 3,
        spaceBetween: 0,
        loop: true,
        navigation: {
            prevEl: '.home-partners__prev',
            nextEl: '.home-partners__next',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
        },
    });

    var teamSlider = new Swiper('.about-team__slider', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 40,
        loop: true,
        grabCursor: true,
        breakpoints: {
            0: {
                spaceBetween: 10,
            },
            576: {
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 40,
            },
        },
        on: {
            slideChange: function (swiper) {
                teamSlideChange(swiper.realIndex)
            },
        },
    });

    function teamSlideChange(index){
        $('.js-team-item-mob').removeClass('active');
        $('.js-team-item-mob').eq(index).addClass('active');
    }

    //form input
    $(document).on('input', '.js-form-input', function(){
        if($(this).val() != ''){
            $(this).addClass('not-empty');
        }else{
            $(this).removeClass('not-empty');
        }
    })

    //transfer online tabs
    $(document).on('change', '.js-transfer-online-tab', function(){
        if($(this).is(':checked')){
            let index = $(this).parent().index();
            $('.js-transfer-online-block').removeClass('active');
            $('.js-transfer-online-block').eq(index).addClass('active');
        }
    })

    //donation type
    $(document).on('click', '.js-donation-modal-btn', function(){
        let index = $(this).attr('data-donation-type');
        $('.js-donation-modal-type[data-donation-type="' + index + '"]').prop('checked', true);
    })

    //donation sum
    let donationChecked = $('.js-donation-sum-btn:checked');
    $(document).on('change', '.js-donation-sum-btn', function(){
        if($(this).is(':checked')){
            donationChecked = $(this);
            $('.js-donation-sum-input').val('');
        }
    })

    $(document).on('input', '.js-donation-sum-input', function(){
        if($(this).val() != ''){
            $(this).addClass('not-empty');
            $('.js-donation-sum-btn').prop('checked', false);
        }else{
            $(this).removeClass('not-empty');
            donationChecked.prop('checked', true);
        }
    })
})