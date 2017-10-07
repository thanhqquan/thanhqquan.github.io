/**
 * Image slider
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

//Variable of active image in list image
var slideIndex = 0;

//Set default for the first slide
showSlide(slideIndex);
/**
 * Display image, change image after 3s
 * @param {int} n Ordinal number of an image in list image
 */
setInterval(function () {
	showSlide(slideIndex +=1);
}, 3000);

function showSlide(n) {
	var i;
	var slide = document.getElementsByClassName("slide");
	var listImage = document.getElementsByClassName("list-image");
	//Move from the last slide to the first (n = 4)
	if (n >= slide.length) {
		slideIndex = 0;
	}
	//Move from the first slide to the last
	if (n < 0) {
		slideIndex = slide.length - 1;
	}
	//
	for (i = 0; i < slide.length; i++) {
		slide[i].style.display = "none";
	}
	for (i = 0; i < listImage.length; i++) {
		listImage[i].className = listImage[i].className.replace(" active", ""); 
	}
	//Change from "none" to "block"
	slide[slideIndex].style.display = "block";
	//Border current image with class "active"
	listImage[slideIndex].className += " active";
}

/**
 * Choose an image from list image, display it on the slide
 * @param {int} n Ordinal number of an image in list image
 */
function currentSlide(n) {
	showSlide(slideIndex = n);
}

/**
 * Click on Previous image (<) or Next image (>)
 * @param {int} n Ordinal number of an image in list image
 */
function adjacentImg(n) {
	showSlide(slideIndex += n);
}