
$(document).ready(function() {
    animateOfferElements();

    // настройка карусели
    $('.owl-carousel').owlCarousel({
        nav: true,
        navText: [
            '<button type="button" class="btn btn-primary"><i class="fas fa-chevron-left"></i></button>',
            '<button type="button" class="btn btn-primary"><i class="fas fa-chevron-right"></i></button>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1199: {
                items: 3
            }
        },
        loop: true,
        margin: 20
    });

    // плавный скролл
    $('a[href^="#"]').click(function(event) {
        event.preventDefault();

        var hash = this.hash;
        var target = $(hash);
        var targetId = target.attr('id');

        //var navbarHeight = $('nav').height();

        $('html, body').animate({
            scrollTop: target.offset().top // - navbarHeight
        }, 500, function() {

            target.removeAttr('id');
            window.location.hash = hash;
            target.attr('id', targetId);

        });
    })

    // меняем картинку в модальном окне
    $('#gallery img').click(function() {
        var imgSrc = $(this).attr('src');

        $('#img-modal img').attr('src', imgSrc);
    })

    // анимация на элементах offer
    $(window).scroll(animateOfferElements);

    function animateOfferElements() {
        var equipmentScrollBottom = $('#equipment').offset().top - $(window).scrollTop() - $(window).height();

        if (equipmentScrollBottom < -$(window).height() / 4) {
            $('.offer').addClass('element-visible');
        }
    }

    // показать кнопку перехода в начало
    $(window).scroll(function() {
        var toTopButton = $('.totop');

        if ($(this).scrollTop() > $(window).height()) {
            toTopButton.addClass('visible');
        } else {
            toTopButton.removeClass('visible');
        }
    });

    // анимация на navbar-toggler 
    $('button.navbar-toggler').click(function() {
        $(this).toggleClass('opened');
    });
});