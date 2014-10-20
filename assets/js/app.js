$(function () {

    // video
    var $video = $('video');
    var video = $video[0];
    video.volume = 0;

    // main element
    var $main = $('.main');

    $main.onepage_scroll({
        sectionContainer: 'section',
        easing: "ease",
        animationTime: 5000,
        pagination: true,
        updateURL: false,
        beforeMove: function(index) {},
        afterMove: function(index) {
            var a = $('section.active').data('index');
            if(a == 1)
                $main.attr('style', 'relative');
        },
        loop: false,
        keyboard: true,
        responsiveFallback: false
    });

    // click to movedown
    $('.caret').click(function () {
        $main.moveDown();
    });

    // keyword event close or open sound

    // set info bgcolor
    var $info = $('.info');
    var bgcolor = ['bggreen', 'bgblue', 'bgpurple'];
    var today = new Date();
    var bg = bgcolor[today.getDate()%3];
    $info.removeClass('bggreen').addClass(bg);

    // set info bgcolor
    var $aboutme = $('.aboutme');
    var bgcolor_aboutme = ['bggreen', 'bgblue', 'bgpurple'];
    //var today = new Date();
    var bg_aboutme = bgcolor_aboutme[today.getTime()%3];
    $aboutme.removeClass('bgred').addClass(bg_aboutme);

});
