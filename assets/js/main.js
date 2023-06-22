/*
    Spectral by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

$(document).ready(function () {

    // Play initial animations on page load.
    setTimeout(function () {
        $('body').removeClass('is-preload');
    }, 100);

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper'),
        $banner = $('#banner'),
        $header = $('#header');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Mobile?
    if (browser.mobile)
        $body.addClass('is-mobile');
    else {

        breakpoints.on('>medium', function () {
            $body.removeClass('is-mobile');
        });

        breakpoints.on('<=medium', function () {
            $body.addClass('is-mobile');
        });

    }

    // Scrolly.
    $('#nav a, .scrolly')
        .scrolly({
            speed: 1500,
            offset: $header.outerHeight()
        });

    // Menu.
    $('#menu')
        .append('<a href="#menu" class="close"></a>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-menu-visible'
        });
    $('nav-expander').on('click', function () { $('#nav .container').toggleClass('showMenu'); });

    // Header.
    if ($banner.length > 0
        && $header.hasClass('alt')) {

        $window.on('resize', function () { $window.trigger('scroll'); });

        $banner.scrollex({
            bottom: $header.outerHeight() + 1,
            terminate: function () { $header.removeClass('alt'); },
            enter: function () { $header.addClass('alt'); },
            leave: function () { $header.removeClass('alt'); }
        });

    }
    // Gallery.
    $('a.image').on('click', function (e, o) {
        if ($("#modal-gallery").length == 0) {
            $("body").append('<div class="modal-backdrop"></div><div id="modal-gallery" class="modal" style="display:block;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="modal-carousel-inner"><img class="modal-img" src=""></img><a class="modal-prev">&#10094;</a><a class="modal-next">&#10095;</a><a class="modal-close">X</a></div></div></div></div></div>');
            $("body").on("click", ".modal-next", function () { gallerySlide(1); });
            $("body").on("click", ".modal-prev", function () { gallerySlide(-1); });
            $("body").on("click", ".modal-close", function () { $('#modal-gallery').hide(); $('.modal-backdrop').hide(); });
            
        }
        $(".modal-img", $("body")).attr("src", $(this).attr("href"));
        $('.modal-backdrop').show();
        $('#modal-gallery').show();
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    function gallerySlide(x)
    {
        let actSrc = $(".modal-img", $("body")).attr("src");
        let $actElm = $("a.image[href='" + actSrc + "']");
        let $galElms = $actElm.closest("section.gallery").find("a.image");
        let actIdx = $galElms.index($actElm);
        let newIdx = actIdx + (x);
        if (newIdx < 0) newIdx = $galElms.length - 1;
        else if (newIdx >= $galElms.length) newIdx = 0;
        let newElm = $galElms[newIdx];
        $(".modal-img", $("body")).attr("src", $(newElm).attr("href"));
    }

});