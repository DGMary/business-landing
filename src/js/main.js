//= vendor/jquery-1.12.0.min.js
//= vendor/slick/slick.js
//= vendor/formValidate/validate.js
//= vendor/inputMask/jquery.inputmask.js
//= vendor/scrollSpeed.js


$(document).ready(function () {
    $('.cities-slider').not('.slick-initialized').slick({
        slidesToScroll: 1,
        centerMode: true,
        slidesToShow: 4,
        centerPadding: '265px',
        responsive: [
            {
                breakpoint: 1801,
                settings: {
                    centerPadding: '150px'
                }
            },{
                breakpoint: 1401,
                settings: {
                    centerPadding: '150px',
                    slidesToShow: 3
                }
            },{
                breakpoint: 1024,
                settings: {
                    centerPadding: '44px',
                    slidesToShow: 3
                }
            },{
                breakpoint: 768,
                settings: {
                    centerPadding: '90px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.video-slider').not('.slick-initialized').slick({
        slidesToShow: 1,
        slideToScroll: 1,
        dots: true
    });

    $('.form_validate').formValidation();
    $('.validate_phone').mask('+380999999999');
    initTabs();
    menuItemsScroll();
    initAccordion ();
    // $(function() {
    //     $.scrollSpeed(100,800);
    // });
    document.querySelector('.point-scroll') !== null && initStickyPoint();
    $(document).on('click', '.btn-up', function() {
        $('html, body').animate({scrollTop: 0}, 500);
    });
    $(window).scroll(function () {
        var top = $(document).scrollTop(),
            height = document.documentElement.clientHeight;
        if (top > height) {
            $('.btn-up').addClass('fixed');
        } else {
            $('.btn-up').removeClass('fixed');
        }
    });
});

/* tabs */
function initTabs() {

    $('.tabset .tab-controls a').on('click', function() {

        var thisHold = $(this).closest('.tabset');
        var _ind = $(this).index();

        thisHold.children('.tab-holder').find('.tab').removeClass('active');
        thisHold.children('.tab-holder').find('div.tab:eq(' + _ind + ')').addClass('active');

        $(this).closest('.tab-controls').find('a.active').removeClass('active');
        $(this).addClass('active');

        $('.cities-slider').slick('setPosition');

        return false;
    });
}

$(document).on('click', '.nav-bullets a[href^="#"], a.anchor[href^="#"]', function (e) {
    var target = $(this.getAttribute('href'));

    if(target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

function menuItemsScroll () {
    var lastId,
        menuItems = $('.nav-bullets a'),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if(item.length) {return item;}
        });

    $(window).scroll(function () {
        var fromTop = $(this).scrollTop();

        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop+30)
                return this;
        });

        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                .removeClass("active")
                .filter("[href='#"+id+"']").addClass("active");
        }
    });
}

function initStickyPoint() {

    var point = $('.point-scroll');
    var topPos = $('.info-section').offset().top;

    $(window).scroll(function() {
        var top = $(this).scrollTop(),
            pip = $('.about-section').offset().top - 460,
            height = point.outerHeight();

        if ((top > topPos - 207) && (top < pip - height)) {
            point.addClass('sticky').removeAttr("style");
        } else if (top > (pip - height)) {
            point.removeClass('sticky').css({'position':'absolute','bottom':'430px', 'top': 'auto'});
        } else {
            point.removeClass('sticky');
        }
    });
}
function initAccordion() {
    $('.js-collapse > a').on('click', function(){
        $(this).toggleClass('active');
        $('.expanded',$(this).closest('.js-collapse')).slideToggle(500, function(){
            $(this).closest('.js-collapse').toggleClass('opened');
        });
        return false;
    });
}


