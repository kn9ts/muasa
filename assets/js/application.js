$(function() {

    // ------ ADD BACKGROUND IMAGES --------
    var backImages = $('#backgrounds').data('backgrounds').split(',');
    $.backstretch(backImages, {
        fade: 500,
        duration: 4000
    });

    if (!$('#color-overlay').length) {
        $('body').addClass('no-overlay');
    }

    // ------- HOMEPAGE -------
    $('.jumbotron').height($(window).height());
    $('.jumbotron .container').addClass('scale-in');

    $('.home-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        direction: "vertical",
        slideshowSpeed: 3000,
        animationSpeed: 500,
        pauseOnHover: false,
        pauseOnAction: false,
        smoothHeight: true
    });

    $(window).load(function() {
        $('.jumbotron').delay(500).animate({
            'height': $(window).height() - 80
        }, 500);

        setTimeout(function() {
            $('.jumbotron .container').addClass('in');
        }, 1000);
    });

    $(window).resize(function() {
        $('.jumbotron').height($(window).height() - 80);
        if ($('.header-logo')) { //check for the header logo
            $('.header-logo').css({
                'marginTop': $(window).height() * 0.25
            });
        }
        scrollSpyRefresh();
        waypointsRefresh();
    });

    // -------- FOR SCROLLING ANIMATION -------
    $('.scrollimation').waypoint(function() {
        $(this).addClass('in');
    }, {
        offset: function() {
            var h = $(window).height();
            if ($('body').height() - $(this).offset().top > h * 0.3) {
                return h * 0.7;
            } else {
                return h;
            }
        }
    });

    // ------ CONTESTANTS PREVIEW ---------
    $(window).load(function() {
        $('#ccc-container').css({
            visibility: 'visible'
        });

        $('#ccc-container').masonry({
            itemSelector: '.ccc',
            columnWidth: 200,
            isFitWidth: true,
            isResizable: true,
            isAnimated: !Modernizr.csstransitions,
            gutterWidth: 20
        });

        scrollSpyRefresh();
        waypointsRefresh();
    });



    /*============================================
	Project Preview
	==============================================*/
    $('.project-item').click(function(e) {
        e.preventDefault();

        if ($(this).hasClass('active')) return false; //stop the script
        $('.project-item').removeClass('active');

        var elem = $(this); //project clicked on
        //animate to project preview page
        $('html, body').scrollTo(0, '#preview-scroll', {
            gap: {
                y: -120
            },
            animation: {
                duration: 600
            }
        });

        $('#preview-loader').addClass('show');
        console.log(elem);

        if ($('#project-preview').hasClass('open')) {
            closePreview();
            elem.addClass('active');
            setTimeout(function() {
                buildPreview(elem);
            }, 1000);
        } else {
            elem.addClass('active');
            buildPreview(elem);
        }

    });

    $('.close-preview').click(function(e) {
        e.preventDefault();
        closePreview();
    });

    function buildPreview(elem) {

        var previewElem = $('#project-preview'),
            title = elem.find('.project-title').text()
            // descr = elem.find('.project-description').html();

            previewElem.find('.preview-title').text(title);

        previewElem.find('#preview-details ul').empty();
        elem.find('.project-attributes .newline').each(function() {
            previewElem.find('#preview-details ul').append('<li>' + $(this).html() + '</li>')
        });

        // previewElem.find('#preview-content').html(descr);

        /*----Project with Image-----*/
        if (elem.find('.project-media').data('images')) {

            var slidesHtml = '<ul class="slides">',
                slides = elem.find('.project-media').data('images').split(',');

            for (var i = 0; i < slides.length; ++i) {
                slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
            }

            slidesHtml = slidesHtml + '</ul>';
            previewElem.find('#preview-media').addClass('flexslider').html(slidesHtml);

            $('#preview-media img').load(function() {
                $('#preview-media.flexslider').flexslider({
                    slideshowSpeed: 3000,
                    animation: 'slide',
                    pauseOnAction: false,
                    pauseOnHover: true,
                    start: function() {
                        setTimeout(function() {
                            openPreview();
                            $('#preview-loader').removeClass('show');
                            $(window).trigger('resize');
                        }, 1000)
                    }
                });
            });

        }

        /*----Project with Video-----*/
        if (elem.find('.project-media').data('video')) {

            var media = elem.find('.project-media').data('video');

            previewElem.find('#preview-media').html(media);

            $('#preview-media iframe').load(function() {
                $('#preview-media').fitVids();

                setTimeout(function() {
                    openPreview();
                    $('#preview-loader').removeClass('show');
                }, 1000);

            });
        }
    }

    function openPreview() {
        $('#project-preview-wrapper').slideDown(600, function() {
            scrollSpyRefresh();
            waypointsRefresh();
        });
        $('#project-preview').addClass('open');
    }

    function closePreview() {
        $('#project-preview-wrapper').slideUp(600, function() {
            if ($('#preview-media').hasClass('flexslider')) {
                $('#preview-media').removeClass('flexslider')
                    .flexslider('destroy');
            }
            $('#preview-media').html('');
            scrollSpyRefresh();
            waypointsRefresh();
        });
        $('#project-preview').removeClass('open');
        $('.project-item').removeClass('active');
    }

    /*============================================
	Refresh scrollSpy function
	==============================================*/

    function scrollSpyRefresh() {
        setTimeout(function() {
            $('body').scrollspy('refresh');
        }, 1000);
    }

    /*============================================
	Refresh waypoints function
	==============================================*/

    function waypointsRefresh() {
        setTimeout(function() {
            $.waypoints('refresh');
        }, 1000);
    }

});