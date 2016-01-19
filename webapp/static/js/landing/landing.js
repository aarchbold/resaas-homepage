/*eslint-disable */
/**
 * Dismiss Errors
 * Adds click handler that closes any displayed error or success messages.
 */
$.fn.selectTestimonial = function() {
    var $context = this,
        $quotes = $('.landing-testimonial-text', $context),
        $thumbs = $('.landing-testimonials li', $context);

    console.log($context);
    console.log($quotes);
    console.log($thumbs);

    $thumbs.click(function(e) {
        $('html, body').animate({
            scrollTop: $context.offset().top
        }, 200);
        $thumbs.removeClass('-active');
        $quotes.removeClass('-active');
        $quotes.eq($thumbs.index($(this))).css({'opacity':0});
        $(this).addClass('-active');
        $quotes.eq($thumbs.index($(this))).addClass('-active');
        $quotes.eq($thumbs.index($(this))).animate({
            opacity: 1
        },250);
    });

};

$(document).ready(function() {
    $('.section-testimonials').selectTestimonial();
});