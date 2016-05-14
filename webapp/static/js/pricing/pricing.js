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

        console.log('hello?');
        console.log($context);

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


$(document).ready(function() {
    $('.pricing-basic-features').pricingSlideShow();
    $('.pricing-premium__list').pricingSlideShow();
});