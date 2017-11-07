/**
 * Image slider - jQuery
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var SLIDE_INDEX = 0; // Variable of current image
var AUTO_TIME = 3000; // Auto change image after AUTO_TIME (milliseconds)
var SLIDE_LENGTH = $(".slide").length; // The number of images

/*
 Display image
*/
$(function() { showSlide(SLIDE_INDEX); });

var autoSlide = setInterval(function() { showSlide(SLIDE_INDEX += 1); }, AUTO_TIME); // auto change image after AUTO_TIME seconds

/*
 Display image with SLIDE_INDEX
 @param {number} n Ordinal number of an image in list image
*/
function showSlide(n) {
    // Reset time when clicked previous, next or list image
    clearInterval(autoSlide);
    autoSlide = setInterval(function() { showSlide(SLIDE_INDEX += 1); }, AUTO_TIME);
    
    // Move to first image in list
    if (n >= SLIDE_LENGTH) {
        SLIDE_INDEX = 0;
    }
    // Move to last image in list
    if (n < 0) {
        SLIDE_INDEX = SLIDE_LENGTH - 1;
    }
    
    $(".slide").css("display", "none");
    // Display current image (change "none" to "block")
    $(".slide").eq(SLIDE_INDEX).css("display", "block");
    $(".list-image").removeClass("active");
    // Border current small image with class "active"
    $(".list-image").eq(SLIDE_INDEX).addClass("active");
}

/*
 Click button btn-left, display previous image
*/
$(function() {
    $("#btn-left").click(function() {
        SLIDE_INDEX--;
        showSlide(SLIDE_INDEX);
    });
});

/*
 Click button btn-right, display next image
*/
$(function() {
    $("#btn-right").click(function() {
        SLIDE_INDEX++;
        showSlide(SLIDE_INDEX);
    });
});

/*
 Click an image in list image, display it on slider
*/
$(function() {
    $(".list-image").click(function() {
        SLIDE_INDEX = $(".list-image").index(this);
        showSlide(SLIDE_INDEX);
    });
});