/*eslint-disable */
/**
 * Selects a testimonial and handles the slideshow effect
 */
$.fn.selectTestimonial = function() {
    var $context = this,
        $quotes = $('.landing-testimonial-text', $context),
        $thumbs = $('.landing-testimonials li', $context),
        $next = $('.-next', $context),
        $prev = $('.-previous', $context),
        currentIndex = 0,
        interval = 5000,
        timer;

    function goToTestimonial(index) {
        $thumbs.removeClass('-active');
        $quotes.removeClass('-active');
        $quotes.eq(index).css({'opacity':0});
        $thumbs.eq(index).addClass('-active');
        $quotes.eq(index).addClass('-active');
        $quotes.eq(index).animate({
            opacity: 1
        },250);
    }

    function goToNext(index, direction) {
        // window.clearTimeout(timer);
        if (direction && direction === 'previous') {
            if (index === 0) {
                currentIndex = 3;
            } else {
                currentIndex--;
            }
            goToTestimonial(currentIndex);
        } else if (direction && direction === 'next') {
            if (index === 3) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            goToTestimonial(currentIndex);
        } else {
            if (index && index === 'start') {
                currentIndex = 0;
                goToTestimonial(currentIndex);
            } else if (index && index !== 'start') {
                currentIndex = index;
                goToTestimonial(currentIndex);
            } else {
                if (currentIndex === 3) {
                    currentIndex = 0;
                    goToTestimonial(currentIndex);
                } else {
                    currentIndex++;
                    goToTestimonial(currentIndex);
                }
            }
        }
        // timer = window.setTimeout(goToNext,
        //     interval
        // );
    }

    $thumbs.click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($context).offset().top - 40
        }, 200);

        currentIndex = $thumbs.index($(this));
        if (currentIndex === 0) {
            goToNext('start', false);
        } else {
            goToNext(currentIndex, false);
        }

    });

    $context.on('swipeleft',function(){
        goToNext(currentIndex, 'next');
    }); 

    $context.on('swiperight',function(){
        goToNext(currentIndex, 'previous');
    });  

    $prev.click(function(e) {
        e.preventDefault();
        goToNext(currentIndex, 'previous');
    });

    $next.click(function(e) {
        e.preventDefault();
        goToNext(currentIndex, 'next');
    });

    // setTimeout(
    //     function() {
    //         goToNext();
    //     }, interval
    // );
};

/**
 * Selects a feature and updates the DOM with proper content
 */
$.fn.showFeature = function() {
    var $featureLinks = $('.landing-feature-link', $('.landing-whatwedo-bullets')),
        $context = $('.section-features'),
        $navItems = $('.landing-features-nav li', $context),
        $images = $('.landing-features-image', $context),
        $features = $('.landing-features-bullets', $context),
        $mobileNav = $('.landing-features-mobile-nav__current', $context),
        $mobileNavContents = $('.landing-features-mobile-nav__options', $context),
        $mobileNameOptions = $('li a', $mobileNavContents),
        $mobileChev = $('.landing-features-mobile-nav__current .fa-chevron-down', $context);
        $topnavItems = $('.header-feature-item', $(this)),
        $landingPageHeader = $('.landing-page-header');

    function showFeature(feature) {
        $navItems.removeClass('-active');
        $images.removeClass('-active');
        $features.removeClass('-active');

        if (feature === '#agents') {
            $('.feature-nav-agents', $context).addClass('-active');
            $('.feature-image-agents', $context).addClass('-active');
            $('.feature-content-agents', $context).addClass('-active');
            $('span', $mobileNav).html('Agents');
        } else if (feature === '#brokers') {
            $('.feature-nav-brokers', $context).addClass('-active');
            $('.feature-image-brokers', $context).addClass('-active');
            $('.feature-content-brokers', $context).addClass('-active');
            $('span', $mobileNav).html('Brokers');
        } else if (feature === '#franchises') {
            $('.feature-nav-franchises', $context).addClass('-active');
            $('.feature-image-franchises', $context).addClass('-active');
            $('.feature-content-franchises', $context).addClass('-active');
            $('span', $mobileNav).html('Franchises');
        } else if (feature === '#mlss') {
            $('.feature-nav-mlss', $context).addClass('-active');
            $('.feature-image-mlss', $context).addClass('-active');
            $('.feature-content-mlss', $context).addClass('-active');
            $('span', $mobileNav).html('MLSs');
        }
    }

    $featureLinks.click(function(e) {
        e.preventDefault();
        $navItems.removeClass('-active');
        $('li', $mobileNavContents).removeClass('-selected');
        $('li a[href="' + $(this).attr('href') + '"]', $mobileNavContents).parent().addClass('-selected');

        $('html, body').animate({
            scrollTop: $context.offset().top + 30
        }, 200, showFeature($(this).attr('href')));
    });

    $navItems.click(function(e) {
        e.preventDefault();
        showFeature($('a', $(this)).attr('href'));
    });

    $topnavItems.click(function(e) {
        e.preventDefault();
        var $link = $(this);
        if ($landingPageHeader.hasClass('-open-nav')) {
            $('html').toggleClass('-open-nav');
            setTimeout(
                function() {
                    $('.landing-page-header').removeClass('-open-nav');
                    console.log($(this));
                    $('html, body').animate({
                        scrollTop: $context.offset().top + 30
                    }, 200, showFeature($link.attr('href')));
                }, 500
            );
        } else {
            $('html, body').animate({
                scrollTop: $context.offset().top + 30
            }, 200, showFeature($link.attr('href')));
        }
    });

    $mobileNav.click(function(e) {
        e.preventDefault();
        $mobileNavContents.toggle();
        $mobileChev.toggleClass('fa-chevron-up');
        $mobileChev.toggleClass('fa-chevron-down');
    });

    $mobileNameOptions.click(function(e) {
        e.preventDefault();
        $mobileChev.toggleClass('fa-chevron-up');
        $mobileChev.toggleClass('fa-chevron-down');
        $mobileNavContents.toggle();
        $('li', $mobileNavContents).removeClass('-selected');
        $(this).parent().addClass('-selected');
        showFeature($(this).attr('href'));
    });

};


/**
 * Cycles features slideshow-esque
 */
$.fn.landingSlideShow = function() {
    var $context = $(this),
        $slides = $('.landing-whatwedo-bullets li', $context),
        $next = $('.-next', $context),
        $prev = $('.-previous', $context),
        currentIndex = 0;

        function goToSlide(direction) {
            // reset slides
            $slides.removeClass('-active');

            if (direction === 'forward') {
                if (currentIndex === 3) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                $slides.eq(currentIndex).addClass('-active');
            } else {
                if (currentIndex === 0) {
                    currentIndex = 3;
                } else {
                    currentIndex--;
                }
                $slides.eq(currentIndex).addClass('-active');
            }
        }


        $context.on('swipeleft',function(){
            goToSlide('forward');
        }); 

        $context.on('swiperight',function(){
            goToSlide('back');
        });  

        $next.click(function(e) {
            e.preventDefault();
            goToSlide('forward');
        });

        $prev.click(function(e) {
            e.preventDefault();
            goToSlide('back');
        });

};

/**
 * Enables mobile nav menu interactions
 */
$.fn.mobileNav = function() {
    var $context = $(this),
        $navLinks = $('.re-nav-mobile-link', $context),
        $flyouts = $('.re-nav-flyout-list', $context),
        $chevrons = $('.re-nav-mobile-link i', $context);

    $navLinks.click(function(e) {
        e.preventDefault();
        if ($('.re-nav-flyout-list', $(this).parent()).hasClass('-is-active')) {
            $chevrons.removeClass('fa-angle-up');
            $chevrons.addClass('fa-angle-down');
            $flyouts.removeClass('-is-active');
        } else {
            $flyouts.removeClass('-is-active');
            $chevrons.removeClass('fa-angle-up');
            $chevrons.addClass('fa-angle-down');
            $('.re-nav-flyout-list', $(this).parent()).addClass('-is-active');
            $('i', $(this)).addClass('fa-angle-up');
            $('i', $(this)).removeClass('fa-angle-down');
        }

    });

};

$(document).ready(function() {
    $('.section-testimonials').selectTestimonial();
    $('body').showFeature();
    $('.landing-whatwedo').landingSlideShow();
    $('.landing-page-header').mobileNav();

    // mobile top nav toggle
    $('.re-nav-control-link', $('header')).click(function(e) {
        e.preventDefault();
        if ($('.landing-page-header').hasClass('-open-nav')) {
            setTimeout(
                function() {
                    $('.landing-page-header').removeClass('-open-nav');
                }, 500
            );
        } else {
            // set nav to the window height and allow scrolling
            $('.re-nav', $('.landing-page-header')).height($(window).height());
            $('.re-nav', $('.landing-page-header')).css({'overflow':'auto'});
            $('.landing-page-header').addClass('-open-nav');
        }
        $('html').toggleClass('-open-nav');
    });

});