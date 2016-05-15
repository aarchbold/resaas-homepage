/*eslint-disable */



/**
 * Cycles features slideshow-esque
 */
$.fn.pricingSlideShow = function() {
    var $context = $(this),
        $slides = $('ul li', $context),
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
 * Opens the upgrade modal
 */
$.fn.upgradeModal = function() {
    var openBtn = $(this),
        container = $('.pricing-upgrade-modal'),
        modal = $('.pricing-updade-modal__popup', container),
        closeBtn = $('.pricing-update-modal__close', container);

    function closeModal() {
        container.removeClass('-open');
        container.hide();
    }

    openBtn.click(function(e) {
        e.preventDefault();
        container.show();
        setTimeout(
            function() {
                container.addClass('-open');
            }, 50
        );
    });

    closeBtn.click(function(e) {
        e.preventDefault();
        closeModal();
    });

    container.click(function(e){
        if ($(e.target).hasClass('pricing-upgrade-modal')) {
            closeModal();
        }
    });
};

$.fn.scrollToFeature = function() {
    var context = $(this),
        buttons = $('.pricing-packages-mobile__chevron');

    buttons.click(function(e) {
        var targetElement = $('.' + $(this).attr('data-target'));
        $('html, body').animate({
            scrollTop: targetElement.offset().top + 30
        }, 400);
    });
};


$(document).ready(function() {
    $('.pricing-basic-features').pricingSlideShow();
    $('.pricing-premium__list').pricingSlideShow();
    $('.btn-open-upgrade-modal').upgradeModal();
    $('.section-hero-pricing-wrap').scrollToFeature();
});